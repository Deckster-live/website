import content from "@/data/generated/content.json";

/**
 * Case study data — shared by the homepage carousel (CaseStudies.tsx) and
 * each case study's own page (/case-studies/[slug]). The studies themselves
 * are written in the CMS (admin.deckster.live); this file holds their types
 * and the colour themes.
 *
 * The object is split in two halves on purpose:
 *  - Fixed fields (tab, brand, metrics, reels, overview/challenge/approach/
 *    results...) always exist and always render in the same spot, so the
 *    admin panel can eventually expose them as plain form fields.
 *  - `content`: an ordered array of typed blocks for whatever varies from
 *    one case study to the next (an extra quote here, a gallery there).
 *    Adding a new block type only means adding a case to the renderer —
 *    no schema migration, and the CRM can reorder/add/remove blocks
 *    without touching code.
 */

export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudyReel {
  cover: string;
  link: string;
}

export interface CaseStudyTheme {
  bg: string;
  fg: string;
  muted: string;
  divider: string;
  pillBg: string;
  pillFg: string;
  dot: string;
  glow: string;
}

export const THEMES = {
  ink: {
    bg: "oklch(0.3133 0.0413 180.37)",
    fg: "text-paper",
    muted: "text-paper/65",
    divider: "border-white/15",
    pillBg: "bg-signal",
    pillFg: "text-ink",
    dot: "bg-signal",
    glow: "var(--signal)",
  },
  mint: {
    bg: "color-mix(in oklab, var(--signal) 16%, var(--paper))",
    fg: "text-ink",
    muted: "text-slate",
    divider: "border-line-strong",
    pillBg: "bg-green-dark",
    pillFg: "text-white",
    dot: "bg-green-dark",
    glow: "var(--green-dark)",
  },
  peach: {
    bg: "oklch(0.7395 0.058 155.23)",
    fg: "text-ink",
    muted: "text-ink/60",
    divider: "border-black/10",
    pillBg: "bg-ink",
    pillFg: "text-paper",
    dot: "bg-signal",
    glow: "var(--signal)",
  },
  forest: {
    bg: "var(--green-dark)",
    fg: "text-paper",
    muted: "text-paper/65",
    divider: "border-white/15",
    pillBg: "bg-signal",
    pillFg: "text-ink",
    dot: "bg-white",
    glow: "var(--signal)",
  },
  sand: {
    bg: "var(--mist)",
    fg: "text-ink",
    muted: "text-slate",
    divider: "border-line-strong",
    pillBg: "bg-ink",
    pillFg: "text-paper",
    dot: "bg-green-dark",
    glow: "var(--signal)",
  },
} as const satisfies Record<string, CaseStudyTheme>;

export type ThemeName = keyof typeof THEMES;

/** Flexible, admin-composed sections for the case study's own page. Each
 * block is self-contained and rendered by its `type` — see
 * src/components/case-study/CaseStudyBlocks.tsx. */
export type CaseStudyBlock =
  | { type: "richtext"; heading?: string; html: string }
  | { type: "stats"; heading?: string; stats: CaseStudyMetric[] }
  | { type: "quote"; quote: string; attribution?: string }
  | {
      type: "gallery";
      heading?: string;
      /** `alt` describes the image; `caption` is shown under it, so leave
       * `alt` out when the caption already says the same thing. */
      images: { src: string; alt?: string; caption?: string }[];
    };

/** One bullet on a case study page. Inline `<strong>` is highlighted in
 * green — use it for the number or the phrase that carries the point. */
export type CaseStudyPoint = string;

/** A named stage inside "Our Approach". Strategy, creator mix, execution and
 * anything else all live here as subheadings rather than separate sections. */
export interface CaseStudyApproachStep {
  heading: string;
  points: CaseStudyPoint[];
}

export interface CaseStudy {
  /** URL segment for /case-studies/[slug]. */
  slug: string;
  /** Label for the homepage carousel tab. */
  tab: string;
  brand: string;
  brand_logo: string;
  /** Optical size tweak so each tab/hero logo reads at the same visual weight — see BrandMarquee's `scale`. */
  logo_scale?: number;
  usp_metric: string;
  usp: string;
  metrics: CaseStudyMetric[];
  /** Short summary used on the homepage carousel card. */
  description: string;
  /** Every creative from the campaign. The homepage card shows the first
   * two; the case study's own page shows them all. */
  reels: CaseStudyReel[];
  theme: ThemeName;

  // --- Fixed sections for the case study's own page ---
  /** One or two sentences framing the brief. Inline HTML like the points. */
  overview: string;
  challenge: CaseStudyPoint[];
  approach: CaseStudyApproachStep[];
  /** Rendered last on the page, under the closing results band. */
  results: CaseStudyPoint[];
  /** Optional closing coda — the transferable lesson from the campaign. */
  learning?: string;
  /** Platforms the campaign ran on, shown as chips on the case study page. */
  platforms?: string[];
  /** Public Deckster Suite report backing every number on this page. */
  report_url?: string;
  /** ISO dates the study was published and last edited; set the Article schema dates. */
  published?: string;
  modified?: string;
  /** Search title and description set in the CMS (SEO tab). */
  meta_title?: string;
  meta_description?: string;
  /** Shown in the homepage carousel. */
  show_on_homepage: boolean;
  /** "Campaign led by": the people credited as the Article's authors. */
  leads: { name: string; role?: string }[];

  // --- Variable sections for the case study's own page ---
  content: CaseStudyBlock[];
}

/** Published case studies from the CMS, in homepage order. scripts/fetch-content.mjs writes this file
 * before every build and dev run; it is not committed. */
export const caseStudies = content.caseStudies as CaseStudy[];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
