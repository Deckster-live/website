/**
 * Regenerates src/components/why-us/worldMap.ts.
 *
 *   node scripts/generate-world-map.mjs
 *
 * Rasterises the Natural Earth 110m country topology onto an equirectangular
 * grid and emits a packed land mask plus one dot cluster per market. Nothing at
 * runtime depends on this script or on network access — it is a build-time tool
 * for when the grid resolution, the crop or the highlighted markets change.
 */
import { writeFileSync } from "node:fs";

const TOPOJSON_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

/** Grid width in cells. Also the SVG viewBox width. */
const COLS = 120;
/** Crop: Antarctica dropped, Arctic trimmed to the familiar map proportions. */
const LAT_MAX = 72;
const LAT_MIN = -56;
const LON_MIN = -180;

/**
 * Markets get a compact cluster around a focal point rather than a full country
 * fill — filling Canada and the USA would turn half the map green and drown the
 * smaller markets. `n` is the dot budget; `delay` is the ripple offset, kept
 * deliberately uneven so the loop never reads as a rotation.
 */
const MARKETS = [
  { key: "usa", label: "USA", id: "840", lon: -98, lat: 39.5, n: 17, delay: 0 },
  { key: "canada", label: "Canada", id: "124", lon: -104, lat: 58.5, n: 14, delay: 1.7 },
  { key: "india", label: "India", id: "356", lon: 78.5, lat: 22, n: 16, delay: 0.45 },
  { key: "uae", label: "UAE", id: "784", lon: 54.4, lat: 24.2, n: 4, delay: 2.95 },
  { key: "nigeria", label: "Nigeria", id: "566", lon: 8, lat: 9.5, n: 8, delay: 2.35 },
  { key: "australia", label: "Australia", id: "036", lon: 134, lat: -25, n: 20, delay: 1.15 },
];

const topo = await fetch(TOPOJSON_URL).then((r) => {
  if (!r.ok) throw new Error(`${TOPOJSON_URL} -> ${r.status}`);
  return r.json();
});

// ---- topojson decoding ----------------------------------------------------
const {
  scale: [sx, sy],
  translate: [tx, ty],
} = topo.transform;

const arcs = topo.arcs.map((deltas) => {
  let x = 0;
  let y = 0;
  return deltas.map(([dx, dy]) => {
    x += dx;
    y += dy;
    return [x * sx + tx, y * sy + ty];
  });
});

/** Stitches an arc index list into a ring, dropping the shared join points. */
function ring(idxs) {
  const out = [];
  for (const i of idxs) {
    const a = i < 0 ? arcs[~i].slice().reverse() : arcs[i];
    for (let k = out.length ? 1 : 0; k < a.length; k++) out.push(a[k]);
  }
  return out;
}

const polygons = (g) =>
  g.type === "Polygon"
    ? [g.arcs.map(ring)]
    : g.type === "MultiPolygon"
      ? g.arcs.map((p) => p.map(ring))
      : [];

/**
 * Rings split at the antimeridian (Fiji, Russia, New Zealand) are degenerate in
 * flat space: a single +359deg segment makes ray casting report an entire
 * latitude as land. Unwrapping keeps the ring continuous past +/-180, and the
 * point test then probes lon, lon-360 and lon+360.
 */
function unwrap(r) {
  const out = [r[0]];
  for (let i = 1; i < r.length; i++) {
    let x = r[i][0];
    const prev = out[i - 1][0];
    while (x - prev > 180) x -= 360;
    while (x - prev < -180) x += 360;
    out.push([x, r[i][1]]);
  }
  return out;
}

const countries = topo.objects.countries.geometries.map((g) => {
  const polys = polygons(g).map((p) => p.map(unwrap));
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const p of polys)
    for (const r of p)
      for (const [x, y] of r) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
  return { id: g.id, name: g.properties.name, polys, bbox: [x0, y0, x1, y1] };
});

for (const m of MARKETS) {
  if (!countries.some((c) => c.id === m.id)) {
    throw new Error(`no country with id ${m.id} (${m.key})`);
  }
}

function inRing(r, x, y) {
  let inside = false;
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
    const [xi, yi] = r[i];
    const [xj, yj] = r[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function inCountryAt(c, x, y) {
  const [x0, y0, x1, y1] = c.bbox;
  if (x < x0 || x > x1 || y < y0 || y > y1) return false;
  for (const poly of c.polys) {
    if (!inRing(poly[0], x, y)) continue;
    let hole = false;
    for (let h = 1; h < poly.length; h++)
      if (inRing(poly[h], x, y)) {
        hole = true;
        break;
      }
    if (!hole) return true;
  }
  return false;
}

const inCountry = (c, x, y) =>
  inCountryAt(c, x, y) || inCountryAt(c, x - 360, y) || inCountryAt(c, x + 360, y);

// ---- rasterise ------------------------------------------------------------
const step = 360 / COLS; // equal degree steps, so cells stay square
const ROWS = Math.round((LAT_MAX - LAT_MIN) / step);

/** [row][col] -> owning country id, or null for water. */
const grid = [];
for (let r = 0; r < ROWS; r++) {
  grid.push(new Array(COLS).fill(null));
  for (let c = 0; c < COLS; c++) {
    const lon = LON_MIN + (c + 0.5) * step;
    const lat = LAT_MAX - (r + 0.5) * step;
    // Off-centre probes keep thin coastlines and small islands on the map.
    const probes = [
      [lon, lat],
      [lon - step * 0.3, lat],
      [lon + step * 0.3, lat],
      [lon, lat + step * 0.3],
      [lon, lat - step * 0.3],
    ];
    outer: for (const [px, py] of probes) {
      for (const co of countries)
        if (inCountry(co, px, py)) {
          grid[r][c] = co.id;
          break outer;
        }
    }
  }
}

const toCol = (lon) => (lon - LON_MIN) / step - 0.5;
const toRow = (lat) => (LAT_MAX - lat) / step - 0.5;

const taken = new Set();
const clusters = MARKETS.map((m) => {
  const fc = toCol(m.lon);
  const fr = toRow(m.lat);
  const own = [];
  const near = [];
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      if (!grid[r][c] || taken.has(r * COLS + c)) continue;
      const d = Math.hypot(c - fc, r - fr);
      (grid[r][c] === m.id ? own : near).push({ c, r, d });
    }
  own.sort((a, b) => a.d - b.d);
  near.sort((a, b) => a.d - b.d);

  // Prefer the market's own cells; a nation too small to own a cell at this
  // resolution (the UAE) borrows the nearest land instead of vanishing.
  const picked = own.slice(0, m.n);
  for (const cell of near) {
    if (picked.length >= m.n || cell.d > 2.2) break;
    picked.push(cell);
  }
  if (!picked.length) throw new Error(`no dots for ${m.key}`);
  for (const p of picked) taken.add(p.r * COLS + p.c);

  // Dots are drawn at cell centres, so the ripple origin must be too.
  const cx = picked.reduce((s, p) => s + p.c + 0.5, 0) / picked.length;
  const cy = picked.reduce((s, p) => s + p.r + 0.5, 0) / picked.length;
  const spread = Math.max(
    ...picked.map((p) => Math.hypot(p.c + 0.5 - cx, p.r + 0.5 - cy)),
  );
  console.log(`${m.key.padEnd(10)} ${picked.length} dots, spread ${spread.toFixed(1)}`);
  return {
    ...m,
    cx: +cx.toFixed(2),
    cy: +cy.toFixed(2),
    spread: +spread.toFixed(2),
    dots: picked.map((p) => [p.c, p.r]),
  };
});

// Grey mask, minus the cells a market claimed, so the two layers never overlap.
const hex = [];
for (let r = 0; r < ROWS; r++) {
  let s = "";
  for (let c = 0; c < COLS; c += 4) {
    let nib = 0;
    for (let k = 0; k < 4; k++) {
      const cc = c + k;
      if (cc < COLS && grid[r][cc] && !taken.has(r * COLS + cc)) nib |= 1 << (3 - k);
    }
    s += nib.toString(16);
  }
  hex.push(s);
}

const out = `// GENERATED — do not hand-edit. Run: node scripts/generate-world-map.mjs
//
// A Natural Earth 110m country topology (world-atlas) rasterised onto a
// ${COLS} x ${ROWS} equirectangular grid spanning 180W-180E and ${LAT_MAX}N-${-LAT_MIN}S:
// Antarctica is cropped and the Arctic trimmed, which is what gives the map its
// familiar dotted-silhouette proportions.

/** Grid width in cells; also the SVG viewBox width. */
export const MAP_COLS = ${COLS};
/** Grid height in cells; also the SVG viewBox height. */
export const MAP_ROWS = ${ROWS};

/**
 * Land mask, one hex string per grid row, 4 cells per character (MSB = leftmost
 * cell). Cells claimed by a highlighted market are already cleared here so the
 * grey and green layers never double-draw the same dot.
 */
export const LAND_MASK: readonly string[] = [
${hex.map((h) => `  "${h}",`).join("\n")}
];

export interface MarketRegion {
  key: string;
  label: string;
  /** Cluster centre in grid cells — the origin of the ripple. */
  cx: number;
  cy: number;
  /** Distance from the centre to the outermost dot, in grid cells. */
  spread: number;
  /** Ripple offset in seconds, deliberately uneven so the loop reads organic. */
  delay: number;
  /** [col, row] of every highlighted dot. */
  dots: readonly (readonly [number, number])[];
}

/** The markets Deckster has run campaigns in, as dot clusters on the grid. */
export const MARKETS: readonly MarketRegion[] = [
${clusters
  .map(
    (m) => `  {
    key: "${m.key}",
    label: "${m.label}",
    cx: ${m.cx},
    cy: ${m.cy},
    spread: ${m.spread},
    delay: ${m.delay},
    dots: [${m.dots.map(([c, r]) => `[${c},${r}]`).join(",")}],
  },`,
  )
  .join("\n")}
];
`;

const dest = new URL("../src/components/why-us/worldMap.ts", import.meta.url);
writeFileSync(dest, out);
console.log(`wrote ${dest.pathname} (${ROWS} rows)`);
