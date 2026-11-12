import { BarChart3, Eye, ShieldCheck, Target, TrendingUp } from "lucide-react";
import { HEAD_GAP, Section, SectionHead } from "@/components/ui/primitives";

interface Value {
  icon: typeof Eye;
  title: string;
  description: string;
  bg: string;
  fg: string;
  accent: string;
  wide?: boolean;
}

const values: readonly Value[] = [
  {
    icon: BarChart3,
    title: "Data Over Guesswork",
    description:
      "Creators are chosen on audience quality, past performance and fit, not follower count or who's easiest to book.",
    bg: "var(--ink)",
    fg: "var(--paper)",
    accent: "var(--signal)",
  },
  {
    icon: ShieldCheck,
    title: "Ownership, End to End",
    description:
      "One team from the first brief to the final report. If something slips, it's ours to fix, not a handoff to blame.",
    bg: "var(--green-dark)",
    fg: "var(--paper)",
    accent: "var(--signal)",
  },
  {
    icon: Eye,
    title: "Transparency, Always",
    description:
      "Live reports pulled from the platforms, honest timelines and clear costs. You see what we see.",
    bg: "var(--slate)",
    fg: "var(--paper)",
    accent: "var(--signal)",
  },
  {
    icon: Target,
    title: "Relevance Over Reach",
    description:
      "A creator your customer trusts beats a big name they scroll past. We match for fit first.",
    bg: "var(--green-peacock)",
    fg: "var(--paper)",
    accent: "var(--signal)",
  },
  {
    icon: TrendingUp,
    title: "Built to Scale With You",
    description:
      "One seeding drop or a year-long program, the same rigour applies. Nothing we run is a one-off.",
    bg: "var(--signal)",
    fg: "var(--ink)",
    accent: "var(--green-dark)",
    wide: true,
  },
] as const;

function ValueTile({ icon: Icon, title, description, bg, fg, accent, wide }: Value) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-7 md:p-9 ${
        wide ? "md:col-span-2" : ""
      }`}
      style={{ backgroundColor: bg, color: fg }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-8 -bottom-10 h-36 w-36 rounded-full"
        style={{ backgroundColor: accent, opacity: 0.14 }}
      />

      <span
        className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl"
        style={{
          backgroundColor: `color-mix(in oklab, ${fg} 14%, transparent)`,
        }}
      >
        <Icon className="h-5 w-5" style={{ color: accent }} strokeWidth={1.75} />
      </span>

      <h3 className="font-display relative mt-5 text-xl font-semibold md:text-2xl">
        {title}
      </h3>

      <p
        className="relative mt-3 max-w-md text-[14px] leading-relaxed md:text-[15px]"
        style={{ color: `color-mix(in oklab, ${fg} 74%, transparent)` }}
      >
        {description}
      </p>
    </div>
  );
}

export function AboutValues() {
  return (
    <Section id="values" className="bg-mist/60">
      <SectionHead
        align="center"
        eyebrow="What we stand by"
        title="The principles behind every campaign"
      />

      <div className={`grid grid-cols-1 gap-5 md:grid-cols-2 ${HEAD_GAP}`}>
        {values.map((value) => (
          <ValueTile key={value.title} {...value} />
        ))}
      </div>
    </Section>
  );
}
