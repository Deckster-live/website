/**
 * Case study data — shared by the homepage carousel (CaseStudies.tsx) and
 * each case study's own page (/case-studies/[slug]).
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
      images: { src: string; caption?: string }[];
    }
  | { type: "reels"; heading?: string; reels: CaseStudyReel[] };

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
  reels: CaseStudyReel[];
  theme: ThemeName;

  // --- Fixed sections for the case study's own page ---
  overview: string;
  challenge: string;
  approach: string;
  results: string;

  // --- Variable sections for the case study's own page ---
  content: CaseStudyBlock[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "rare-rabbit",
    tab: "Product Launch",
    brand_logo: "/logos/brands/rarerabbit.png",
    logo_scale: 1.4,
    brand: "Rare Rabbit",
    usp_metric: "94.8M",
    usp: "total campaign reach",
    metrics: [
      { label: "Reach", value: "94.8M" },
      { label: "Creators", value: "30+" },
      { label: "Content Pieces", value: "30" },
    ],
    description:
      "A category-driven creator campaign for the Spring/Summer 2026 launch delivered category-defining engagement and repurposable content at scale.",
    reels: [
      {
        cover: "/images/case_studies/rare_rabbit/thumbnail1.jpg",
        link: "https://www.instagram.com/reels/DW1SlshCP5P/",
      },
      {
        cover: "/images/case_studies/rare_rabbit/thumbnail3.jpg",
        link: "https://www.instagram.com/reels/DVvAQOfjBTH/",
      },
    ],
    theme: "sand",
    overview:
      "<p>Rare Rabbit needed to drive awareness for the Spring/Summer 2026 collection across all four House of Rare brands through a large-scale creator campaign. The objective was to execute 30 distinct content pieces within a tight 2–3 week timeline while ensuring every piece felt visually distinct and focused on a specific product category.</p>",
    challenge:
      "<p>Executing a collection launch across multiple brands required more than scattered creator posts—every piece needed to feel intentional, category-specific, and visually strong enough to stand out. The tight timeline and need for visual consistency across diverse creators made this particularly complex.</p>",
    approach:
      "<p>Instead of assigning products randomly, we mapped 30+ creators to specific categories based on their personal style, audience fit, and content strengths. Creators aligned with elevated casual fashion covered polo t-shirts and styling, while others were selected for trousers, check shirts, and statement pieces. We also developed one dedicated campaign piece introducing the entire collection—giving audiences a collection-first perspective before diving into individual categories. Fresh faces were onboarded alongside proven creators to bring newer content formats and creative freshness.</p>",
    results:
      "<p>The campaign reached 94.8M people with above-benchmark engagement across all activated creators. The category-specific approach ensured every content piece felt authentic and differentiated, while the curated creator mix delivered both reach and aesthetic cohesion. The campaign produced 30 pieces of usable content that extended value far beyond launch week.</p>",
    content: [
      {
        type: "stats",
        heading: "Campaign at a glance",
        stats: [
          { label: "Total Reach", value: "94.8M" },
          { label: "Creators Activated", value: "30+" },
          { label: "Content Pieces", value: "30" },
          { label: "Timeline", value: "2-3 weeks" },
        ],
      },
      {
        type: "richtext",
        heading: "The Strategy",
        html: "<p>We approached the campaign with a <strong>creator-first and category-specific mindset</strong>, ensuring that every piece of content felt distinct while still aligning with the larger Rare Rabbit brand narrative. Rather than assigning products randomly, we carefully mapped creators to categories based on their personal style, audience fit, and content strengths.</p><p>Alongside category-focused content, we developed one dedicated campaign piece that introduced the entire Spring/Summer 2026 collection as a whole—giving audiences an overall collection-first perspective before diving deeper into individual product categories. The focus was not just on reach, but on making every content piece feel intentional, graceful, and differentiated from the rest of the campaign.</p>",
      },
      {
        type: "richtext",
        heading: "Creator Mix & Execution",
        html: "<p>We activated a curated mix of mid-tier and macro fashion creators, selected based on audience-brand fit, styling relevance, and content quality rather than just follower count. Each creator was strategically mapped to a specific category to ensure the content felt authentic, visually distinct, and aligned with the product narrative.</p><p>Along with established creators, we experimented with fresh faces based on their potential, aesthetic, and previous content quality. This helped bring freshness to the campaign while also allowing Rare Rabbit to expand beyond a limited set of creators and explore newer creator-audience segments. Ad rights were secured at the brief stage, enabling top-performing pieces to run as paid social amplification post-campaign.</p>",
      },
      {
        type: "quote",
        quote: "Treating creator content as a paid media engine, not a one-time activation, multiplied campaign value 3-4x. The reach above represents organic only; paid amplification of top-performing pieces extended the campaign window by 90 days.",
        attribution: "Key Learning from Campaign",
      },
      {
        type: "reels",
        heading: "Featured content",
        reels: [
          {
            cover: "/images/case_studies/rare_rabbit/thumbnail1.jpg",
            link: "https://www.instagram.com/reels/DW1SlshCP5P/",
          },
          {
            cover: "/images/case_studies/rare_rabbit/thumbnail3.jpg",
            link: "https://www.instagram.com/reels/DVvAQOfjBTH/",
          },
        ],
      },
    ],
  },
  {
    slug: "policybazaar-uae",
    tab: "Brand Building",
    brand_logo: "/logos/brands/policybazar-ae.png",
    logo_scale: 1,
    brand: "Policy Bazaar– UAE",
    usp_metric: "3.1x",
    usp: "lift in brand search volume",
    metrics: [
      { label: "Reach", value: "22.3M" },
      { label: "Creators", value: "48" },
      { label: "Engagement", value: "6.8%" },
    ],
    description:
      "Recurring creator collaborations built consistent brand recall across festive and everyday campaigns alike.",
    reels: [
      {
        cover: "/images/case_studies/policy_bazar/thumbnail2.jpg",
        link: "https://www.instagram.com/reel/DTIIov_k0vG",
      },
      {
        cover: "/images/case_studies/policy_bazar/thumbnail1.jpg",
        link: "https://www.instagram.com/reel/DIgs93XoQ7j",
      },
    ],
    theme: "mint",
    overview:
      "<p>Policybazaar UAE needed brand recall to hold steady across both festive spikes and the quieter, everyday months in between.</p>",
    challenge:
      "<p>Insurance is a low-attention category outside of festive campaigns, so recall built during a push tended to fade fast once the campaign ended.</p>",
    approach:
      "<p>Rather than one-off bursts, we kept a rotating cast of 48 creators publishing year-round, syncing tone and offers to festive calendars without ever going fully quiet in between.</p>",
    results:
      "<p>Brand search volume lifted 3.1x, with engagement holding at 6.8% well outside the festive windows that used to be the only spikes.</p>",
    content: [
      {
        type: "quote",
        quote:
          "The always-on cadence is what finally made search volume look like a trend line instead of a series of spikes.",
        attribution: "Policybazaar UAE, Marketing Lead",
      },
      {
        type: "reels",
        heading: "Featured content",
        reels: [
          {
            cover: "/images/case_studies/policy_bazar/thumbnail2.jpg",
            link: "https://www.instagram.com/reel/DTIIov_k0vG",
          },
          {
            cover: "/images/case_studies/policy_bazar/thumbnail1.jpg",
            link: "https://www.instagram.com/reel/DIgs93XoQ7j",
          },
        ],
      },
    ],
  },
  {
    slug: "blissclub",
    tab: "Product Launch",
    brand_logo: "/logos/brands/blissclub.png",
    logo_scale: 1,
    brand: "BlissClub",
    usp_metric: "500K+",
    usp: "views in launch week",
    metrics: [
      { label: "Reach", value: "12.1M" },
      { label: "Creators", value: "36" },
      { label: "Sell-through", value: "91%" },
    ],
    description:
      "A coordinated seeding wave timed to the drop turned a single SKU launch into a category moment.",
    reels: [
      {
        cover: "/images/avatar.webp",
        link: "https://www.instagram.com/reel/dummy7",
      },
      {
        cover: "/images/avatar1.webp",
        link: "https://www.instagram.com/reel/dummy8",
      },
      {
        cover: "/images/avatar2.webp",
        link: "https://www.instagram.com/reel/dummy9",
      },
    ],
    theme: "peach",
    overview:
      "<p>BlissClub was launching a single new SKU and wanted launch week to feel like a category moment, not a quiet restock.</p>",
    challenge:
      "<p>A single-SKU drop has no existing buzz to build on, and a scattered seeding effort risked spreading reach too thin to sell through fast.</p>",
    approach:
      "<p>36 creators were seeded on the same coordinated timeline so posts landed together in a tight window around the drop, compounding reach instead of trickling it out.</p>",
    results:
      "<p>The drop crossed 500K views in launch week alone and sold through 91% of launch inventory before the seeding wave even finished.</p>",
    content: [
      {
        type: "gallery",
        heading: "The drop",
        images: [
          { src: "/images/avatar.webp", caption: "Launch day unboxing" },
          { src: "/images/avatar1.webp", caption: "Styling content" },
          { src: "/images/avatar2.webp", caption: "Community reaction" },
        ],
      },
    ],
  },
  {
    slug: "swisse",
    tab: "Paid Ads",
    brand_logo: "/logos/brands/swisse.svg",
    logo_scale: 1.2,
    brand: "Swisse",
    usp_metric: "41%",
    usp: "lower cost per click",
    metrics: [
      { label: "Reach", value: "30.4M" },
      { label: "Creators", value: "72" },
      { label: "ROAS", value: "4.6x" },
    ],
    description:
      "Creator-shot content fed straight into paid, cutting fatigue and lifting performance across every ad set.",
    reels: [
      {
        cover: "/images/case_studies/swisse/thumbnail2.jpg",
        link: "https://www.instagram.com/reels/DThPbcrE-25/",
      },
      {
        cover: "/images/case_studies/swisse/thumbnail1.jpg",
        link: "https://www.instagram.com/reels/DUA6matgjDA/",
      },
    ],
    theme: "forest",
    overview:
      "<p>Swisse's paid ad sets were fatiguing fast, with the same handful of creatives running until costs crept up week over week.</p>",
    challenge:
      "<p>A small in-house creative pool meant every ad set eventually recycled the same few hooks, and CPCs rose as audiences tired of them.</p>",
    approach:
      "<p>72 creators supplied a constant stream of native-feeling UGC that fed directly into whitelisted paid placements, so ad sets never ran the same creative long enough to fatigue.</p>",
    results:
      "<p>Cost per click dropped 41% and ROAS reached 4.6x once creative fatigue stopped being the bottleneck on every ad set.</p>",
    content: [
      {
        type: "stats",
        heading: "Campaign at a glance",
        stats: [
          { label: "Reach", value: "30.4M" },
          { label: "Creators", value: "72" },
          { label: "ROAS", value: "4.6x" },
          { label: "CPC", value: "-41%" },
        ],
      },
      {
        type: "reels",
        heading: "Featured content",
        reels: [
          {
            cover: "/images/case_studies/swisse/thumbnail2.jpg",
            link: "https://www.instagram.com/reels/DThPbcrE-25/",
          },
          {
            cover: "/images/case_studies/swisse/thumbnail1.jpg",
            link: "https://www.instagram.com/reels/DUA6matgjDA/",
          },
        ],
      },
    ],
  },
  {
    slug: "mahina",
    tab: "Store Launch",
    brand_logo: "/logos/brands/mahina.png",
    logo_scale: 1.05,
    brand: "Mahina",
    usp_metric: "3.2x",
    usp: "more store visits",
    metrics: [
      { label: "Reach", value: "9.8M" },
      { label: "Creators", value: "28" },
      { label: "Footfall", value: "+180%" },
    ],
    description:
      "Hyperlocal creators turned a store opening into a neighbourhood event, not just an announcement.",
    reels: [
      {
        cover: "/images/case_studies/mahina/thumbnail1.jpg",
        link: "https://www.instagram.com/reels/DTU9dXrisyu/",
      },
      {
        cover: "/images/case_studies/mahina/thumbnail2.jpg",
        link: "https://www.instagram.com/reels/DSkDavNEwk8/",
      },
    ],
    theme: "ink",
    overview:
      "<p>Mahina was opening a new physical store and wanted the neighbourhood to feel like it was happening, not just be told about it.</p>",
    challenge:
      "<p>A single announcement post reaches followers once and fades within a day, which isn't enough to turn into meaningful opening-day footfall.</p>",
    approach:
      "<p>28 hyperlocal creators covered the run-up and the opening itself from the ground, turning the store into recurring content rather than a one-time announcement.</p>",
    results:
      "<p>Store visits rose 3.2x with footfall up 180% against a comparable opening without creator coverage.</p>",
    content: [
      {
        type: "reels",
        heading: "Featured content",
        reels: [
          {
            cover: "/images/case_studies/mahina/thumbnail1.jpg",
            link: "https://www.instagram.com/reels/DTU9dXrisyu/",
          },
          {
            cover: "/images/case_studies/mahina/thumbnail2.jpg",
            link: "https://www.instagram.com/reels/DSkDavNEwk8/",
          },
        ],
      },
    ],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
