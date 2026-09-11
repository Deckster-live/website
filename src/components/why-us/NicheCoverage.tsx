"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LAND_MASK, MAP_COLS, MAP_ROWS, MARKETS } from "./worldMap";
import { tint, type VisualProps } from "./useLoop";

/** One full ripple cycle. Every market shares it, offset by its own delay. */
const RIPPLE = 3.8;
/** Dots are grouped into this many rings so the pulse travels outward. */
const BANDS = 3;

/**
 * A zero-length subpath drawn with `stroke-linecap="round"` renders as a filled
 * circle, so a whole dot field collapses into one `<path>` and one DOM node —
 * ~1,700 grey dots at a fraction of the cost of 1,700 `<circle>` elements.
 */
const dotPath = (dots: readonly (readonly [number, number])[]) =>
  dots.map(([c, r]) => `M${c + 0.5} ${r + 0.5}h0`).join("");

/** Expands the packed land mask (4 cells per hex char, MSB leftmost). */
function landPath() {
  const dots: [number, number][] = [];
  LAND_MASK.forEach((row, r) => {
    for (let c = 0; c < MAP_COLS; c++) {
      const nibble = parseInt(row[c >> 2], 16);
      if ((nibble >> (3 - (c & 3))) & 1) dots.push([c, r]);
    }
  });
  return dotPath(dots);
}

/** Splits a market's dots into concentric bands, innermost first. */
function bandPaths(m: (typeof MARKETS)[number]) {
  const bands: [number, number][][] = Array.from({ length: BANDS }, () => []);
  for (const [c, r] of m.dots) {
    const d = Math.hypot(c + 0.5 - m.cx, r + 0.5 - m.cy);
    const i = Math.min(BANDS - 1, Math.floor((d / (m.spread + 0.6)) * BANDS));
    bands[i].push([c, r]);
  }
  return bands.filter((b) => b.length).map(dotPath);
}

/** The dot fields are pure geometry — built once at module load, never per render. */
const LAND_D = landPath();
const REGIONS = MARKETS.map((m) => ({
  ...m,
  all: dotPath(m.dots),
  bands: bandPaths(m),
}));

/** Neon-ish tones; each pill's dot matches its border. */
const TONES = {
  rose: "#fb7185",
  pink: "#f472b6",
  purple: "#c084fc",
  indigo: "#818cf8",
  blue: "#60a5fa",
  sky: "#38bdf8",
} as const;

interface Pill {
  label: string;
  tone: keyof typeof TONES;
  tier: 0 | 1 | 2;
}

const ABOVE: readonly Pill[] = [
  { label: "Beauty", tone: "rose", tier: 0 },
  { label: "Fashion", tone: "purple", tier: 0 },
  { label: "Gaming", tone: "indigo", tier: 0 },
  { label: "Fitness", tone: "sky", tier: 1 },
  { label: "Finance", tone: "blue", tier: 2 },
];

const BELOW: readonly Pill[] = [
  { label: "Food", tone: "pink", tier: 0 },
  { label: "Travel", tone: "sky", tier: 0 },
  { label: "Tech", tone: "indigo", tier: 0 },
  { label: "Skincare", tone: "rose", tier: 1 },
  { label: "Wellness", tone: "purple", tier: 2 },
];

/**
 * Tiers key off the card visual's own content width — ~271px on a phone, ~376px
 * on a tablet, ~554-581px on a desktop — so a row shows 3, 4 and 5 pills
 * respectively and never wraps into the map.
 */
const TIER_CLASS = [
  "inline-flex",
  "hidden @xs:inline-flex",
  "hidden @lg:inline-flex",
];

export function NicheCoverage({ active, fg, accent }: VisualProps) {
  const reduced = useReducedMotion() ?? false;
  const running = active && !reduced;

  const grey = tint(fg, 26);
  const neon = `color-mix(in oklab, ${accent} 88%, white)`;

  return (
    // A flex column rather than percentage anchors: the map takes whatever
    // height is left over, so the pill rows can never crowd it. The card visual
    // is 605x344 on a desktop but only 578x233 between the sm and md
    // breakpoints, and percentages could not hold both.
    <div className="@container absolute inset-0 flex flex-col overflow-hidden border border-white/15 bg-white/10 p-2 backdrop-blur-md @sm:p-3">
      <div className="flex shrink-0 items-baseline gap-2">
        <p
          className="text-[6.5px] font-semibold tracking-[0.18em] uppercase @sm:text-[8px]"
          style={{ color: tint(fg, 60) }}
        >
          Every niche, every market
        </p>
      </div>

      {/* Clears the header label — the float carries pills up to 3px. */}
      <PillRow
        pills={ABOVE}
        active={active}
        reduced={reduced}
        className="mt-1.5 @sm:mt-2"
      />

      {/* `meet` scales the map to fit the leftover box and centres it, so it
          stays proportional at every card size instead of stretching. */}
      <motion.svg
        viewBox={`0 0 ${MAP_COLS} ${MAP_ROWS}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
        className="my-2 w-full min-h-0 flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: reduced ? 0.2 : 0.9, ease: "easeOut" }}
      >
        {/* Static grey silhouette. Nothing here ever animates. */}
        <path
          d={LAND_D}
          fill="none"
          stroke={grey}
          strokeWidth={0.62}
          strokeLinecap="round"
        />

        {REGIONS.map((m, i) => (
          <motion.g
            key={m.key}
            initial={{ opacity: 0 }}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{
              duration: reduced ? 0.2 : 0.5,
              delay: reduced || !active ? 0 : 0.5 + i * 0.12,
            }}
          >
            {/* Soft constant bloom under the cluster. */}
            <path
              d={m.all}
              fill="none"
              stroke={accent}
              strokeWidth={1.15}
              strokeLinecap="round"
              opacity={0.16}
            />

            {/* Expanding ring, drawn at r=1 and scaled so the stroke stays
                crisp at every size. */}
            <circle
              cx={m.cx}
              cy={m.cy}
              r={1}
              fill="none"
              stroke={neon}
              strokeWidth={0.8}
              vectorEffect="non-scaling-stroke"
              opacity={0}
              style={
                {
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  "--niche-ring": m.spread + 4,
                  animation: running
                    ? `niche-ring ${RIPPLE}s ${m.delay}s cubic-bezier(0.22, 1, 0.36, 1) infinite backwards`
                    : undefined,
                } as React.CSSProperties
              }
            />

            {/* Fixed dots; only their opacity moves, band by band outward. */}
            {m.bands.map((d, b) => (
              <path
                key={b}
                d={d}
                fill="none"
                stroke={accent}
                strokeWidth={0.8}
                strokeLinecap="round"
                opacity={running ? undefined : 0.9}
                style={{
                  animation: running
                    ? `niche-dot-wave ${RIPPLE}s ${m.delay + b * 0.2}s ease-in-out infinite backwards`
                    : undefined,
                }}
              />
            ))}
          </motion.g>
        ))}
      </motion.svg>

      <PillRow
        pills={BELOW}
        active={active}
        reduced={reduced}
        offset={ABOVE.length}
      />
    </div>
  );
}

function PillRow({
  pills,
  active,
  reduced,
  offset = 0,
  className = "",
}: {
  pills: readonly Pill[];
  active: boolean;
  reduced: boolean;
  offset?: number;
  className?: string;
}) {
  return (
    // `flex-wrap` is a safety net only — the tiers are sized so a row never wraps.
    <div
      className={`flex shrink-0 flex-wrap items-center justify-center gap-1.5 @sm:gap-2.5 ${className}`}
    >
      {pills.map((pill, i) => {
        const n = offset + i;
        const tone = TONES[pill.tone];

        return (
          // Entrance lives on the outer layer; the float lives on the inner one,
          // so the looping transform never fights the entering one.
          <motion.span
            key={pill.label}
            className={TIER_CLASS[pill.tier]}
            initial={{ opacity: 0, scale: 0.86, filter: "blur(4px)" }}
            animate={
              active
                ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, scale: 0.86, filter: "blur(4px)" }
            }
            transition={
              active
                ? {
                    duration: 0.5,
                    delay: reduced ? 0 : 0.15 + n * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }
                : { duration: 0.25 }
            }
          >
            <span
              className="flex items-center gap-1 rounded-full border bg-white px-1.5 py-[3px] whitespace-nowrap @sm:gap-1.5 @sm:px-2.5 @sm:py-1"
              style={{
                borderColor: tone,
                boxShadow: `0 0 8px ${tone}33`,
                animation:
                  active && !reduced
                    ? `niche-float ${6 + (n % 4) * 0.9}s ${n * 0.45}s ease-in-out infinite`
                    : undefined,
              }}
            >
              <span
                className="h-1 w-1 shrink-0 rounded-full @sm:h-1.5 @sm:w-1.5"
                style={{ backgroundColor: tone }}
              />
              <span className="text-ink text-[7.5px] font-medium @sm:text-[9.5px]">
                {pill.label}
              </span>
            </span>
          </motion.span>
        );
      })}
    </div>
  );
}
