"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { SECTION_Y } from "@/components/ui/primitives";

const ROTATE_MS = 5000;
const LOGO = "/logos/wordmark-ink.png";

interface Theme {
  bg: string;
  fg: string;
  muted: string;
  divider: string;
  pillBg: string;
  pillFg: string;
  dot: string;
  glow: string;
}

const THEMES = {
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
} as const satisfies Record<string, Theme>;

interface CaseStudy {
  tab: string;
  brand: string;
  usp_metric: string;
  usp: string;
  metrics: { label: string; value: string }[];
  description: string;
  images: string[];
  theme: Theme;
}

const caseStudies: CaseStudy[] = [
  {
    tab: "Customer Acquisition",
    brand: "Bewakoof",
    usp_metric: "2.4x",
    usp: "more first-time buyers",
    metrics: [
      { label: "Reach", value: "18.6M" },
      { label: "Creators", value: "64" },
      { label: "CAC", value: "-32%" },
    ],
    description:
      "An always-on creator funnel replaced one-off influencer spends, turning cold reach into a repeatable acquisition channel.",
    images: [
      "/images/avatar1.jpg",
      "/images/avatar2.jpg",
      "/images/avatar.png",
    ],
    theme: THEMES.sand,
  },
  {
    tab: "Brand Building",
    brand: "Chumbak",
    usp_metric: "3.1x",
    usp: "lift in brand search volume",
    metrics: [
      { label: "Reach", value: "22.3M" },
      { label: "Creators", value: "48" },
      { label: "Engagement", value: "6.8%" },
    ],
    description:
      "Recurring creator collaborations built consistent brand recall across festive and everyday campaigns alike.",
    images: [
      "/images/avatar2.jpg",
      "/images/avatar.png",
      "/images/avatar1.jpg",
    ],
    theme: THEMES.mint,
  },
  {
    tab: "Product Launch",
    brand: "Mokobara",
    usp_metric: "500K+",

    usp: "views in launch week",
    metrics: [
      { label: "Reach", value: "12.1M" },
      { label: "Creators", value: "36" },
      { label: "Sell-through", value: "91%" },
    ],
    description:
      "A coordinated seeding wave timed to the drop turned a single SKU launch into a category moment.",
    images: [
      "/images/avatar.png",
      "/images/avatar1.jpg",
      "/images/avatar2.jpg",
    ],
    theme: THEMES.peach,
  },
  {
    tab: "Paid Ads",
    brand: "Snitch",
    usp_metric: "41%",

    usp: "lower cost per click",
    metrics: [
      { label: "Reach", value: "30.4M" },
      { label: "Creators", value: "72" },
      { label: "ROAS", value: "4.6x" },
    ],
    description:
      "Creator-shot content fed straight into paid, cutting fatigue and lifting performance across every ad set.",
    images: [
      "/images/avatar1.jpg",
      "/images/avatar.png",
      "/images/avatar2.jpg",
    ],
    theme: THEMES.forest,
  },
  {
    tab: "Store Launch",
    brand: "Wildcraft",
    usp_metric: "3.2x",
    usp: "more store visits",
    metrics: [
      { label: "Reach", value: "9.8M" },
      { label: "Creators", value: "28" },
      { label: "Footfall", value: "+180%" },
    ],
    description:
      "Hyperlocal creators turned a store opening into a neighbourhood event, not just an announcement.",
    images: [
      "/images/avatar2.jpg",
      "/images/avatar1.jpg",
      "/images/avatar.png",
    ],
    theme: THEMES.ink,
  },
];

const pillSpring: Transition = { type: "spring", stiffness: 380, damping: 30 };
const cardSpring: Transition = {
  type: "spring",
  stiffness: 280,
  damping: 32,
  mass: 0.9,
};

const cardVariants = {
  enter: (direction: number) => ({
    x: direction >= 0 ? 56 : -56,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction >= 0 ? -56 : 56,
    opacity: 0,
  }),
};

function CardPanel({ study }: { study: CaseStudy }) {
  const { theme } = study;

  return (
    <div
      className="relative grid h-full grid-cols-1 overflow-hidden rounded-2xl md:grid-cols-[9fr_11fr] md:rounded-3xl"
      style={{ background: theme.bg }}
    >
      {/* <div
        aria-hidden
        className="animate-float-slow pointer-events-none absolute -top-12 -right-12 h-56 w-56 rounded-full blur-3xl"
        style={{ background: theme.glow, opacity: 0.25 }}
      /> */}

      {/* Left */}
      <div className="relative flex flex-col justify-around p-5 sm:p-7 md:p-8 md:py-20">
        <div className="flex flex-col items-start gap-4">
          <img src={LOGO} alt="" className="h-14 w-auto object-contain" />
          <p
            className={`font-display text-xl font-semibold tracking-[-0.01em] ${theme.fg}`}
          >
            {study.brand}
          </p>
        </div>
        <div className=" flex items-center gap-2.5">
          <span
            className={`-ml-8 inline-flex w-fit items-center rounded-r-full px-6 py-4 ${theme.pillBg} ${theme.pillFg}`}
          >
            <span className="font-display text-[30px] font-bold leading-none tracking-tight">
              {study.usp_metric}
            </span>

            <span className="mx-1 text-[15px] opacity-0">.</span>

            <span className="text-[15px] font-medium leading-none">
              {study.usp}
            </span>
          </span>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3">
          {study.metrics.map((m, i) => (
            <div
              key={m.label}
              className={`min-w-0 ${i > 0 ? `border-l pl-3 ${theme.divider}` : ""}`}
            >
              <p
                className={`font-display text-[19px] leading-none font-semibold sm:text-[22px] ${theme.fg}`}
              >
                {m.value}
              </p>
              <p
                className={`mt-1.5 font-sans text-[0.6875rem] tracking-[0.18em] uppercase ${theme.muted}`}
              >
                {m.label}
              </p>
            </div>
          ))}
        </div>

        <p
          className={`mt-4 hidden text-[14px] leading-relaxed md:block ${theme.muted}`}
        >
          {study.description}
        </p>

        <Link
          href="/#cta"
          className={`group mt-5 inline-flex w-fit items-center gap-1.5 text-[14px] font-medium ${theme.fg}`}
        >
          <span className="relative">
            Read the full story
            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-signal opacity-0 transition-all duration-300 ease-out group-hover:w-full group-hover:opacity-100" />
          </span>
        </Link>
      </div>

      {/* Right */}
      <div className="relative grid grid-cols-3 gap-2.5 p-5 sm:gap-3 sm:p-7 md:grid-cols-3 md:p-8 md:self-center">
        {study.images.map((src, i) => (
          <motion.div
            key={src + i}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 320, damping: 20 }}
            className={`shadow-(--shadow-soft) aspect-square overflow-hidden rounded-xl bg-white ring-1 ring-black/5 md:rounded-2xl ${
              i === 2 ? "col-span-2 md:col-span-1" : ""
            } ${i === 1 ? "md:mt-8" : ""}`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function CaseStudies() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [runId, setRunId] = useState(0);

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const remainingRef = useRef(ROTATE_MS);
  const startedAtRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // A tab change (auto-advance or manual click) always gives a fresh 5s window.
  useEffect(() => {
    remainingRef.current = ROTATE_MS;
    setRunId((r) => r + 1);
  }, [active]);

  // Hover/focus pause preserves the remaining time instead of resetting it.
  useEffect(() => {
    if (reducedMotion) return;

    if (paused) {
      if (timeoutRef.current) {
        remainingRef.current = Math.max(
          remainingRef.current - (Date.now() - startedAtRef.current),
          0,
        );
        clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
      }
      return;
    }

    startedAtRef.current = Date.now();
    timeoutRef.current = setTimeout(() => {
      setDirection(1);
      setActive((i) => (i + 1) % caseStudies.length);
    }, remainingRef.current);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [active, paused, reducedMotion]);

  const study = caseStudies[active];
  const tabCount = caseStudies.length;

  const handleFocusOut = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setPaused(false);
    }
  };

  const goTo = (i: number) => {
    if (i === active) return;
    setDirection(i > active ? 1 : -1);
    setActive(i);
  };

  return (
    <section
      id="case-studies"
      className={`scroll-mt-24 px-5 md:flex md:flex-col md:px-8 ${SECTION_Y}`}
    >
      <div className="mx-auto w-full max-w-310 md:flex md:min-h-0 md:flex-1 md:flex-col">
        <div className="mx-auto max-w-2xl shrink-0 text-center">
          <p className="eyebrow">Case Studies</p>
          <h2 className="mt-3 text-[clamp(1.7rem,4vw,2.75rem)] font-semibold leading-[1.06]">
            Real brands. Real numbers. Real reach.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-slate md:text-base">
            A few places we&apos;ve helped grow — see how it played out.
          </p>
        </div>

        <div
          className="mt-6 md:mt-6 md:flex md:min-h-0 md:flex-1 md:flex-col"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={handleFocusOut}
        >
          {/* Tabs */}
          <div className="shrink-0 rounded-2xl border border-line bg-mist/60 p-1.5 sm:rounded-full">
            <div className="flex items-stretch gap-1">
              {caseStudies.map((c, i) => {
                const isActive = i === active;
                return (
                  <motion.button
                    key={c.tab}
                    type="button"
                    onClick={() => goTo(i)}
                    whileTap={{ scale: 0.95 }}
                    className="relative min-w-0 flex-1 rounded-xl px-1.5 py-2 sm:rounded-full sm:px-2.5 sm:py-2.5"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-tab-pill"
                        transition={
                          reducedMotion ? { duration: 0.15 } : pillSpring
                        }
                        className="absolute inset-0 rounded-xl bg-green-dark sm:rounded-full"
                      />
                    )}
                    <span className="relative z-10 flex flex-col items-center justify-center gap-1">
                      <img
                        src={LOGO}
                        alt=""
                        className={`h-8 w-auto object-contain transition-[filter] duration-200 sm:h-9 ${
                          isActive ? "brightness-0 invert" : ""
                        }`}
                      />
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Card */}
          <div className="shadow-(--shadow-float) relative mt-6 min-h-100 rounded-2xl md:mt-6 md:min-h-150 md:flex-1 md:rounded-3xl">
            {/* Invisible sizer keeps the container's height matched to the
                active study's content on mobile, where the card follows
                normal document flow instead of filling the viewport. */}
            <div aria-hidden className="invisible md:hidden">
              <CardPanel study={study} />
            </div>

            <div className="absolute inset-0 overflow-hidden rounded-2xl md:rounded-3xl">
              <AnimatePresence
                initial={false}
                custom={direction}
                mode="popLayout"
              >
                <motion.div
                  key={active}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={reducedMotion ? { duration: 0.15 } : cardSpring}
                  className="absolute inset-0"
                >
                  <CardPanel study={study} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
