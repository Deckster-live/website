"use client";

import { motion } from "framer-motion";
import { CountUp, rupees } from "./CountUp";
import { loopFade, useLoop, type VisualProps } from "./useLoop";

const PERIOD = 9200;

const TOTAL = 200000;

const SPLIT = [
  {
    tier: "Macro",
    handle: "@aanya",
    avatar: "/images/avatar1.jpg",
    amount: 100000,
    reach: "8.4M reach",
    neon: "#22d3ee",
    weight: 3.4,
  },
  {
    tier: "Micro",
    handle: "@ishita",
    avatar: "/images/avatar2.jpg",
    amount: 58000,
    reach: "5.1M reach",
    neon: "#a3e635",
    weight: 2.2,
  },
  {
    tier: "Nano",
    handle: "@kabir",
    avatar: "/images/avatar.png",
    amount: 42000,
    reach: "3.6M reach",
    neon: "#f472b6",
    weight: 1.3,
  },
] as const;

export function BudgetAllocation({ active }: VisualProps) {
  const { cycle, reduced } = useLoop(active, PERIOD);
  const fade = loopFade(PERIOD);
  const on = active;
  const t = (v: number) => (reduced ? 0 : v);

  return (
    // Dark console panel: neon allocations read clearly against it.
    <motion.div
      key={cycle}
      className="absolute inset-0 flex flex-col bg-ink p-2 text-left sm:p-3 md:p-4"
      initial={{ opacity: 0 }}
      animate={on && !reduced ? fade.animate : { opacity: 1 }}
      transition={on && !reduced ? fade.transition : { duration: 0.3 }}
    >
      <div className="flex shrink-0 items-center gap-1.5">
        <span className="text-[6.5px] font-semibold tracking-[0.18em] text-paper/55 uppercase sm:text-[8px]">
          Optimised mix
        </span>
        <span className="ml-auto text-[6.5px] tracking-[0.12em] text-paper/45 uppercase sm:text-[8px]">
          3 tiers · 17.1M reach
        </span>
      </div>

      <div className="flex min-h-0 flex-1 items-center gap-0 pt-1.5">
        {/* One budget */}
        <motion.div
          className="relative flex aspect-square w-[27%] max-w-[108px] shrink-0 flex-col items-center justify-center rounded-full"
          style={{
            backgroundColor: "rgba(163, 230, 53, 0.16)",
            border: "1.5px solid rgba(163, 230, 53, 0.85)",
            boxShadow: "0 0 18px rgba(163, 230, 53, 0.28)",
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={on ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
          transition={
            on
              ? { duration: 0.5, delay: t(0.15), ease: [0.16, 1, 0.3, 1] }
              : { duration: 0.2 }
          }
        >
          <CountUp
            to={TOTAL}
            format={rupees}
            run={on}
            reduced={reduced}
            duration={2.4}
            delay={t(0.5)}
            className="font-display text-[15px] leading-none font-semibold tabular-nums text-[#d9f99d] sm:text-[20px]"
          />
          <span className="mt-1 text-[6px] tracking-[0.16em] text-paper/60 uppercase sm:text-[7.5px]">
            Budget
          </span>
        </motion.div>

        {/* Connectors live in their own column, so they can never cross the
            circle or the allocation boxes. */}
        <div className="h-full w-4 shrink-0 sm:w-7 md:w-10">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="h-full w-full"
            aria-hidden
          >
            {SPLIT.map((s, i) => (
              <motion.g
                key={s.handle}
                style={{ transformOrigin: "0px 50px" }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={
                  on ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
                }
                transition={
                  on
                    ? {
                        duration: 0.6,
                        delay: t(0.55 + i * 0.16),
                        ease: [0.16, 1, 0.3, 1],
                      }
                    : { duration: 0.2 }
                }
              >
                <line
                  x1={0}
                  y1={50}
                  x2={100}
                  y2={17 + i * 33}
                  stroke={s.neon}
                  strokeWidth={s.weight * 2.4}
                  strokeLinecap="round"
                  opacity={0.22}
                  vectorEffect="non-scaling-stroke"
                />
                <line
                  x1={0}
                  y1={50}
                  x2={100}
                  y2={17 + i * 33}
                  stroke={s.neon}
                  strokeWidth={s.weight}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </motion.g>
            ))}
          </svg>
        </div>

        {/* Distributed across the right creator mix */}
        <div className="flex h-full min-w-0 flex-1 flex-col justify-between py-0.5">
          {SPLIT.map((s, i) => (
            <motion.div
              key={s.handle}
              className="flex min-w-0 items-center gap-1.5 rounded-lg px-1.5 py-1 sm:gap-2 sm:px-2 sm:py-1.5"
              style={{
                backgroundColor: "rgba(255,255,255,0.09)",
                border: `1px solid ${s.neon}66`,
                boxShadow: `0 0 12px ${s.neon}22`,
              }}
              initial={{ opacity: 0, x: 8 }}
              animate={on ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
              transition={
                on
                  ? {
                      duration: 0.5,
                      delay: t(0.6 + i * 0.16),
                      ease: [0.16, 1, 0.3, 1],
                    }
                  : { duration: 0.2 }
              }
            >
              <span
                className="h-5 w-5 shrink-0 overflow-hidden rounded-full sm:h-7 sm:w-7"
                style={{ border: `1px solid ${s.neon}` }}
              >
                <img src={s.avatar} alt="" className="h-full w-full object-cover" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate text-[7.5px] font-medium text-paper sm:text-[10px]">
                  {s.handle}
                </span>
                <span className="flex items-center gap-1">
                  <span
                    className="text-[6px] font-semibold tracking-[0.12em] uppercase sm:text-[7.5px]"
                    style={{ color: s.neon }}
                  >
                    {s.tier}
                  </span>
                  <span className="hidden truncate text-[6px] text-paper/45 sm:inline sm:text-[7.5px]">
                    · {s.reach}
                  </span>
                </span>
              </span>

              <CountUp
                to={s.amount}
                format={rupees}
                run={on}
                reduced={reduced}
                duration={2.2}
                delay={t(0.85 + i * 0.16)}
                className="font-display shrink-0 text-[10px] leading-none font-semibold tabular-nums sm:text-[13px]"
                style={{ color: s.neon }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
