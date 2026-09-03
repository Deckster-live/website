"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Radar,
  ShieldCheck,
  Workflow,
  ActivitySquare,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

const solutions = [
  {
    icon: Radar,
    badge: "Discovery",
    title: "We find the right fit, not just a big following",
    description:
      "Every brief is matched against audience overlap, category performance and past collaboration data — not follower count alone. The result is a shortlist that's actually relevant, ranked by fit and cost efficiency before a single message is sent.",
    bg: "var(--ink)",
    fg: "var(--paper)",
  },
  {
    icon: ShieldCheck,
    badge: "Vetting",
    title: "We verify performance before you commit",
    description:
      "Authenticity signals, sentiment on past content and audience quality are checked upfront, so surprises don't show up mid-campaign. You see the same signals we do, before any budget is locked in.",
    bg: "var(--green-dark)",
    fg: "var(--paper)",
  },
  {
    icon: Workflow,
    badge: "Execution",
    title: "We run the collaboration end to end",
    description:
      "Negotiation, contracts, content planning and approvals move through one accountable point of contact, not a dozen scattered threads. Timelines and revisions stay visible in one place, for every creator, at once.",
    bg: "var(--signal)",
    fg: "var(--ink)",
  },
  {
    icon: ActivitySquare,
    badge: "Transparency",
    title: "We show you everything, while it's live",
    description:
      "Views, engagement and spend pacing update as content goes out, not three weeks later in a spreadsheet. Budget can move to what's working, and reporting is ready the moment the campaign ends.",
    bg: "var(--slate)",
    fg: "var(--paper)",
  },
] as const;

interface CardProps {
  i: number;
  icon: LucideIcon;
  badge: string;
  title: string;
  description: string;
  bg: string;
  fg: string;
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
  bg,
  fg,
  progress,
  range,
  targetScale,
}: CardProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const iconScale = useTransform(scrollYProgress, [0, 1], [1.7, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="sticky top-0 flex h-screen items-center justify-center px-5 md:px-8"
    >
      <motion.div
        style={{
          backgroundColor: bg,
          color: fg,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="relative flex h-140 w-full max-w-6xl origin-top flex-col rounded-[1.75rem] p-6 sm:p-8 md:h-125 md:p-12"
      >
        <div className="flex items-center gap-2.5">
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium"
            style={{
              backgroundColor:
                "color-mix(in oklab, " + fg + " 16%, transparent)",
            }}
          >
            {badge}
          </span>
        </div>

        <h3 className="font-display mt-4 shrink-0 text-2xl leading-[1.12] font-semibold sm:text-[28px]">
          {title}
        </h3>

        <div className="mt-6 flex h-full flex-col gap-6 md:mt-8 md:flex-row md:gap-10">
          <div className="md:w-[40%]">
            <p className="text-[14px] leading-relaxed opacity-80 sm:text-[15px]">
              {description}
            </p>
            <span className="mt-4 inline-flex items-center gap-2">
              <a
                href="#cta"
                className="cursor-pointer text-sm underline underline-offset-4"
              >
                Learn more
              </a>
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </span>
          </div>

          <div
            className="relative flex h-40 w-full items-center justify-center overflow-hidden rounded-xl md:h-full md:w-[60%]"
            style={{
              backgroundColor:
                "color-mix(in oklab, " + fg + " 10%, transparent)",
            }}
          >
            <motion.div style={{ scale: iconScale }}>
              <Icon
                className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24"
                style={{ color: fg }}
                strokeWidth={1}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function SolutionsSection() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section id="solutions" className="bg-mist/60">
      <div className="mx-auto max-w-4xl px-5 pt-20 pb-14 text-center md:px-8 md:pt-28 md:pb-16">
        <p className="eyebrow">How it comes together</p>
        <h2 className="mt-4 text-[clamp(1.85rem,4.6vw,3.15rem)] font-semibold leading-[1.06]">
          One place, from first brief to final report
        </h2>
      </div>

      <div ref={container} className="relative">
        {solutions.map((s, i) => {
          const targetScale = 1 - (solutions.length - i) * 0.05;
          return (
            <Card
              key={s.title}
              i={i}
              icon={s.icon}
              badge={s.badge}
              title={s.title}
              description={s.description}
              bg={s.bg}
              fg={s.fg}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
