"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { HEAD_GAP, SECTION_Y, SectionHead } from "@/components/ui/primitives";
import {
  caseStudies,
  THEMES,
  type CaseStudy,
} from "@/data/mockdata/case-studies";

const ROTATE_MS = 5000;
const LOGO = "/logos/deckster.png";

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
  const theme = THEMES[study.theme];

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
          <img
            src={study.brand_logo}
            alt=""
            className="h-14 w-auto object-contain"
          />
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
          href={`/case-studies/${study.slug}`}
          className={`group mt-5 inline-flex w-fit items-center gap-1.5 text-[14px] font-medium ${theme.fg}`}
        >
          <span className="relative">
            Read the full story
            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-signal opacity-0 transition-all duration-300 ease-out group-hover:w-full group-hover:opacity-100" />
          </span>
        </Link>
      </div>

      {/* Right */}
      <div
        className="grid gap-2.5 p-5 sm:gap-3 sm:p-7 md:p-8 md:self-center"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(84px, 1fr))",
        }}
      >
        {study.reels.slice(0, 2).map((reel, i) => (
          <motion.a
            key={reel.cover + i}
            href={reel.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Watch the ${study.brand} reel`}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 320, damping: 20 }}
            className="group/reel shadow-(--shadow-soft) relative aspect-9/16 min-w-0 overflow-hidden rounded-xl bg-white ring-1 ring-black/5 md:rounded-2xl"
          >
            <img
              src={reel.cover}
              alt=""
              className="h-full w-full object-cover"
            />
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover/reel:bg-black/15">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/90 opacity-0 shadow-sm transition-opacity duration-200 group-hover/reel:opacity-100">
                <svg
                  viewBox="0 0 24 24"
                  className="ml-0.5 h-4 w-4 fill-ink"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </motion.a>
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
        <SectionHead
          align="center"
          className="shrink-0"
          eyebrow="Case Studies"
          title="Real brands. Real numbers. Real reach."
          copy="A few places we've helped grow — see how it played out."
        />

        <div
          className={`${HEAD_GAP} md:flex md:min-h-0 md:flex-1 md:flex-col`}
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
                        className="shadow-(--shadow-soft) absolute inset-0 rounded-xl bg-paper ring-1 ring-black/5 sm:rounded-full"
                      />
                    )}
                    <span className="relative z-10 flex flex-col items-center justify-center gap-1">
                      <span
                        className="block h-7 w-14 overflow-hidden sm:h-9 sm:w-20"
                        style={
                          c.logo_scale
                            ? ({
                                "--logo-scale-mobile": 1 + (c.logo_scale - 1) * 0.4,
                                "--logo-scale-desktop": c.logo_scale,
                              } as React.CSSProperties)
                            : undefined
                        }
                      >
                        <img
                          src={c.brand_logo}
                          alt=""
                          className={`h-full w-full object-contain transition-opacity duration-200 opacity-100 ${
                            c.logo_scale
                              ? "scale-(--logo-scale-mobile) sm:scale-(--logo-scale-desktop)"
                              : ""
                          }`}
                        />
                      </span>
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
