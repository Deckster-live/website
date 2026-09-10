import { Compass, Eye } from "lucide-react";
import { HEAD_GAP, Section, SectionHead } from "@/components/ui/primitives";

/*
 * Two rounded rectangles, both turned -45deg and pushed to opposite sides of
 * the stage's anti-diagonal, so their facing edges run parallel and leave a
 * single 45deg seam through the middle — a rhombus cut in half.
 *
 * The stage is locked to 16/10, which is what the surface numbers below are
 * derived from (W = stage width, H = 0.625W):
 *   thickness  0.65W  -> h-[104%]  (covers 0.5744W, the centre-to-corner reach)
 *   length     1.06W  -> w-[106%]  (stops just short, so the seam ends round off)
 *   offset     0.2298W + half the 12px seam gap, split over x and y
 * Change the aspect and these have to be re-derived.
 */
const SURFACE =
  "pointer-events-none absolute top-1/2 left-1/2 hidden h-[104%] w-[106%] -rotate-45 rounded-[3rem] lg:block";

interface Panel {
  icon: typeof Eye;
  index: string;
  label: string;
  title: string;
  description: string;
  kicker: string;
  /** Painted fill — the surface on desktop, the stacked card on mobile. */
  fill: string;
  fg: string;
  accent: string;
  /** Which side of the seam the surface is pushed to. */
  offset: string;
  /** Copy block: stacked card below lg, corner-anchored on the stage above it. */
  copy: string;
  /** Watermark, parked in the corner opposite the copy. */
  mark: string;
  /** Watermark ink — the accent is too quiet against the deep green. */
  markColor: string;
  markOpacity: string;
}

const panels: readonly Panel[] = [
  {
    icon: Eye,
    index: "01",
    label: "Our Vision",
    title: "A world matched by data, not guesswork",
    description:
      "A world where every brand — regardless of size or budget — can find and work with the right voices, backed by data instead of guesswork.",
    kicker: "Where we're headed",
    fill: "linear-gradient(to top, var(--signal), var(--green-darkest) 62%, var(--ink))",
    fg: "var(--paper)",
    accent: "var(--signal)",
    offset: "translate-x-[calc(-71.68%-4px)] translate-y-[calc(-85.35%-4px)]",
    copy: "-rotate-[1.25deg] lg:top-[8%] lg:left-[6%] lg:rotate-0",
    mark: "bottom-[10%] left-[7%]",
    markColor: "var(--paper)",
    markOpacity: "opacity-20",
  },
  {
    icon: Compass,
    index: "02",
    label: "Our Mission",
    title: "Influencer-led growth, made dependable",
    description:
      "To make influencer-led growth simple, measurable and accessible — by combining technology, human expertise and a wide creator network into one dependable place for brands to grow through.",
    kicker: "What we do every day",
    fill: "linear-gradient(to bottom, color-mix(in oklab, var(--signal) 14%, var(--paper)), var(--mist))",
    fg: "var(--ink)",
    accent: "var(--green-dark)",
    offset: "translate-x-[calc(-28.32%+4px)] translate-y-[calc(-14.65%+4px)]",
    copy: "-mt-4 rotate-[1.25deg] pt-2 lg:right-[5%] lg:bottom-[7%] lg:mt-0 lg:rotate-0 lg:pt-0",
    mark: "top-[10%] right-[7%]",
    markColor: "var(--green-dark)",
    markOpacity: "opacity-15",
  },
] as const;

export function AboutVisionMission() {
  return (
    <Section id="vision-mission" className="pt-10 md:pt-14 lg:pt-16">
      <SectionHead
        align="center"
        eyebrow="What drives us"
        title="Where we're headed, and the work that gets us there"
        copy="One is the world we're building toward. The other is what we do about it, campaign after campaign."
      />

      <div className={`${HEAD_GAP} lg:mt-20`}>
        <div className="relative flex flex-col lg:block rounded-4xl lg:aspect-27/13 overflow-hidden lg:bg-paper">
          {panels.map((panel) => (
            <span
              key={`${panel.label}-surface`}
              aria-hidden
              className={`${SURFACE} ${panel.offset}`}
              style={{ background: panel.fill }}
            />
          ))}

          {panels.map((panel) => (
            <panel.icon
              key={`${panel.label}-mark`}
              aria-hidden
              strokeWidth={1}
              className={`pointer-events-none absolute z-10 hidden h-36 w-36 lg:block xl:h-44 xl:w-44 ${panel.markOpacity} ${panel.mark}`}
              style={{ color: panel.markColor }}
            />
          ))}

          {panels.map((panel) => (
            <article
              key={panel.label}
              className={`relative z-20 rounded-[1.75rem] bg-(image:--fill) p-8 shadow-(--shadow-float) ring-8 ring-paper sm:rounded-[2.25rem] sm:p-10 lg:absolute lg:w-[38%] lg:bg-none lg:p-0 lg:shadow-none lg:ring-0 xl:w-[36%] ${panel.copy}`}
              style={
                {
                  "--fill": panel.fill,
                  color: panel.fg,
                } as React.CSSProperties
              }
            >
              <panel.icon
                aria-hidden
                strokeWidth={1}
                className={`pointer-events-none absolute -right-6 -bottom-7 h-28 w-28 sm:h-36 sm:w-36 lg:hidden ${panel.markOpacity}`}
                style={{ color: panel.markColor }}
              />

              <p className="eyebrow relative" style={{ color: panel.accent }}>
                {panel.index} — {panel.label}
              </p>

              <h3 className="font-display relative mt-3 text-[clamp(1.45rem,2.6vw,2.3rem)] leading-[1.12] font-semibold">
                {panel.title}
              </h3>

              <p
                className="relative mt-4 text-[14.5px] leading-relaxed md:text-[15px]"
                style={{
                  color: `color-mix(in oklab, ${panel.fg} 74%, transparent)`,
                }}
              >
                {panel.description}
              </p>

              <div className="relative mt-7 flex items-center gap-3">
                <span
                  aria-hidden
                  className="h-px w-10 shrink-0"
                  style={{ backgroundColor: panel.accent }}
                />
                <span
                  className="text-[12px] font-medium tracking-[0.04em]"
                  style={{
                    color: `color-mix(in oklab, ${panel.fg} 58%, transparent)`,
                  }}
                >
                  {panel.kicker}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
