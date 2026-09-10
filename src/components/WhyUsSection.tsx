"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Activity,
  BadgeCheck,
  IndianRupee,
  LayoutGrid,
  Radar,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { SectionHead } from "@/components/ui/primitives";
import { BudgetAllocation } from "./why-us/BudgetAllocation";
import { CreatorNetwork } from "./why-us/CreatorNetwork";
import { DeliveryChecklist } from "./why-us/DeliveryChecklist";
import { LiveTracking } from "./why-us/LiveTracking";
import { MatchingAnimation } from "./why-us/MatchingAnimation";
import { NicheCoverage } from "./why-us/NicheCoverage";
import { TrackRecord } from "./why-us/TrackRecord";
import type { VisualProps } from "./why-us/useLoop";

interface Stat {
  value: string;
  label: string;
}

interface Reason {
  icon: LucideIcon;
  badge: string;
  title: string;
  description: string;
  stats?: readonly Stat[];
  bg: string;
  fg: string;
  accent: string;
  Visual: (props: VisualProps) => React.ReactElement;
}

const reasons: readonly Reason[] = [
  {
    icon: Users,
    badge: "Network",
    title: "Massive creator network",
    description:
      "Nano voices for authentic reach, macro names for scale — our roster spans every category, price tier and city, so the right creator is never far away.",
    stats: [
      { value: "60K+", label: "Creators" },
      { value: "15+", label: "Languages" },
      { value: "10+", label: "Categories" },
    ],
    bg: "var(--green-darkest)",
    fg: "var(--paper)",
    accent: "var(--signal)",
    Visual: CreatorNetwork,
  },
  {
    icon: Radar,
    badge: "Matching",
    title: "Relevant matching, not random matching",
    description:
      "Our matching goes beyond followers — category, persona, niche, demographics and cost efficiency, all factored in before a name reaches your shortlist.",
    bg: "var(--signal)",
    fg: "var(--ink)",
    accent: "var(--ink)",
    Visual: MatchingAnimation,
  },
  {
    icon: Activity,
    badge: "Live data",
    title: "Tech-enabled decisions & live tracking",
    description:
      "Numbers pulled straight from the social APIs — accurate, real, and detail no one else puts in front of you. Watch the campaign perform as it happens.",
    bg: "var(--slate)",
    fg: "var(--paper)",
    accent: "var(--signal)",
    Visual: LiveTracking,
  },
  {
    icon: IndianRupee,
    badge: "Budget",
    title: "Budget that works harder",
    description:
      "The right mix of nano, micro and macro creators, so the budget you have buys the widest reach it possibly can. Spend keeps shifting toward whatever is actually converting, so nothing sits idle in a plan that stopped working.",
    bg: "var(--green-dark)",
    fg: "var(--paper)",
    accent: "var(--signal)",
    Visual: BudgetAllocation,
  },
  {
    icon: Workflow,
    badge: "Delivery",
    title: "End-to-end delivery",
    description:
      "Planning, negotiation, content moderation, payments and reporting — every stage runs through one accountable team. You get a single point of contact from the first brief to the final report, not five different people to chase down.",
    bg: "var(--ink)",
    fg: "var(--paper)",
    accent: "var(--signal)",
    Visual: DeliveryChecklist,
  },
  {
    icon: BadgeCheck,
    badge: "Track record",
    title: "A track record that speaks",
    description:
      "50+ brands trusted us to deliver — from fast-growing D2C labels to household names. Most don't just come back once; repeat campaigns now make up the majority of what we run.",
    bg: "var(--green-peacock)",
    fg: "var(--paper)",
    accent: "var(--ink)",
    Visual: TrackRecord,
  },
  {
    icon: LayoutGrid,
    badge: "Coverage",
    title: "Every niche, covered. Everywhere",
    description:
      "Name a niche. Name a market. We're already there. Beauty, fashion, gaming, fitness, finance, food, travel, tech — our creators run deep in every category. We've worked with brands across India, Australia, the UAE, Canada, the USA, Nigeria, and beyond.",
    bg: "var(--slate)",
    fg: "var(--paper)",
    accent: "var(--signal)",
    Visual: NicheCoverage,
  },
];

interface CardProps {
  i: number;
  icon: LucideIcon;
  badge: string;
  title: string;
  description: string;
  stats?: readonly Stat[];
  bg: string;
  fg: string;
  accent: string;
  Visual: (props: VisualProps) => React.ReactElement;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

function Card({
  i,
  icon: Icon,
  badge,
  title,
  description,
  stats,
  bg,
  fg,
  accent,
  Visual,
  progress,
  range,
  targetScale,
}: CardProps) {
  const container = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);

  // Each card's visual only animates while that card is actually on screen.
  const inView = useInView(card, { amount: 0.35 });
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="sticky top-0 flex h-screen items-center justify-center px-5 md:px-8"
    >
      <motion.div
        ref={card}
        style={{
          backgroundColor: bg,
          color: fg,
          scale,
          top: `calc(-5vh + ${i * 18}px)`,
        }}
        className="relative flex w-full max-w-6xl origin-top flex-col rounded-[1.75rem] p-6 sm:min-h-145 sm:p-8 md:h-125 md:min-h-0 md:p-12"
      >
        <div className="flex items-center gap-2.5">
          <span
            className="text-md inline-flex items-center gap-2 rounded-full px-3 py-1 font-medium"
            style={{
              backgroundColor: `color-mix(in oklab, ${fg} 16%, transparent)`,
            }}
          >
            <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
            {badge}
          </span>
        </div>

        <div className="mt-6 flex h-full min-h-0 flex-col gap-6 md:mt-8 md:flex-row md:gap-12">
          <div className="flex min-h-0 flex-col md:w-[40%] md:overflow-y-auto">
            <h3 className="font-display shrink-0 text-2xl leading-tight font-semibold sm:text-3xl md:text-2xl lg:text-3xl">
              {title}
            </h3>

            {stats && (
              <div className="mt-4 flex shrink-0 flex-wrap gap-x-5 gap-y-2 sm:mt-5 md:gap-x-4 lg:gap-x-6">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p
                      className="font-display text-2xl leading-none font-bold sm:text-3xl md:text-xl lg:text-3xl"
                      style={{ color: accent }}
                    >
                      {s.value}
                    </p>
                    <p className="mt-1 text-[10px] tracking-[0.12em] uppercase opacity-60 sm:text-[11px]">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <p className="mt-4 text-[13.5px] leading-relaxed opacity-80 sm:mt-5 sm:text-[15px] md:text-[13.5px] lg:text-base">
              {description}
            </p>
          </div>

          <div
            className="relative h-52 w-full shrink-0 overflow-hidden rounded-xl sm:h-60 md:h-full md:w-[60%] md:shrink"
            style={{
              backgroundColor: `color-mix(in oklab, ${fg} 10%, transparent)`,
            }}
          >
            <Visual active={inView} fg={fg} accent={accent} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function WhyUsSection() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section id="why-us" className="bg-mist/60">
      <div className="px-5 pt-20 pb-12 md:px-8 md:pt-28 md:pb-16 lg:pt-32">
        <SectionHead
          align="center"
          eyebrow="Why Us"
          title="Why brands pick Deckster"
          copy="One place for everything creator marketing. From finding the right creators to tracking performance and delivering the final report, Deckster brings the entire campaign together."
        />
      </div>

      <div ref={container} className="relative">
        {reasons.map((r, i) => (
          <Card
            key={r.title}
            i={i}
            icon={r.icon}
            badge={r.badge}
            title={r.title}
            description={r.description}
            stats={r.stats}
            bg={r.bg}
            fg={r.fg}
            accent={r.accent}
            Visual={r.Visual}
            progress={scrollYProgress}
            range={[i * (1 / reasons.length), 1]}
            targetScale={1 - (reasons.length - i) * 0.03}
          />
        ))}
      </div>
    </section>
  );
}
