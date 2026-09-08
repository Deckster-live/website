"use client";

import { motion } from "framer-motion";
import { loopFade, useLoop, type VisualProps } from "./useLoop";

const PERIOD = 13400;

/** Neon-ish tones; each pill's dot matches its glowing border. */
const TONES = {
  rose: "#fb7185",
  pink: "#f472b6",
  purple: "#c084fc",
  indigo: "#818cf8",
  blue: "#60a5fa",
  sky: "#38bdf8",
} as const;

/**
 * Hand-placed rather than randomised: organic, deterministic for SSR, and
 * guaranteed to stay inside the container. `dense` pills drop on small screens.
 */
const PILLS = [
  { label: "Beauty", x: 22, y: 18, rot: -4, tone: "rose" },
  { label: "Fashion", x: 63, y: 14, rot: 3, tone: "purple" },
  { label: "Gaming", x: 86, y: 30, rot: -2, tone: "indigo" },
  { label: "Fitness", x: 34, y: 38, rot: 2, tone: "sky" },
  { label: "Finance", x: 70, y: 44, rot: -3, tone: "blue" },
  { label: "Food", x: 14, y: 52, rot: 4, tone: "pink" },
  { label: "Travel", x: 46, y: 60, rot: -2, tone: "sky" },
  { label: "Tech", x: 82, y: 62, rot: 3, tone: "indigo" },
  { label: "Skincare", x: 26, y: 74, rot: -3, tone: "rose" },
  { label: "Luxury", x: 64, y: 80, rot: 2, tone: "purple" },
  { label: "Wellness", x: 88, y: 48, rot: -4, tone: "pink", dense: true },
  { label: "Parenting", x: 46, y: 28, rot: 3, tone: "blue", dense: true },
  { label: "Automotive", x: 22, y: 90, rot: -2, tone: "indigo", dense: true },
  { label: "Sports", x: 82, y: 88, rot: 4, tone: "sky", dense: true },
  { label: "Education", x: 54, y: 94, rot: -3, tone: "purple", dense: true },
] as const;

export function NicheCoverage({ active }: VisualProps) {
  const { cycle, reduced } = useLoop(active, PERIOD);
  const fade = loopFade(PERIOD);
  const on = active;

  return (
    // Glass field the pills populate.
    <div className="absolute inset-0 border border-white/15 bg-white/10 backdrop-blur-md">
      <div className="absolute top-1.5 left-2 z-10 sm:top-2.5 sm:left-3">
        <p className="text-[6.5px] font-semibold tracking-[0.18em] text-white/60 uppercase sm:text-[8px]">
          15+ niches covered
        </p>
      </div>

      <motion.div
        key={cycle}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={on && !reduced ? fade.animate : { opacity: 1 }}
        transition={on && !reduced ? fade.transition : { duration: 0.3 }}
      >
        {PILLS.map((pill, i) => {
          // One or two pills enter at a time, so the field fills progressively.
          const appear = reduced ? 0 : 0.4 + Math.floor(i / 2) * 0.66;
          const tone = TONES[pill.tone];

          return (
            // Wrapper owns the centring offset so it never fights the animation.
            <span
              key={pill.label}
              className={`absolute -translate-x-1/2 -translate-y-1/2 ${
                "dense" in pill && pill.dense ? "hidden sm:block" : ""
              }`}
              style={{ left: `${pill.x}%`, top: `${pill.y}%` }}
            >
              {/* Entrance */}
              <motion.span
                className="block"
                style={{ rotate: `${pill.rot}deg` }}
                initial={{ opacity: 0, scale: 0.82, filter: "blur(4px)" }}
                animate={
                  on
                    ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                    : { opacity: 0, scale: 0.82, filter: "blur(4px)" }
                }
                transition={
                  on
                    ? {
                        duration: 0.55,
                        delay: appear,
                        ease: [0.16, 1, 0.3, 1],
                      }
                    : { duration: 0.25 }
                }
              >
                {/* Float lives on its own layer and returns to 0, so the
                    infinite repeat never snaps. */}
                <motion.span
                  className="flex items-center gap-1 rounded-full border bg-white px-1.5 py-1 whitespace-nowrap sm:gap-1.5 sm:px-2.5 sm:py-1"
                  style={{
                    borderColor: tone,
                    boxShadow: `0 0 10px ${tone}66, 0 0 2px ${tone}`,
                  }}
                  animate={on && !reduced ? { y: [0, -3, 0] } : { y: 0 }}
                  transition={
                    on && !reduced
                      ? {
                          duration: 4 + (i % 3) * 0.6,
                          delay: appear,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                      : { duration: 0.2 }
                  }
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full sm:h-2 sm:w-2"
                    style={{ backgroundColor: tone }}
                  />
                  <span className="text-[7.5px] font-medium text-ink sm:text-[10px]">
                    {pill.label}
                  </span>
                </motion.span>
              </motion.span>
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}
