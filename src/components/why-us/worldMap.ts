// GENERATED — do not hand-edit. Run: node scripts/generate-world-map.mjs
//
// A Natural Earth 110m country topology (world-atlas) rasterised onto a
// 120 x 43 equirectangular grid spanning 180W-180E and 72N-56S:
// Antarctica is cropped and the Arctic trimmed, which is what gives the map its
// familiar dotted-silhouette proportions.

/** Grid width in cells; also the SVG viewBox width. */
export const MAP_COLS = 120;
/** Grid height in cells; also the SVG viewBox height. */
export const MAP_ROWS = 43;

/**
 * Land mask, one hex string per grid row, 4 cells per character (MSB = leftmost
 * cell). Cells claimed by a highlighted market are already cleared here so the
 * grey and green layers never double-draw the same dot.
 */
export const LAND_MASK: readonly string[] = [
  "83f8f7dffc3ff8003e06bfffffffe6",
  "efffffffbe3fe000ffffffffffffff",
  "6fffffbfbe3e0e01ffffffffffffff",
  "0ffffe183c1c0007dfffffffffffff",
  "03c7fe183e000023dfffffffffffc0",
  "0200fe1fff8000739fffffffffc0c0",
  "00007fbfffc0007ffffffffffff080",
  "00007fffffc0003ffffffffffff000",
  "00003fffff00001fffffffffffd000",
  "00003f87fa00007ffc77ffffff9800",
  "00003f83f000007bfffffffffe3000",
  "00001f83e000007f97fffffffa6000",
  "00000fc7e000007f00fffffff3e000",
  "000007ff800000fffffffffff90000",
  "000003f0800000fffff7fdfff80000",
  "000003f0400001fffff8f0fff80000",
  "000001f0c00003ffff7910ffe80000",
  "00800076380003ffffff009f800000",
  "0000003f000003ffffbc081f080000",
  "00000007000003fbfff0060f8c0000",
  "000000015f0001f8ffc80603140000",
  "00000000ff8001f8fff803040c0000",
  "000000003fe00071fff0000e300000",
  "000000007ff00001ffe00006fe0000",
  "000000007ff80001ffc00006f9e000",
  "000000007fff0000ff80000329fa00",
  "000000007fff8000ff800001f03880",
  "000000003fff0000ffc00000041640",
  "000000003ffe0000ffc8000003d000",
  "000000001ffe0000fff8000007d801",
  "000000000ffe0000ff1800001e3c00",
  "000000000ffc0000ff3000003c1e00",
  "000000000ff000007f1000003c1e00",
  "000000000ff000007e0000003e1e00",
  "000000000fe000003c0000003e3e00",
  "000000000fc0000038000000387e00",
  "000000001f80000000000000003c02",
  "000000001f00000000000000000806",
  "000000001e0000000000000000080c",
  "000000001c00000000000000000008",
  "000000001c00000000001000000000",
  "000000001880000000000000000000",
  "000000000c00000000000000000000",
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
  {
    key: "usa",
    label: "USA",
    cx: 27.38,
    cy: 10.91,
    spread: 2.35,
    delay: 0,
    dots: [[27,10],[27,11],[26,10],[26,11],[28,10],[28,11],[27,9],[26,9],[27,12],[28,9],[25,10],[26,12],[25,11],[28,12],[29,10],[25,9],[29,11]],
  },
  {
    key: "canada",
    label: "Canada",
    cx: 25.07,
    cy: 4.5,
    spread: 2.05,
    delay: 1.7,
    dots: [[25,4],[24,4],[25,3],[25,5],[26,4],[24,3],[24,5],[26,3],[26,5],[23,4],[25,2],[25,6],[23,3],[23,5]],
  },
  {
    key: "india",
    label: "India",
    cx: 86.13,
    cy: 16.75,
    spread: 2.28,
    delay: 0.45,
    dots: [[86,16],[85,16],[86,17],[85,17],[86,15],[87,16],[85,15],[87,17],[84,16],[87,15],[86,18],[84,17],[85,18],[84,15],[86,14],[87,18]],
  },
  {
    key: "uae",
    label: "UAE",
    cx: 78.5,
    cy: 16,
    spread: 1.12,
    delay: 2.95,
    dots: [[78,15],[78,16],[77,16],[79,15]],
  },
  {
    key: "nigeria",
    label: "Nigeria",
    cx: 62.38,
    cy: 21,
    spread: 1.74,
    delay: 2.35,
    dots: [[62,20],[62,21],[63,20],[63,21],[61,20],[61,21],[62,22],[61,19]],
  },
  {
    key: "australia",
    label: "Australia",
    cx: 104.6,
    cy: 32.45,
    spread: 2.33,
    delay: 1.15,
    dots: [[104,32],[105,32],[104,31],[105,31],[104,33],[103,32],[105,33],[103,31],[103,33],[106,32],[104,30],[106,31],[105,30],[106,33],[104,34],[102,32],[103,30],[105,34],[102,31],[103,34]],
  },
];
