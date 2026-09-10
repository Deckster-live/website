"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { HEAD_GAP, SECTION_Y, SectionHead } from "@/components/ui/primitives";

const formats = [
  "UGC",
  "IGC",
  "Paid Ads",
  "Whitelisting",
  "Campaigns",
  "Podcast Amplification",
] as const;

const steps = [
  "Platform Selection",
  "Category Filtering",
  "Audience Data & Quality Profiling",
  "Content Quality & Filtering",
  "Logistics Filtering",
  "Past Campaign Success Analysis",
  "Budget & Goal Optimisation",
] as const;

const STEP_MS = 1700;

/** 01, 02, … 07 */
const ordinal = (index: number) => String(index + 1).padStart(2, "0");

/* -------------------------------------------------- */
/* Stepper pieces                                     */
/* -------------------------------------------------- */

function Marker({ index, active }: { index: number; active: boolean }) {
  return (
    <span
      className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border bg-paper transition-all duration-500 ${
        active ? "border-signal ring-4 ring-signal/12" : "border-line"
      }`}
    >
      <span
        className={`font-display text-[13px] leading-none font-semibold transition-colors duration-500 ${
          active ? "text-green-dark" : "text-slate"
        }`}
      >
        {ordinal(index)}
      </span>
    </span>
  );
}

/* -------------------------------------------------- */
/* Section                                            */
/* -------------------------------------------------- */

export function SolutionsProcess() {
  const stepper = useRef<HTMLDivElement>(null);
  const inView = useInView(stepper, { amount: 0.3 });
  const reduced = useReducedMotion() ?? false;

  const [cycled, setCycled] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  // one step lights up at a time while the stepper is on screen; hover takes over
  useEffect(() => {
    if (!inView || reduced || hovered !== null) return;

    const id = window.setInterval(
      () => setCycled((step) => (step + 1) % steps.length),
      STEP_MS,
    );

    return () => window.clearInterval(id);
  }, [inView, reduced, hovered]);

  const active = hovered ?? cycled;

  return (
    <section id="solutions">
      {/* ---------- Solutions — the formats ---------- */}
      {/* <div className="bg-mist px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-310">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Solutions</p>

            <h2 className="font-display mt-4 text-[clamp(1.85rem,4.6vw,3.15rem)] leading-[1.06] font-semibold">
              One place, every format
            </h2>
          </div>

          <ul className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-2.5 md:mt-14 md:gap-3">
            {formats.map((format) => (
              <li
                key={format}
                className="cursor-default rounded-full border border-ink/75 px-5 py-2.5 text-[14.5px] font-medium text-ink transition-colors duration-200 hover:bg-ink hover:text-paper md:px-6 md:py-3 md:text-[16px]"
              >
                {format}
              </li>
            ))}
          </ul>
        </div>
      </div> */}

      {/* ---------- How we do this — the stepper ---------- */}
      <div className={`px-5 md:px-8 ${SECTION_Y}`}>
        <div className="mx-auto max-w-310">
          <SectionHead
            align="center"
            eyebrow="How we do this"
            title="Every brief runs through seven filters"
            copy="Platform to budget — each step narrows the field, so what reaches your shortlist is already the right fit."
          />

          <div ref={stepper} className={HEAD_GAP}>
            {/* Desktop — horizontal stepper */}
            <ol className="hidden grid-cols-7 lg:grid">
              {steps.map((step, index) => (
                <li
                  key={step}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  className="relative flex flex-col items-center px-2 text-center"
                >
                  {index < steps.length - 1 && (
                    <span
                      aria-hidden
                      className={`absolute top-6 left-[calc(50%+1.75rem)] right-[calc(1.75rem-50%)] h-px transition-colors duration-500 ${
                        index < active ? "bg-signal" : "bg-line"
                      }`}
                    />
                  )}

                  <Marker index={index} active={index === active} />

                  <p
                    className={`mt-4 text-[12.5px] leading-snug transition-colors duration-500 ${
                      index === active ? "font-medium text-ink" : "text-slate"
                    }`}
                  >
                    {step}
                  </p>
                </li>
              ))}
            </ol>

            {/* Mobile & tablet — vertical stepper */}
            <ol className="mx-auto max-w-lg lg:hidden">
              {steps.map((step, index) => (
                <li key={step} className="relative flex gap-4 pb-8 last:pb-0">
                  {index < steps.length - 1 && (
                    <span
                      aria-hidden
                      className={`absolute top-12 bottom-0 left-6 w-px transition-colors duration-500 ${
                        index < active ? "bg-signal" : "bg-line"
                      }`}
                    />
                  )}

                  <Marker index={index} active={index === active} />

                  <p
                    className={`pt-3.5 text-[14.5px] leading-snug transition-colors duration-500 ${
                      index === active ? "font-medium text-ink" : "text-slate"
                    }`}
                  >
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
