import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Clapperboard,
  Compass,
  Lightbulb,
  Route,
  Target,
  TrendingUp,
} from "lucide-react";
import { CaseStudyReelsGrid } from "@/components/case-study/CaseStudyReels";
import type {
  CaseStudyApproachStep,
  CaseStudyMetric,
  CaseStudyPoint,
  CaseStudyReel,
} from "@/data/mockdata/case-studies";

/** Heading with its icon chip — one visual anchor per fixed section. */
function SectionHeading({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden
        className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-signal/12 text-green-dark ring-1 ring-signal/20"
      >
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
      </span>
      <h2 className="font-display text-xl font-semibold md:text-2xl">
        {children}
      </h2>
    </div>
  );
}

/** Bullets with a signal-green chevron marker instead of a disc. */
function PointList({ points }: { points: CaseStudyPoint[] }) {
  return (
    <ul className="space-y-3.5">
      {points.map((point) => (
        <li key={point} className="flex gap-3">
          <svg
            aria-hidden
            viewBox="0 0 20 20"
            className="mt-[3px] h-[15px] w-[15px] shrink-0 text-green-dark"
          >
            <circle
              cx="10"
              cy="10"
              r="9"
              fill="currentColor"
              fillOpacity="0.18"
            />
            <path
              d="M6.5 10.2l2.4 2.4 4.6-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            className="case-point text-[14.5px] leading-relaxed text-slate md:text-[15px]"
            dangerouslySetInnerHTML={{ __html: point }}
          />
        </li>
      ))}
    </ul>
  );
}

/** Lede paragraph — the only prose left on the page. */
export function CaseStudyOverview({ overview }: { overview: string }) {
  return (
    <section>
      <SectionHeading icon={Compass}>Overview</SectionHeading>
      <p className="mt-4 border-l-2 border-signal pl-5 text-[15.5px] leading-relaxed text-ink md:text-[17px]">
        {overview}
      </p>
    </section>
  );
}

export function CaseStudyChallenge({ points }: { points: CaseStudyPoint[] }) {
  return (
    <section>
      <SectionHeading icon={Target}>The Challenge</SectionHeading>
      <div className="mt-5">
        <PointList points={points} />
      </div>
    </section>
  );
}

/** Approach holds every stage — strategy, creator mix, execution — as
 * numbered subheadings on a single connecting rail. */
export function CaseStudyApproach({
  steps,
}: {
  steps: CaseStudyApproachStep[];
}) {
  return (
    <section>
      <SectionHeading icon={Route}>Our Approach</SectionHeading>

      <ol className="mt-6 space-y-8 md:space-y-10">
        {steps.map((step, i) => (
          <li key={step.heading} className="relative pl-11 md:pl-14">
            <span
              aria-hidden
              className="font-display absolute top-0 left-0 grid h-8 w-8 place-items-center rounded-full bg-green-dark text-[12px] font-semibold text-paper md:h-9 md:w-9 md:text-[13px]"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className="absolute top-9 bottom-[-2rem] left-4 w-px bg-linear-to-b from-signal/45 to-signal/5 md:top-10 md:bottom-[-2.5rem] md:left-[1.125rem]"
              />
            )}

            <h3 className="font-display text-[17px] font-semibold text-ink md:text-lg">
              {step.heading}
            </h3>
            <div className="mt-3.5">
              <PointList points={step.points} />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Platforms the campaign ran on. */
export function CaseStudyPlatforms({ platforms }: { platforms: string[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {platforms.map((platform) => (
        <span
          key={platform}
          className="rounded-full bg-signal/12 px-3 py-1 text-[12px] font-medium text-green-dark ring-1 ring-signal/20"
        >
          {platform}
        </span>
      ))}
    </div>
  );
}

/** Link out to the public Deckster Suite report these numbers come from. */
export function CaseStudyReportLink({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/report inline-flex items-center gap-1.5 text-[13px] font-medium text-green-dark underline decoration-signal/40 underline-offset-4 transition-colors hover:decoration-green-dark ${className ?? ""}`}
    >
      View the live campaign report
      <ArrowUpRight
        aria-hidden
        className="h-3.5 w-3.5 transition-transform duration-200 group-hover/report:translate-x-0.5 group-hover/report:-translate-y-0.5"
      />
    </a>
  );
}

/** Every creative from the campaign — the grid itself is a client component
 * so anything past the first row can collapse behind a toggle. */
export function CaseStudyReels({ reels }: { reels: CaseStudyReel[] }) {
  if (reels.length === 0) return null;

  return (
    <section>
      <SectionHeading icon={Clapperboard}>Featured content</SectionHeading>
      <CaseStudyReelsGrid reels={reels} />
    </section>
  );
}

/** Closing coda — the one transferable lesson from the campaign. */
export function CaseStudyLearning({ learning }: { learning: string }) {
  return (
    <section className="border-l-2 border-signal pl-5 md:pl-6">
      <p className="eyebrow flex items-center gap-2">
        <Lightbulb aria-hidden className="h-3.5 w-3.5 text-green-dark" />
        What we learned
      </p>
      <p
        className="case-point mt-3 text-[15px] leading-relaxed text-slate md:text-[15.5px]"
        dangerouslySetInnerHTML={{ __html: learning }}
      />
    </section>
  );
}

/** The payoff, and the last thing on the page — same light treatment as the
 * sections above it, set on mist so it still reads as the closing beat. */
export function CaseStudyResults({
  points,
  metrics,
  reportUrl,
}: {
  points: CaseStudyPoint[];
  metrics: CaseStudyMetric[];
  reportUrl?: string;
}) {
  return (
    <section className="rounded-2xl bg-mist p-6 ring-1 ring-line md:rounded-3xl md:p-8">
      <SectionHeading icon={TrendingUp}>The Results</SectionHeading>

      <div className="mt-6 grid grid-cols-3 gap-3 border-y border-line-strong py-5 md:gap-6 md:py-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="min-w-0">
            <p className="font-display text-2xl leading-none font-semibold text-green-dark md:text-3xl">
              {metric.value}
            </p>
            <p className="mt-2 text-[0.6875rem] tracking-[0.18em] text-slate uppercase">
              {metric.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <PointList points={points} />
      </div>

      {reportUrl && (
        <div className="mt-6 border-t border-line-strong pt-5">
          <CaseStudyReportLink href={reportUrl} />
        </div>
      )}
    </section>
  );
}
