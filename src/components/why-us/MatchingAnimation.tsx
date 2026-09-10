"use client";

import { motion } from "framer-motion";
import { loopFade, useLoop, type VisualProps } from "./useLoop";

const PERIOD = 13200;

const FILTERS = [
  { label: "Category", value: "Beauty", at: 1.0 },
  { label: "Niche", value: "Skincare", at: 1.9 },
  { label: "Audience", value: "Gen Z · Metro", at: 2.8 },
  { label: "Cost efficiency", value: "High", at: 3.7 },
] as const;

/** Six candidates narrow to the three that actually fit the brief. */
const RESULTS = [
  {
    handle: "@aanya",
    avatar: "/images/avatar1.webp",
    keep: true,
    fit: 94,
    sentiment: [72, 20, 8],
    audience: 88,
    cost: "₹₹",
  },
  { handle: "@rohit", avatar: "/images/avatar.webp", keep: false, fit: 41 },
  {
    handle: "@mehak",
    avatar: "/images/avatar2.webp",
    keep: true,
    fit: 91,
    sentiment: [64, 26, 10],
    audience: 81,
    cost: "₹",
  },
  { handle: "@dev", avatar: "/images/avatar.webp", keep: false, fit: 38 },
  {
    handle: "@ishita",
    avatar: "/images/avatar2.webp",
    keep: true,
    fit: 88,
    sentiment: [58, 28, 14],
    audience: 76,
    cost: "₹₹",
  },
  { handle: "@kabir", avatar: "/images/avatar1.webp", keep: false, fit: 29 },
] as const;

const FILTER_DONE = 4.5;
const SORTED_AT = 5.3;
const ANALYTICS_AT = 5.9;

/** Sentiment splits into positive / neutral / negative. */
const SENTIMENT_TONES = ["#22c55e", "#eab308", "#ef4444"] as const;

const survivorSlot = (() => {
  let slot = 0;
  return RESULTS.map((r) => (r.keep ? slot++ : -1));
})();

export function MatchingAnimation({ active }: VisualProps) {
  const { cycle, reduced } = useLoop(active, PERIOD);
  const fade = loopFade(PERIOD);
  const on = active;
  const t = (v: number) => (reduced ? 0 : v);

  return (
    // Full-bleed app screen: white surface filling the whole visual well.
    <motion.div
      key={cycle}
      className="absolute inset-0 flex flex-col bg-white text-left text-ink"
      initial={{ opacity: 0 }}
      animate={on && !reduced ? fade.animate : { opacity: 1 }}
      transition={on && !reduced ? fade.transition : { duration: 0.3 }}
    >
      {/* App bar */}
      <div className="flex shrink-0 items-center gap-2 border-b border-line px-2.5 py-1.5 sm:px-4 sm:py-2.5">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
        <p className="text-[8px] font-semibold tracking-[0.16em] uppercase sm:text-[10px]">
          Creator discovery
        </p>
        <motion.p
          className="ml-auto shrink-0 rounded-full bg-mist px-1.5 py-0.5 text-[7.5px] font-medium tabular-nums sm:text-[9px]"
          initial={{ opacity: 0 }}
          animate={on ? { opacity: 1 } : { opacity: 0 }}
          transition={on ? { duration: 0.3, delay: t(0.2) } : { duration: 0.2 }}
        >
          <motion.span
            initial={{ opacity: 1 }}
            animate={on ? { opacity: [1, 1, 0] } : { opacity: 1 }}
            transition={
              on
                ? { duration: 0.6, delay: t(FILTER_DONE), times: [0, 0.4, 1] }
                : { duration: 0.2 }
            }
          >
            6 matches
          </motion.span>
          <motion.span
            className="absolute -translate-x-full font-semibold text-green-dark text-nowrap"
            initial={{ opacity: 0 }}
            animate={on ? { opacity: [0, 0, 1] } : { opacity: 0 }}
            transition={
              on
                ? { duration: 0.6, delay: t(FILTER_DONE), times: [0, 0.5, 1] }
                : { duration: 0.2 }
            }
          >
            3 matches
          </motion.span>
        </motion.p>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Filter rail */}
        <div className="flex w-[34%] shrink-0 flex-col justify-evenly border-r border-line px-2 py-1.5 sm:px-3 sm:py-2.5">
          {FILTERS.map((f) => (
            <div key={f.label} className="min-w-0">
              <p className="truncate text-[6.5px] tracking-[0.12em] text-slate uppercase sm:text-[8px]">
                {f.label}
              </p>
              <div className="mt-0.5 flex items-center justify-between gap-1 rounded-md border border-line bg-mist/50 px-1.5 py0.75 sm:mt-1 sm:py-1">
                <motion.span
                  className="truncate text-[7.5px] font-medium sm:text-[9.5px]"
                  initial={{ opacity: 0, y: 3 }}
                  animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 3 }}
                  transition={
                    on
                      ? { duration: 0.35, delay: t(f.at), ease: "easeOut" }
                      : { duration: 0.2 }
                  }
                >
                  {f.value}
                </motion.span>
                <motion.span
                  className="h-1 w-1 shrink-0 rounded-full bg-signal sm:h-1.5 sm:w-1.5"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    on ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
                  }
                  transition={
                    on
                      ? { duration: 0.3, delay: t(f.at + 0.1) }
                      : { duration: 0.2 }
                  }
                />
              </div>
            </div>
          ))}
        </div>

        {/* Results — rows share the height via flex-grow, so they can never
            overlap or overflow at any breakpoint. */}
        <div className="flex min-w-0 flex-1 flex-col px-2 py-1 sm:px-3 sm:py-1.5">
          {RESULTS.map((r, i) => {
            const slot = survivorSlot[i];

            return (
              <motion.div
                key={r.handle}
                className="flex min-h-0 basis-0 flex-col justify-center overflow-hidden border-b border-line/60 last:border-0"
                initial={{ opacity: 0, flexGrow: 1 }}
                animate={
                  on
                    ? r.keep
                      ? { opacity: 1, flexGrow: 2 }
                      : { opacity: [0, 1, 1, 0], flexGrow: [1, 1, 1, 0.001] }
                    : { opacity: 0, flexGrow: 1 }
                }
                transition={
                  on
                    ? r.keep
                      ? {
                          opacity: { duration: 0.4, delay: t(0.25 + i * 0.08) },
                          flexGrow: {
                            duration: 0.7,
                            delay: t(FILTER_DONE + 0.3),
                            ease: [0.16, 1, 0.3, 1],
                          },
                        }
                      : {
                          duration: t(FILTER_DONE + 0.9) || 0.2,
                          delay: t(0.25 + i * 0.08),
                          times: [0, 0.1, 0.82, 1],
                          ease: "easeInOut",
                        }
                    : { duration: 0.2 }
                }
              >
                <div className="flex items-center gap-1.5">
                  <span className="h-3.5 w-3.5 shrink-0 overflow-hidden rounded-full sm:h-4 sm:w-4">
                    <img
                      src={r.avatar}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <span className="truncate text-[8px] font-medium sm:text-[10px]">
                    {r.handle}
                  </span>
                  <span className="ml-auto shrink-0 text-[7px] tracking-widest text-slate uppercase sm:text-[8px]">
                    Fit
                  </span>
                  <motion.span
                    className="shrink-0 text-[8px] font-semibold tabular-nums sm:text-[10px]"
                    style={{
                      color: r.keep ? "var(--green-dark)" : "var(--slate)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={on ? { opacity: 1 } : { opacity: 0 }}
                    transition={
                      on
                        ? { duration: 0.3, delay: t(0.5 + i * 0.08) }
                        : { duration: 0.2 }
                    }
                  >
                    {r.fit}%
                  </motion.span>
                </div>

                {r.keep && (
                  <motion.div
                    className="mt-1 flex flex-col gap0.75"
                    initial={{ opacity: 0 }}
                    animate={on ? { opacity: 1 } : { opacity: 0 }}
                    transition={
                      on
                        ? {
                            duration: 0.4,
                            delay: t(ANALYTICS_AT + slot * 0.18),
                          }
                        : { duration: 0.2 }
                    }
                  >
                    {/* Sentiment: positive / neutral / negative */}
                    <div className="flex items-center gap-1.5">
                      <span className="w-9 shrink-0 text-[6px] tracking-widest text-slate uppercase sm:w-12 sm:text-[7px]">
                        Sentiment
                      </span>
                      <span className="flex h-0.75 w-full overflow-hidden rounded-full bg-mist">
                        {(r.sentiment ?? []).map((seg, si) => (
                          <motion.span
                            key={si}
                            style={{ backgroundColor: SENTIMENT_TONES[si] }}
                            initial={{ width: 0 }}
                            animate={on ? { width: `${seg}%` } : { width: 0 }}
                            transition={
                              on
                                ? {
                                    duration: 0.6,
                                    delay: t(
                                      ANALYTICS_AT +
                                        0.2 +
                                        slot * 0.18 +
                                        si * 0.16,
                                    ),
                                    ease: [0.16, 1, 0.3, 1],
                                  }
                                : { duration: 0.2 }
                            }
                          />
                        ))}
                      </span>
                    </div>

                    {/* Audience match + cost */}
                    <div className="hidden items-center gap-1.5 sm:flex">
                      <span className="w-9 shrink-0 text-[6px] tracking-widest text-slate uppercase sm:w-12 sm:text-[7px]">
                        Audience
                      </span>
                      <span className="relative h-0.75 w-full overflow-hidden rounded-full bg-mist">
                        <motion.span
                          className="absolute inset-y-0 left-0 rounded-full bg-sky-500"
                          initial={{ width: 0 }}
                          animate={
                            on ? { width: `${r.audience ?? 0}%` } : { width: 0 }
                          }
                          transition={
                            on
                              ? {
                                  duration: 0.65,
                                  delay: t(ANALYTICS_AT + 0.7 + slot * 0.18),
                                  ease: [0.16, 1, 0.3, 1],
                                }
                              : { duration: 0.2 }
                          }
                        />
                      </span>
                      <span className="shrink-0 text-[7px] font-semibold text-green-dark sm:text-[8.5px]">
                        {r.cost}
                      </span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Status bar */}
      <motion.div
        className="flex shrink-0 items-center gap-1.5 border-t border-line px-2.5 py-1 sm:px-4 sm:py-1.5"
        initial={{ opacity: 0 }}
        animate={on ? { opacity: 1 } : { opacity: 0 }}
        transition={
          on ? { duration: 0.4, delay: t(SORTED_AT) } : { duration: 0.2 }
        }
      >
        <span className="text-[6.5px] tracking-[0.14em] text-slate uppercase sm:text-[8px]">
          Sorted by
        </span>
        <span className="text-[6.5px] font-semibold tracking-[0.14em] text-green-dark uppercase sm:text-[8px]">
          Fit · Sentiment · Cost efficiency
        </span>
      </motion.div>
    </motion.div>
  );
}
