"use client";

import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

interface CountUpProps {
  to: number;
  format: (value: number) => string;
  /** Counts while true; parked at 0 when false. */
  run: boolean;
  /** Skips the count and shows the final value. */
  reduced?: boolean;
  duration?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Counts up by writing a MotionValue straight to the DOM node, so a running
 * counter never re-renders React on a frame boundary.
 */
export function CountUp({
  to,
  format,
  run,
  reduced = false,
  duration = 2,
  delay = 0,
  className,
  style,
}: CountUpProps) {
  const value = useMotionValue(0);
  const text = useTransform(value, format);

  useEffect(() => {
    if (reduced) {
      value.set(to);
      return;
    }

    if (!run) {
      value.set(0);
      return;
    }

    value.set(0);
    const controls = animate(value, to, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
    });

    return () => controls.stop();
  }, [run, reduced, to, duration, delay, value]);

  return (
    <motion.span className={className} style={style}>
      {text}
    </motion.span>
  );
}

export const compact = (value: number) => {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return Math.round(value).toString();
};

export const rupees = (value: number) => {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1).replace(/\.0$/, "")}L`;
  }
  if (value >= 1000) return `₹${Math.round(value / 1000)}K`;
  return `₹${Math.round(value)}`;
};
