"use client";

import { motion } from "framer-motion";
import { Sparkline } from "@/components/ui/primitives";
import { CountUp, compact } from "./CountUp";
import { loopFade, useLoop, type VisualProps } from "./useLoop";

const PERIOD = 15600;

/** `dense` lines are dropped on the shortest viewports. */
const PAYLOAD = [
  { key: null, value: "{" },
  { key: '"campaign"', value: '"spring_drop_24"', quoted: true },
  { key: '"platform"', value: '"instagram"', quoted: true, dense: true },
  { key: '"creators"', value: "64" },
  { key: '"posts"', value: "128", dense: true },
  { key: '"likes"', value: "28491" },
  { key: '"comments"', value: "1842" },
  { key: '"saves"', value: "5310", dense: true },
  { key: '"shares"', value: "2104", dense: true },
  { key: '"reach"', value: "482910" },
  { key: '"views"', value: "723840" },
  { key: '"watch_time"', value: '"2m 14s"', quoted: true, dense: true },
  { key: '"engagement"', value: "8.4" },
  { key: '"cpm"', value: "142.6", dense: true },
  { key: '"roas"', value: "4.6", dense: true },
  { key: '"sentiment"', value: '"positive"', quoted: true },
  { key: '"score"', value: "89" },
  { key: '"proposed_budget"', value: '"1.2L"', quoted: true },
  { key: '"status"', value: '"ongoing"', quoted: true },

  { key: null, value: "}" },
] as const;

const BARS = [38, 52, 44, 66, 58, 82, 74];
const LINE = [10, 22, 18, 36, 44, 40, 62, 74, 68, 86];
const SPARK = [10, 22, 18, 36, 44, 40, 62, 74];

/** Donut palette borrowed from the hero dashboard. */
const DONUTS = [
  { label: "Delivered", pct: 0.72, tone: "#f9a8d4" },
  { label: "Positive", pct: 0.64, tone: "#0ea5e9" },
  { label: "Repeat", pct: 0.48, tone: "#c084fc" },
] as const;

const HANDOFF = 6.6;

function linePath(points: number[], width = 100, height = 30) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;

  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * width;
    const y = height - ((p - min) / span) * (height - 3) - 1.5;
    return [x, y] as const;
  });

  return coords
    .map(([x, y], i) => {
      if (i === 0) return `M${x.toFixed(2)},${y.toFixed(2)}`;
      const [px, py] = coords[i - 1];
      const cx = (px + x) / 2;
      return `C${cx.toFixed(2)},${py.toFixed(2)} ${cx.toFixed(2)},${y.toFixed(
        2,
      )} ${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

function Donut({
  pct,
  tone,
  label,
  on,
  delay,
}: {
  pct: number;
  tone: string;
  label: string;
  on: boolean;
  delay: number;
}) {
  return (
    <div className="flex min-w-0 items-center gap-1.5">
      <svg viewBox="0 0 44 44" className="h-7 w-7 shrink-0 md:h-9 md:w-9">
        <circle
          cx="22"
          cy="22"
          r="17"
          fill="none"
          stroke="var(--mist)"
          strokeWidth="6"
        />
        <motion.circle
          cx="22"
          cy="22"
          r="17"
          fill="none"
          stroke={tone}
          strokeWidth="6"
          strokeLinecap="round"
          transform="rotate(-90 22 22)"
          initial={{ pathLength: 0 }}
          animate={on ? { pathLength: pct } : { pathLength: 0 }}
          transition={
            on
              ? { duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }
              : { duration: 0.2 }
          }
        />
      </svg>
      <div className="min-w-0">
        <p className="font-display text-[10px] leading-none font-semibold tabular-nums md:text-[13px]">
          {Math.round(pct * 100)}%
        </p>
        <p className="truncate text-[6.5px] tracking-widest text-slate uppercase md:text-[8px]">
          {label}
        </p>
      </div>
    </div>
  );
}

export function LiveTracking({ active }: VisualProps) {
  const { cycle, reduced } = useLoop(active, PERIOD);
  const fade = loopFade(PERIOD);
  const on = active;
  const t = (v: number) => (reduced ? 0 : v);

  return (
    <motion.div
      key={cycle}
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={on && !reduced ? fade.animate : { opacity: 1 }}
      transition={on && !reduced ? fade.transition : { duration: 0.3 }}
    >
      {/* Phase 1 — data arriving from the social APIs */}
      <motion.div
        className="absolute inset-0 flex flex-col bg-white text-left text-ink"
        initial={{ opacity: 0 }}
        animate={on && !reduced ? { opacity: [0, 1, 1, 0] } : { opacity: 0 }}
        transition={
          on && !reduced
            ? {
                duration: HANDOFF + 0.5,
                times: [0, 0.05, 0.92, 1],
                ease: "easeInOut",
              }
            : { duration: 0.3 }
        }
      >
        <div className="flex shrink-0 items-center gap-1.5 border-b border-line px-2.5 py-1.5 sm:px-4 sm:py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" />
          <span className="font-mono text-[8px] tracking-tight sm:text-[10px]">
            GET /api/metrics
          </span>
          <span className="ml-auto font-mono text-[7.5px] text-green-700 sm:text-[9px] ">
            200 OK · 84ms
          </span>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden px-2.5 py-1 sm:px-4 sm:py-1.5">
          {PAYLOAD.map((line, i) => (
            <motion.div
              key={line.value + i}
              className={`flex gap-1 font-mono text-[7px] leading-[1.42] sm:text-[9px] sm:leading-normal ${
                "dense" in line && line.dense ? "hidden md:flex" : "flex"
              }`}
              initial={{ opacity: 0, x: -3 }}
              animate={on ? { opacity: 1, x: 0 } : { opacity: 0, x: -3 }}
              transition={
                on
                  ? { duration: 0.26, delay: t(0.4 + i * 0.24) }
                  : { duration: 0.2 }
              }
            >
              {line.key ? (
                <>
                  <span className="text-slate" style={{ paddingLeft: 10 }}>
                    {line.key}:
                  </span>
                  <span
                    className={
                      "quoted" in line && line.quoted
                        ? "text-ink"
                        : "text-green-dark"
                    }
                  >
                    {line.value}
                    {i < PAYLOAD.length - 2 ? "," : ""}
                  </span>
                </>
              ) : (
                <span className="text-slate">{line.value}</span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Phase 2 — the campaign dashboard the data lands in */}
      <motion.div
        className="absolute inset-0 flex flex-col gap-1 bg-white p-2 text-left text-ink sm:gap-1.5 sm:p-3"
        initial={{ opacity: 0 }}
        animate={on ? { opacity: 1 } : { opacity: 0 }}
        transition={
          on
            ? { duration: 0.5, delay: t(HANDOFF), ease: [0.16, 1, 0.3, 1] }
            : { duration: 0.3 }
        }
      >
        <div className="flex shrink-0 items-center gap-1.5">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-signal"
            animate={
              on && !reduced
                ? { opacity: [1, 0.25, 1], scale: [1, 0.8, 1] }
                : {}
            }
            transition={
              on && !reduced
                ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
                : undefined
            }
          />
          <span className="text-[7px] font-semibold tracking-[0.18em] text-green-dark uppercase sm:text-[9px]">
            Live
          </span>
          <span className="truncate text-[7px] tracking-[0.12em] text-slate uppercase sm:text-[8.5px]">
            Campaign performance
          </span>
          <span className="ml-auto flex shrink-0 items-center gap-1 rounded-full bg-signal/12 px-1.5 py-0.5 text-[7px] font-medium text-green-dark sm:text-[8.5px]">
            ↑ 0.58%
          </span>
        </div>

        {/* Stat cards */}
        <div className="grid shrink-0 grid-cols-3 gap-1 sm:gap-1.5">
          {[
            { label: "Views", to: 723840, fmt: compact },
            { label: "Reach", to: 482910, fmt: compact },
            {
              label: "Engagement",
              to: 8.4,
              fmt: (v: number) => `${v.toFixed(1)}%`,
            },
          ].map((m, i) => (
            <div
              key={m.label}
              className="rounded-lg border border-line bg-paper/60 px-1.5 py-1"
            >
              <p className="truncate text-[6px] tracking-widest text-slate uppercase sm:text-[7.5px]">
                {m.label}
              </p>
              <CountUp
                to={m.to}
                format={m.fmt}
                run={on}
                reduced={reduced}
                duration={1.8}
                delay={t(HANDOFF + 0.25 + i * 0.12)}
                className="font-display block text-[11px] leading-none font-semibold tabular-nums sm:text-[15px]"
              />
            </div>
          ))}
        </div>

        {/* Bars + donuts */}
        <div className="flex min-h-0 flex-1 gap-1 sm:gap-1.5">
          <div className="flex min-w-0 flex-1 items-end gap-0.75 rounded-lg border border-line bg-paper/60 px-1.5 py-1.5 sm:gap-1 sm:px-2">
            {BARS.map((h, i) => (
              <motion.span
                key={i}
                className={`min-w-0 flex-1 rounded-[2px] ${
                  i > 4 ? "bg-sky-800" : "bg-sky-800/25"
                }`}
                initial={{ height: "0%" }}
                animate={on ? { height: `${h}%` } : { height: "0%" }}
                transition={
                  on
                    ? {
                        duration: 0.7,
                        delay: t(HANDOFF + 0.45 + i * 0.07),
                        ease: [0.16, 1, 0.3, 1],
                      }
                    : { duration: 0.2 }
                }
              />
            ))}
          </div>

          {/* Three donuts: stacked beside the bars on desktop */}
          <div className="hidden shrink-0 flex-col justify-between rounded-lg border border-line bg-paper/60 px-1.5 py-1.5 md:flex">
            {DONUTS.map((d, i) => (
              <Donut
                key={d.label}
                pct={d.pct}
                tone={d.tone}
                label={d.label}
                on={on}
                delay={t(HANDOFF + 0.6 + i * 0.18)}
              />
            ))}
          </div>
        </div>

        {/* Donut row for the stacked card layout */}
        <div className="hidden shrink-0 justify-between gap-1.5 rounded-lg border border-line bg-paper/60 px-2 py-1 sm:flex md:hidden">
          {DONUTS.map((d, i) => (
            <Donut
              key={d.label}
              pct={d.pct}
              tone={d.tone}
              label={d.label}
              on={on}
              delay={t(HANDOFF + 0.6 + i * 0.18)}
            />
          ))}
        </div>

        {/* Drawn trend line, with a pulsing sparkline alongside */}
        <div className="flex h-7 shrink-0 items-center gap-2 rounded-lg border border-line bg-paper/60 px-2 sm:h-9">
          <svg
            viewBox="0 0 100 30"
            preserveAspectRatio="none"
            className="h-4 min-w-0 flex-2 sm:h-5"
          >
            <motion.path
              d={linePath(LINE)}
              fill="none"
              stroke="#7e22ce"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={on ? { pathLength: 1 } : { pathLength: 0 }}
              transition={
                on
                  ? {
                      duration: 1.6,
                      delay: t(HANDOFF + 0.7),
                      ease: "easeInOut",
                    }
                  : { duration: 0.2 }
              }
            />
          </svg>

          <motion.div
            className="hidden h-4 min-w-0 flex-1 sm:block sm:h-5"
            initial={{ opacity: 0 }}
            animate={
              on
                ? reduced
                  ? { opacity: 0.75 }
                  : { opacity: [0.4, 0.9, 0.4] }
                : { opacity: 0 }
            }
            transition={
              on && !reduced
                ? {
                    duration: 2.4,
                    delay: t(HANDOFF + 1),
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : { duration: 0.3, delay: t(HANDOFF + 1) }
            }
          >
            <Sparkline
              points={SPARK}
              stroke="#f97316"
              className="h-full w-full"
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
