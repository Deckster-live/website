"use client";

import { motion } from "framer-motion";
import { loopFade, tint, useLoop, type VisualProps } from "./useLoop";

const PERIOD = 8600;

const STAGES = [
  { name: "Planning", detail: "Brief, creator mix & timelines" },
  { name: "Execution", detail: "Outreach, negotiation & contracts" },
  { name: "Content / Shipping", detail: "Moderation, approvals & dispatch" },
  { name: "Payment", detail: "Creator payouts & invoicing" },
  { name: "Reporting", detail: "Campaign, creator & content level" },
] as const;

const FIRST_TICK = 0.9;
const STEP = 0.62;

export function DeliveryChecklist({ active, fg, accent }: VisualProps) {
  const { cycle, reduced } = useLoop(active, PERIOD);
  const fade = loopFade(PERIOD);
  const on = active;
  const t = (v: number) => (reduced ? 0 : v);

  return (
    <motion.div
      key={cycle}
      className="absolute inset-0 flex flex-col p-3 text-left sm:p-4 md:p-5"
      initial={{ opacity: 0 }}
      animate={on && !reduced ? fade.animate : { opacity: 1 }}
      transition={on && !reduced ? fade.transition : { duration: 0.3 }}
    >
      <div className="flex shrink-0 items-center gap-1.5">
        <span
          className="text-[6.5px] font-semibold tracking-[0.18em] uppercase sm:text-[8px]"
          style={{ color: tint(fg, 55) }}
        >
          Campaign lifecycle
        </span>
        <motion.span
          className="ml-auto text-[6.5px] font-semibold tracking-[0.14em] uppercase sm:text-[8px]"
          style={{ color: accent }}
          initial={{ opacity: 0 }}
          animate={on ? { opacity: 1 } : { opacity: 0 }}
          transition={
            on
              ? {
                  duration: 0.4,
                  delay: t(FIRST_TICK + STAGES.length * STEP),
                }
              : { duration: 0.2 }
          }
        >
          All 5 complete
        </motion.span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-evenly">
        {STAGES.map((stage, i) => {
          const tick = t(FIRST_TICK + i * STEP);

          return (
            <motion.div
              key={stage.name}
              className="flex items-center gap-2 sm:gap-3"
              initial={{ opacity: 0, y: 4 }}
              animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
              transition={
                on
                  ? { duration: 0.4, delay: t(0.15 + i * 0.08) }
                  : { duration: 0.2 }
              }
            >
              <span className="relative grid h-4 w-4 shrink-0 place-items-center sm:h-5 sm:w-5">
                {/* Pulse as the stage completes */}
                <motion.span
                  className="absolute inset-0 rounded-[5px]"
                  style={{ backgroundColor: accent }}
                  initial={{ opacity: 0, scale: 1 }}
                  animate={
                    on && !reduced
                      ? { opacity: [0, 0.35, 0], scale: [1, 1.65, 1.8] }
                      : { opacity: 0 }
                  }
                  transition={
                    on && !reduced
                      ? { duration: 0.75, delay: tick, ease: "easeOut" }
                      : { duration: 0.2 }
                  }
                />

                {/* Empty box */}
                <span
                  className="absolute inset-0 rounded-[5px]"
                  style={{ border: `1.5px solid ${tint(fg, 30)}` }}
                />

                {/* Filled state fades over the top: opacity animates cleanly,
                    where a colour tween to a CSS variable could not. */}
                <motion.span
                  className="absolute inset-0 rounded-[5px]"
                  style={{ backgroundColor: accent }}
                  initial={{ opacity: 0, scale: 0.55 }}
                  animate={
                    on ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.55 }
                  }
                  transition={
                    on
                      ? { duration: 0.35, delay: tick, ease: [0.16, 1, 0.3, 1] }
                      : { duration: 0.2 }
                  }
                />

                <svg
                  viewBox="0 0 20 20"
                  className="relative h-2.5 w-2.5 sm:h-3 sm:w-3"
                >
                  <motion.path
                    d="M4 10.5 L8 14.5 L16 5.5"
                    fill="none"
                    stroke={fg}
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={
                      on
                        ? { pathLength: 1, opacity: 1 }
                        : { pathLength: 0, opacity: 0 }
                    }
                    transition={
                      on
                        ? {
                            pathLength: {
                              duration: 0.32,
                              delay: tick + 0.08,
                              ease: "easeOut",
                            },
                            opacity: { duration: 0.1, delay: tick + 0.08 },
                          }
                        : { duration: 0.2 }
                    }
                  />
                </svg>
              </span>

              <motion.span
                className="min-w-0 flex-1"
                initial={{ opacity: 0.45, x: 0 }}
                animate={on ? { opacity: 1, x: 3 } : { opacity: 0.45, x: 0 }}
                transition={
                  on
                    ? { duration: 0.4, delay: tick + 0.05, ease: "easeOut" }
                    : { duration: 0.2 }
                }
              >
                <span className="block truncate text-[10.5px] font-medium sm:text-[13px]">
                  {stage.name}
                </span>
                <span
                  className="hidden truncate text-[7.5px] sm:block sm:text-[9px]"
                  style={{ color: tint(fg, 55) }}
                >
                  {stage.detail}
                </span>
              </motion.span>

              <motion.span
                className="ml-auto shrink-0 text-[6.5px] tracking-[0.16em] uppercase sm:text-[8px]"
                style={{ color: accent }}
                initial={{ opacity: 0 }}
                animate={on ? { opacity: 1 } : { opacity: 0 }}
                transition={
                  on ? { duration: 0.3, delay: tick + 0.2 } : { duration: 0.2 }
                }
              >
                Done
              </motion.span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
