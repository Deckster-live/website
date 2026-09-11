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
  /** One or two sentences framing the brief. Plain text, no markup. */
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
    usp_metric: "116.5M",
    usp: "views across 26 pieces of content",
    metrics: [
      { label: "Views", value: "116.5M" },
      { label: "Creators", value: "25" },
      { label: "Likes", value: "125.8K" },
    ],
    description:
      "A category-driven creator campaign for the Spring/Summer 2026 launch, delivering reach and repurposable content at scale.",
    report_url: "https://app.deckster.live/reports/ee12a313/public",
    platforms: ["Instagram"],
    reels: [
      {
        cover: "/images/case_studies/rare_rabbit/reel1.webp",
        link: "https://www.instagram.com/reel/DWJBTdwjKOo/",
      },
      {
        cover: "/images/case_studies/rare_rabbit/reel2.webp",
        link: "https://www.instagram.com/reel/DVvAQOfjBTH/",
      },
      {
        cover: "/images/case_studies/rare_rabbit/reel3.webp",
        link: "https://www.instagram.com/reel/DV3hH6NEga_/",
      },
      {
        cover: "/images/case_studies/rare_rabbit/reel4.webp",
        link: "https://www.instagram.com/reel/DWGyFBEjxWj/",
      },
      {
        cover: "/images/case_studies/rare_rabbit/reel5.webp",
        link: "https://www.instagram.com/reel/DWTaYOnk1lR/",
      },
      {
        cover: "/images/case_studies/rare_rabbit/reel6.webp",
        link: "https://www.instagram.com/reel/DWjCye4k2rO/",
      },
      {
        cover: "/images/case_studies/rare_rabbit/reel7.webp",
        link: "https://www.instagram.com/reel/DWOhqAAiLXf/",
      },
      {
        cover: "/images/case_studies/rare_rabbit/reel8.webp",
        link: "https://www.instagram.com/reel/DWq5_dQDXeN/",
      },
    ],
    theme: "sand",
    overview:
      "D2C · Fashion · Menswear — awareness for the Spring/Summer 2026 collection across all four House of Rare brands, in one 2-3 week window.",
    challenge: [
      "<strong>Four brands, one launch window.</strong> A collection this size needed more than scattered creator posts.",
      "<strong>2-3 weeks end to end.</strong> Briefing, shooting and publishing with no room to re-shoot.",
      "<strong>Sameness kills a launch.</strong> Twenty-five creators on the same product reads as one ad repeated twenty-five times.",
      "Every piece had to be <strong>visually strong enough to stand alone</strong>, not just fill a content calendar.",
    ],
    approach: [
      {
        heading: "The Strategy",
        points: [
          "Creator-first and <strong>category-specific</strong> — every piece tied to one product story, never the whole catalogue.",
          "One dedicated <strong>collection film</strong> introduced SS'26 as a whole before the category pieces went live.",
          "The thesis: category ownership per creator beats volume, because distinct stories outlast identical ones.",
        ],
      },
      {
        heading: "Creator Selection",
        points: [
          "<strong>25 mid-tier and macro</strong> fashion creators, filtered on styling relevance and content quality over follower count.",
          "Mapped by personal style — elevated casual to polos, tailored voices to trousers, statement creators to check shirts.",
          "<strong>Fresh faces onboarded</strong> alongside proven names, judged on aesthetic and past content rather than track record alone.",
        ],
      },
      {
        heading: "Brief Framework",
        points: [
          "One <strong>category per creator</strong>, so no two pieces competed for the same frame.",
          "<strong>Ad rights secured at brief stage</strong> — not renegotiated after a post performed.",
          "Creator freedom on format and tone within the category they owned.",
        ],
      },
      {
        heading: "Execution",
        points: [
          "<strong>26 deliverables</strong> published inside the launch window.",
          "Top performers moved into <strong>paid social</strong> as whitelisted creative once the organic window closed.",
        ],
      },
    ],
    results: [
      "<strong>116.5M views</strong> across 26 deliverables from 25 creators.",
      "<strong>125.8K likes</strong> and 3.7K shares, at a <strong>1.182% average engagement rate</strong>.",
      "The top reel alone drew <strong>24M views</strong>; four more cleared 8M each.",
      "Whitelisting the top performers extended the campaign window on paid long after launch week.",
    ],
    learning:
      "Treating creator content as a <strong>paid media engine, not a one-time activation</strong>, is what kept this working past launch week. The views above are organic only — securing ad rights at brief stage let the top-performing pieces keep running.",
    content: [],
  },
  {
    slug: "policybazaar-uae",
    tab: "Brand Building",
    brand_logo: "/logos/brands/policybazar-ae.png",
    logo_scale: 1,
    brand: "Policy Bazaar– UAE",
    usp_metric: "1.34%",
    usp: "average engagement rate in a low-attention category",
    metrics: [
      { label: "Views", value: "293.2K" },
      { label: "Avg. E.R.", value: "1.34%" },
      { label: "Shares", value: "624" },
    ],
    description:
      "Recurring creator collaborations building brand recall for an international insurer in the UAE market.",
    report_url: "https://app.deckster.live/reports/1947e07c/public",
    platforms: ["Instagram"],
    reels: [
      {
        cover: "/images/case_studies/policy_bazar/reel1.webp",
        link: "https://www.instagram.com/reel/DTIIov_k0vG/",
      },
      {
        cover: "/images/case_studies/policy_bazar/reel2.webp",
        link: "https://www.instagram.com/reel/DKrhhK9zGUj/",
      },
      {
        cover: "/images/case_studies/policy_bazar/reel3.webp",
        link: "https://www.instagram.com/reel/DM7xWzlN5lA/",
      },
      {
        cover: "/images/case_studies/policy_bazar/reel4.webp",
        link: "https://www.instagram.com/reel/DTIXacsAUs4/",
      },
      {
        cover: "/images/case_studies/policy_bazar/reel5.webp",
        link: "https://www.instagram.com/reel/DIgs93XoQ7j/",
      },
    ],
    theme: "mint",
    overview:
      "Insurance · Fintech · UAE — an international brief run outside India, building recall for Policybazaar in a market where the brand had to earn trust from scratch.",
    challenge: [
      "<strong>An international market, not a home one.</strong> Brand equity built in India does not transfer to UAE audiences.",
      "Insurance is a <strong>low-attention category</strong> outside festive windows.",
      "Recall built during a push <strong>faded within weeks</strong> of a campaign ending.",
      "The objective was <strong>brand awareness and lead generation</strong> at once, not one at the expense of the other.",
    ],
    approach: [
      {
        heading: "The Strategy",
        points: [
          "<strong>Always-on over one-off bursts</strong> — never fully quiet between festive pushes.",
          "Tone and offers synced to the UAE festive calendar rather than the Indian one.",
        ],
      },
      {
        heading: "Creator Selection",
        points: [
          "<strong>UAE-resident creators</strong> speaking to expat and local audiences in-market.",
          "A small, <strong>repeat roster</strong> rather than a wide one-off spread, so faces became familiar.",
        ],
      },
      {
        heading: "Brief Framework",
        points: [
          "Everyday-finance framing, so insurance arrived as useful information rather than an ad.",
          "Creator freedom on format, with compliance non-negotiables fixed.",
        ],
      },
      {
        heading: "Execution",
        points: [
          "<strong>7 deliverables</strong> across a repeat roster of 4 creators, published on a rolling cadence.",
        ],
      },
    ],
    results: [
      "<strong>1.344% average engagement rate</strong> — strong for a low-attention category like insurance.",
      "<strong>293.2K views</strong> and 5.7K likes across 7 deliverables.",
      "<strong>624 shares</strong>, the signal that matters when the product needs explaining before it sells.",
      "The top performer reached <strong>145.1K views at a 3.23% engagement rate</strong>, well above the campaign average.",
    ],
    learning:
      "Running an <strong>international brief in-market beats exporting a domestic one</strong>. A small repeat roster of UAE-resident creators built familiarity that a wider one-off spread could not, and the share count shows the category was being passed on, not just watched.",
    content: [
      {
        type: "quote",
        quote:
          "The always-on cadence is what finally made search volume look like a trend line instead of a series of spikes.",
        attribution: "Policybazaar UAE, Marketing Lead",
      },
    ],
  },
  {
    slug: "blissclub",
    tab: "Product Launch",
    brand_logo: "/logos/brands/blissclub.png",
    logo_scale: 1,
    brand: "BlissClub",
    usp_metric: "4.46%",
    usp: "average engagement rate across the drop",
    metrics: [
      { label: "Views", value: "1.2M" },
      { label: "Avg. E.R.", value: "4.46%" },
      { label: "Likes", value: "32.1K" },
    ],
    description:
      "A coordinated seeding wave timed to the drop turned a single launch into a category moment.",
    report_url: "https://app.deckster.live/reports/5e2d59a0/public",
    platforms: ["Instagram"],
    reels: [
      {
        cover: "/images/case_studies/blissclub/reel1.webp",
        link: "https://www.instagram.com/reel/DZ-fyN7PQMM/",
      },
      {
        cover: "/images/case_studies/blissclub/reel2.webp",
        link: "https://www.instagram.com/reel/DbTGyrQyJ-Z/",
      },
      {
        cover: "/images/case_studies/blissclub/reel3.webp",
        link: "https://www.instagram.com/reel/Da0UiWPoqOF/",
      },
      {
        cover: "/images/case_studies/blissclub/reel4.webp",
        link: "https://www.instagram.com/reel/Dcd6CD3Mz6e/",
      },
      {
        cover: "/images/case_studies/blissclub/reel5.webp",
        link: "https://www.instagram.com/reel/DbnjaPqNdyL/",
      },
      {
        cover: "/images/case_studies/blissclub/reel6.webp",
        link: "https://www.instagram.com/reel/DbnSxDOJT5g/",
      },
      {
        cover: "/images/case_studies/blissclub/reel7.webp",
        link: "https://www.instagram.com/reel/DbdSYS1gLYC/",
      },
      {
        cover: "/images/case_studies/blissclub/reel8.webp",
        link: "https://www.instagram.com/reel/DbGGLqoIXr4/",
      },
    ],
    theme: "peach",
    overview:
      "D2C · Apparel · Activewear — a drop that needed to feel like a category moment, not a quiet restock.",
    challenge: [
      "A new drop has <strong>no existing buzz</strong> to build on.",
      "Scattered seeding would spread reach too thin to land as a moment.",
      "<strong>Launch week was the only window</strong> that mattered.",
    ],
    approach: [
      {
        heading: "The Strategy",
        points: [
          "Compress reach into a <strong>tight window</strong> around the drop so posts compound instead of trickle.",
          "Optimise for <strong>engagement depth over raw reach</strong> — a seeded drop converts on trust, not impressions.",
        ],
      },
      {
        heading: "Creator Selection",
        points: [
          "<strong>12 creators</strong> chosen for category credibility in fitness and lifestyle, not follower count.",
          "A deliberately tight roster, so each creator carried real weight with their own audience.",
        ],
      },
      {
        heading: "Brief Framework",
        points: [
          "Product-in-use framing over studio polish.",
          "Creator freedom on format, with the drop date fixed across the roster.",
        ],
      },
      {
        heading: "Execution",
        points: [
          "<strong>14 deliverables</strong> seeded on one coordinated timeline.",
        ],
      },
    ],
    results: [
      "<strong>4.464% average engagement rate</strong> — roughly four times the benchmark across the rest of this roster of campaigns.",
      "<strong>1.2M views</strong> and 32.1K likes from just 12 creators.",
      "<strong>2.8K shares</strong> on 14 deliverables.",
      "One creator hit a <strong>14.8% engagement rate</strong>, and the top reel crossed <strong>1M views</strong> on its own.",
    ],
    learning:
      "A <strong>tight roster beats a wide one</strong> when the goal is a moment rather than a footprint. Twelve credible creators produced a 4.46% engagement rate — the highest of any campaign in this set — because each one carried genuine weight with their own audience.",
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
    tab: "Purchase Intent",
    brand_logo: "/logos/brands/swisse.svg",
    logo_scale: 1.2,
    brand: "Swisse",
    usp_metric: "14.8M",
    usp: "views from a 25-creator intent campaign",
    metrics: [
      { label: "Views", value: "14.8M" },
      { label: "Creators", value: "25" },
      { label: "Shares", value: "2.3K" },
    ],
    description:
      "A long-term partnership turning influencer campaigns into measurable purchase intent.",
    report_url: "https://app.deckster.live/reports/de5641a7/public",
    platforms: ["Instagram"],
    reels: [
      {
        cover: "/images/case_studies/swisse/reel1.webp",
        link: "https://www.instagram.com/reel/DUDhNirjyh7/",
      },
      {
        cover: "/images/case_studies/swisse/reel2.webp",
        link: "https://www.instagram.com/reel/DUA6matgjDA/",
      },
      {
        cover: "/images/case_studies/swisse/reel3.webp",
        link: "https://www.instagram.com/reel/DWWZHCADR5k/",
      },
      {
        cover: "/images/case_studies/swisse/reel4.webp",
        link: "https://www.instagram.com/reel/DTkpR8BDE79/",
      },
      {
        cover: "/images/case_studies/swisse/reel5.webp",
        link: "https://www.instagram.com/reel/DUqTn5XDKXJ/",
      },
      {
        cover: "/images/case_studies/swisse/reel6.webp",
        link: "https://www.instagram.com/reel/DV_BnxQjFNc/",
      },
      {
        cover: "/images/case_studies/swisse/reel7.webp",
        link: "https://www.instagram.com/reel/DTNijwrDWUP/",
      },
      {
        cover: "/images/case_studies/swisse/reel8.webp",
        link: "https://www.instagram.com/reel/DWbXoRjEZB7/",
      },
    ],
    theme: "forest",
    overview:
      "Wellness · Supplements · Multi-campaign — a long-term partnership turning influencer campaigns into measurable purchase intent.",
    challenge: [
      "Earlier campaigns produced <strong>strong reach but unclear commercial outcomes</strong>.",
      "Swisse wanted Indian creator marketing to deliver <strong>measurable purchase intent</strong>, not vanity metrics.",
      "<strong>No line of sight</strong> from a creator post to an actual buyer.",
    ],
    approach: [
      {
        heading: "The Strategy",
        points: [
          "Shifted from <strong>awareness-led briefs to intent-led mechanics</strong>.",
          "The hero campaign used a <strong>comment-to-link mechanic</strong> — viewers dropped a comment to receive the purchase link by DM.",
          "This turned passive viewing into an <strong>active declaration of intent</strong>.",
        ],
      },
      {
        heading: "Creator Selection",
        points: [
          "<strong>Skincare-focused creators</strong> with proven trust in the category.",
          "Audiences matched to the <strong>glutathione supplement's buyer profile</strong>, not to follower count.",
        ],
      },
      {
        heading: "Mechanic Design",
        points: [
          "<strong>Comment-to-link CTA</strong> — viewers commented to opt in.",
          "An automated DM delivered the purchase link with <strong>creator-specific tracking</strong>.",
        ],
      },
      {
        heading: "Hook Design",
        points: [
          "Hooks tested for <strong>curiosity and intent</strong> rather than entertainment value.",
        ],
      },
      {
        heading: "Long-term Partnership",
        points: [
          "Ongoing campaigns through <strong>2025-26</strong> across multiple Swisse SKUs.",
          "Each one measured against the <strong>Layer 1-4 ROI framework</strong>.",
        ],
      },
    ],
    results: [
      "<strong>14.8M views</strong> across 25 deliverables from 25 creators.",
      "<strong>2.3K shares</strong> and 13.1K likes, at a <strong>0.721% average engagement rate</strong>.",
      "The top reel drew <strong>3.1M views</strong> on its own, with two more clearing 1.3M each.",
      "The intent mechanic's best post ran at a <strong>3.156% engagement rate</strong> — mid-pack on views, top of the table on engagement.",
    ],
    learning:
      "<strong>Intent-based mechanics surface buyers that engagement metrics miss.</strong> The highest-engagement post in this campaign sat well down the table on views — reach and intent are not the same ranking, and only one of them predicts a purchase.",
    content: [],
  },
  {
    slug: "mahina",
    tab: "Category Launch",
    brand_logo: "/logos/brands/mahina.png",
    logo_scale: 1.05,
    brand: "Mahina",
    usp_metric: "100",
    usp: "creators activated to launch a new category",
    metrics: [
      { label: "Views", value: "8.9M" },
      { label: "Creators", value: "100" },
      { label: "Avg. E.R.", value: "2.59%" },
    ],
    description:
      "Activating 100 creators to launch teen-focused period panties — a category with no precedent in Indian D2C.",
    report_url: "https://app.deckster.live/reports/c847cf16/public",
    platforms: ["Instagram", "YouTube"],
    // Numbers below are from the Deckster Suite report for this campaign
    // (c847cf16). Add-to-cart lift is not in the report and is the one figure
    // from the original brief still awaiting client confirmation.
    reels: [
      {
        cover: "/images/case_studies/mahina/reel1.webp",
        link: "https://www.instagram.com/reel/DSkDavNEwk8/",
      },
      {
        cover: "/images/case_studies/mahina/reel2.webp",
        link: "https://www.instagram.com/reel/DTuQ0jwk1Lg/",
      },
      {
        cover: "/images/case_studies/mahina/reel3.webp",
        link: "https://www.instagram.com/reel/DTU9dXrisyu/",
      },
      {
        cover: "/images/case_studies/mahina/reel4.webp",
        link: "https://www.instagram.com/reel/DUdDFhGkuuz/",
      },
      {
        cover: "/images/case_studies/mahina/reel5.webp",
        link: "https://www.instagram.com/reel/DT7o3WxktzP/",
      },
      {
        cover: "/images/case_studies/mahina/reel6.webp",
        link: "https://www.instagram.com/reel/DTIpnJ-E44U/",
      },
    ],
    theme: "ink",
    overview:
      "D2C · Wellness · Period Care — launching teen-focused period panties, a category with no precedent in Indian D2C.",
    challenge: [
      "<strong>No category precedent.</strong> Teen-focused period panties had no reference point in the Indian D2C market.",
      "<strong>Two audiences at once.</strong> Teens and their parents both had to be educated, in the same campaign.",
      "<strong>An intimate product.</strong> Trust had to be built before discovery could convert.",
      "A brand most consumers had <strong>never heard of</strong>.",
    ],
    approach: [
      {
        heading: "The Strategy",
        points: [
          "<strong>Breadth over concentration</strong> — 100 creators rather than budget parked on a few large names.",
          "The thesis: for a category-defining launch, a spread of authentic voices outperforms a handful of polished campaigns.",
          "Activated across <strong>teen lifestyle, parenting and wellness</strong> so the conversation happened in every relevant sub-niche at once.",
        ],
      },
      {
        heading: "Creator Selection",
        points: [
          "Audience age filtered to <strong>13-24</strong>.",
          "Engagement quality above <strong>3%</strong>, with a comment-to-like ratio above <strong>1.2%</strong>.",
          "<strong>Category trust</strong> — creators who had already discussed health and body topics openly.",
        ],
      },
      {
        heading: "Brief Framework",
        points: [
          "A <strong>three-tier brief</strong>: non-negotiables covering claims and disclaimers.",
          "Outcome metric set on <strong>saves, shares and DMs</strong> rather than views.",
          "Creator freedom on format and tone.",
        ],
      },
      {
        heading: "Sprint & Rollout",
        points: [
          "A <strong>15-day activation sprint</strong> took 100 creators from outreach through contracting and briefing to first live content.",
          "Publishing then rolled out across the campaign window, with <strong>101 deliverables</strong> live in total.",
        ],
      },
      {
        heading: "Live Measurement",
        points: [
          "Every post tracked in <strong>Deckster Suite</strong> for engagement quality, share rate and DM inbound.",
          "Views treated as a secondary signal, never the scoreboard.",
        ],
      },
    ],
    results: [
      "<strong>8.9M views</strong> across 101 deliverables from 100 creators.",
      "<strong>25.3K shares</strong> against 47.5K likes — an unusually high share-to-like ratio, the signal that matters when a category has to be explained before it can be bought.",
      "<strong>2.59% average engagement rate</strong>, with 4.7K comments across the campaign.",
      "Top reel hit <strong>817.6K views</strong>, and three creators cleared 390K each.",
    ],
    learning:
      "For category-creating launches, <strong>distributed activation outperforms concentrated bets</strong>. The 100-creator approach generated audience-level conversations across teen, parenting and wellness at once — and the share volume, not the view count, is what showed the category was actually being explained onward.",
    content: [],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
