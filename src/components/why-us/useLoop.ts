"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export interface VisualProps {
  /** True while the parent card is in the viewport. Animations idle when false. */
  active: boolean;
  /** Card foreground colour, so visuals inherit the card theme. */
  fg: string;
  /** Highlight colour — Deckster green on dark cards, ink on green cards. */
  accent: string;
}

/**
 * Drives an infinitely looping storyboard.
 *
 * `cycle` increments every `periodMs` while the card is on screen; keying a
 * subtree on it replays that subtree's declarative enter animations, which
 * keeps the loop free of per-frame React state updates. The interval only
 * exists while `active`, so off-screen cards cost nothing.
 */
export function useLoop(active: boolean, periodMs: number) {
  const reduced = useReducedMotion() ?? false;
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!active || reduced) return;

    const id = window.setInterval(() => setCycle((c) => c + 1), periodMs);
    return () => window.clearInterval(id);
  }, [active, reduced, periodMs]);

  return { cycle, reduced, running: active && !reduced };
}

/** Soft fade at the seam of each loop so the reset never reads as a hard cut. */
export function loopFade(periodMs: number) {
  return {
    animate: { opacity: [0, 1, 1, 1, 0] },
    transition: {
      duration: periodMs / 1000,
      times: [0, 0.05, 0.12, 0.93, 1],
      ease: "linear" as const,
    },
  };
}

/** Mixes a card's foreground colour down to a given strength. */
export function tint(fg: string, percent: number) {
  return `color-mix(in oklab, ${fg} ${percent}%, transparent)`;
}
