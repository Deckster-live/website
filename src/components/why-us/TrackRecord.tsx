"use client";

import { motion } from "framer-motion";
import { CountUp } from "./CountUp";
import { loopFade, useLoop, type VisualProps } from "./useLoop";

const PERIOD = 10600;

/** Same roster the brand marquee above the fold runs. */
const BRANDS = [
  "Rare Rabbit",
  "Bewakoof",
  "Mokobara",
  "Snitch",
  "The Souled Store",
  "Fabindia",
  "Chumbak",
  "Wildcraft",
  "Third Wave Coffee",
  "The Pant Project",
  "Campus Sutra",
  "Bombay Shaving Co.",
] as const;

/** Six tiles per column overflow the well, so the -50% loop stays seamless. */
const COLUMNS = [
  { offset: 0, duration: "34s" },
  { offset: 3, duration: "27s" },
  { offset: 6, duration: "40s" },
  { offset: 9, duration: "31s" },
  { offset: 2, duration: "36s" },
] as const;

const ROWS = [
  { offset: 0, duration: "30s" },
  { offset: 5, duration: "24s" },
  { offset: 8, duration: "36s" },
] as const;

const pick = (offset: number, count: number) =>
  Array.from({ length: count }, (_, i) => BRANDS[(offset + i) % BRANDS.length]);

function Tile({ name, column }: { name: string; column?: boolean }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-xl border border-line bg-white/90 text-center leading-tight text-ink ${
        column
          ? "h-12 px-1.5 text-[8.5px] md:h-14 md:text-[9.5px]"
          : "h-9 w-24 px-1.5 text-[8px] sm:h-11 sm:w-28 sm:text-[9.5px]"
      }`}
    >
      {name}
    </span>
  );
}

export function TrackRecord({ active }: VisualProps) {
  const { cycle, reduced } = useLoop(active, PERIOD);
  const fade = loopFade(PERIOD);
  const on = active;
  const play = on && !reduced ? "running" : "paused";

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Desktop: vertical marquees, alternating up and down */}
      <div className="absolute inset-0 hidden gap-1.5 px-1.5 md:flex">
        {COLUMNS.map((col, i) => (
          <div
            key={i}
            className="marquee-mask-y min-w-0 flex-1 overflow-hidden"
          >
            <div
              className={`flex flex-col gap-1.5 ${
                i % 2 === 1 ? "animate-marquee-y-reverse" : "animate-marquee-y"
              }`}
              style={{ animationDuration: col.duration, animationPlayState: play }}
            >
              {[...pick(col.offset, 6), ...pick(col.offset, 6)].map((name, j) => (
                <Tile key={`${name}-${j}`} name={name} column />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tablet and mobile: horizontal marquees, alternating direction */}
      <div className="absolute inset-0 flex flex-col justify-center gap-2 md:hidden">
        {ROWS.map((row, i) => (
          <div key={i} className="marquee-mask overflow-hidden">
            <div
              className={`flex w-max gap-2 ${
                i % 2 === 1 ? "animate-marquee-reverse" : "animate-marquee"
              }`}
              style={{ animationDuration: row.duration, animationPlayState: play }}
            >
              {[...pick(row.offset, 8), ...pick(row.offset, 8)].map((name, j) => (
                <Tile key={`${name}-${j}`} name={name} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Glass anchor */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <motion.div
          key={cycle}
          className="flex flex-col items-center rounded-2xl border border-white/60 bg-white/45 px-4 py-2.5 backdrop-blur-md sm:px-6 sm:py-3.5"
          initial={{ opacity: 0 }}
          animate={on && !reduced ? fade.animate : { opacity: 1 }}
          transition={on && !reduced ? fade.transition : { duration: 0.3 }}
        >
          <span className="font-display flex items-baseline text-[clamp(2.2rem,8vw,4.25rem)] leading-none font-semibold tabular-nums text-ink">
            <CountUp
              to={150}
              format={(v) => Math.round(v).toString()}
              run={on}
              reduced={reduced}
              duration={3.4}
              delay={reduced ? 0 : 0.4}
            />
            <motion.span
              className="text-green-dark"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={on ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
              transition={
                on
                  ? {
                      duration: 0.5,
                      delay: reduced ? 0 : 3.5,
                      ease: [0.16, 1, 0.3, 1],
                    }
                  : { duration: 0.2 }
              }
            >
              +
            </motion.span>
          </span>

          <span className="mt-1 text-[7px] tracking-[0.2em] text-slate uppercase sm:text-[9px]">
            Brands delivered for
          </span>
          <motion.span
            className="mt-0.5 text-[7px] font-semibold tracking-[0.14em] text-green-dark uppercase sm:text-[8.5px]"
            initial={{ opacity: 0 }}
            animate={on ? { opacity: 1 } : { opacity: 0 }}
            transition={
              on
                ? { duration: 0.5, delay: reduced ? 0 : 4 }
                : { duration: 0.2 }
            }
          >
            And they came back
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}
