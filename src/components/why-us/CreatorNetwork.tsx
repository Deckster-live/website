"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { loopFade, tint, useLoop, type VisualProps } from "./useLoop";

const PERIOD = 10400;

const LOGO = "/logos/deckster.png";

const AVATARS = [
  "/images/avatar.webp",
  "/images/avatar1.webp",
  "/images/avatar2.webp",
];

/**
 * viewBox is ~16:9 to match the visual well at every breakpoint, so
 * `xMidYMid meet` barely letterboxes and the mesh always fills the space.
 */
const W = 356;
const H = 200;

const HUB = { x: 178, y: 100, w: 108, h: 46 };

/** Creators ring the hub, with clear separation from the centre plate. */
const NODES = [
  { handle: "@aanya", x: 46, y: 44, avatar: 1, neon: "#22d3ee" },
  { handle: "@rahul", x: 132, y: 26, avatar: 0, neon: "#a855f7" },
  { handle: "@mehak", x: 224, y: 26, avatar: 2, neon: "#f472b6" },
  { handle: "@arjun", x: 310, y: 44, avatar: 0, neon: "#a3e635" },
  { handle: "@ishita", x: 46, y: 154, avatar: 2, neon: "#38bdf8" },
  { handle: "@dev", x: 132, y: 172, avatar: 1, neon: "#fbbf24" },
  { handle: "@simran", x: 224, y: 172, avatar: 1, neon: "#34d399" },
  { handle: "@kabir", x: 310, y: 154, avatar: 0, neon: "#fb7185" },
] as const;

/** A few creator-to-creator links keep it a mesh, not just a star. */
const PEER_LINKS = [
  { a: 0, b: 1, neon: "#22d3ee" },
  { a: 2, b: 3, neon: "#a3e635" },
  { a: 4, b: 5, neon: "#38bdf8" },
  { a: 6, b: 7, neon: "#fb7185" },
] as const;

/** Spokes that carry a travelling pulse once the network is live. */
const PULSES = [1, 3, 4, 6] as const;

const NODES_IN = 1.0;
const SPOKES_AT = 1.7;
const LIVE_AT = 3.3;

export function CreatorNetwork({ active, fg, accent }: VisualProps) {
  const uid = useId().replace(/:/g, "");
  const { cycle, reduced } = useLoop(active, PERIOD);
  const fade = loopFade(PERIOD);
  const on = active;
  const t = (v: number) => (reduced ? 0 : v);

  /** Neon look: a soft wide stroke under a crisp one — no filters needed. */
  const neonLine = (
    key: string,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    neon: string,
    delay: number,
  ) => (
    <g key={key}>
      {[
        { width: 4.5, opacity: 0.18 },
        { width: 1.2, opacity: 0.85 },
      ].map((layer, li) => (
        <motion.line
          key={li}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={neon}
          strokeWidth={layer.width}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            on
              ? { pathLength: 1, opacity: layer.opacity }
              : { pathLength: 0, opacity: 0 }
          }
          transition={
            on
              ? {
                  pathLength: { duration: 0.8, delay, ease: "easeInOut" },
                  opacity: { duration: 0.4, delay },
                }
              : { duration: 0.2 }
          }
        />
      ))}
    </g>
  );

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full"
      role="img"
      aria-label="Creators connected around the Deckster hub"
    >
      <defs>
        {NODES.map((n, i) => (
          <clipPath key={n.handle} id={`${uid}-clip-${i}`}>
            <circle cx={n.x} cy={n.y} r={13} />
          </clipPath>
        ))}
      </defs>

      <motion.g
        key={cycle}
        initial={{ opacity: 0 }}
        animate={on && !reduced ? fade.animate : { opacity: 1 }}
        transition={on && !reduced ? fade.transition : { duration: 0.3 }}
      >
        {/* Spokes: hub → creator. Drawn first so the hub plate covers the stubs. */}
        {NODES.map((n, i) =>
          neonLine(
            `spoke-${i}`,
            HUB.x,
            HUB.y,
            n.x,
            n.y,
            n.neon,
            t(SPOKES_AT + i * 0.1),
          ),
        )}

        {/* Peer links */}
        {PEER_LINKS.map((l, i) =>
          neonLine(
            `peer-${i}`,
            NODES[l.a].x,
            NODES[l.a].y,
            NODES[l.b].x,
            NODES[l.b].y,
            l.neon,
            t(SPOKES_AT + 0.9 + i * 0.12),
          ),
        )}

        {/* Pulses travelling out from the hub */}
        {!reduced &&
          PULSES.map((nodeIndex, i) => {
            const n = NODES[nodeIndex];
            return (
              <motion.circle
                key={`pulse-${nodeIndex}`}
                r={2.6}
                fill={n.neon}
                initial={{ cx: HUB.x, cy: HUB.y, opacity: 0 }}
                animate={
                  on
                    ? {
                        cx: [HUB.x, n.x, HUB.x],
                        cy: [HUB.y, n.y, HUB.y],
                        opacity: [0, 1, 1, 0],
                      }
                    : { opacity: 0 }
                }
                transition={
                  on
                    ? {
                        duration: 3.1,
                        delay: LIVE_AT + i * 0.42,
                        repeat: Infinity,
                        repeatDelay: 0.4,
                        ease: "easeInOut",
                        opacity: {
                          duration: 3.1,
                          delay: LIVE_AT + i * 0.42,
                          times: [0, 0.15, 0.82, 1],
                          repeat: Infinity,
                          repeatDelay: 0.4,
                        },
                      }
                    : { duration: 0.2 }
                }
              />
            );
          })}

        {/* Creator nodes */}
        {NODES.map((n, i) => (
          <motion.g
            key={n.handle}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={on ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
            transition={
              on
                ? {
                    duration: 0.5,
                    delay: t(NODES_IN + i * 0.11),
                    ease: [0.16, 1, 0.3, 1],
                  }
                : { duration: 0.2 }
            }
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            <circle cx={n.x} cy={n.y} r={15.5} fill={n.neon} opacity={0.22} />
            <image
              href={AVATARS[n.avatar]}
              x={n.x - 13}
              y={n.y - 13}
              width={26}
              height={26}
              clipPath={`url(#${uid}-clip-${i})`}
              preserveAspectRatio="xMidYMid slice"
            />
            <circle
              cx={n.x}
              cy={n.y}
              r={13}
              fill="none"
              stroke={n.neon}
              strokeWidth={1.2}
              opacity={0.9}
            />
            <text
              x={n.x}
              y={n.y + 24}
              textAnchor="middle"
              fill={tint(fg, 70)}
              style={{ fontSize: 9, letterSpacing: "0.02em" }}
            >
              {n.handle}
            </text>
          </motion.g>
        ))}

        {/* Deckster hub */}
        <motion.g
          initial={{ opacity: 0, scale: 0.86 }}
          animate={on ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.86 }}
          transition={
            on
              ? { duration: 0.55, delay: t(0.25), ease: [0.16, 1, 0.3, 1] }
              : { duration: 0.2 }
          }
          style={{ transformOrigin: `${HUB.x}px ${HUB.y}px` }}
        >
          <rect
            x={HUB.x - HUB.w / 2 - 4}
            y={HUB.y - HUB.h / 2 - 4}
            width={HUB.w + 8}
            height={HUB.h + 8}
            rx={14}
            fill={accent}
            opacity={0.18}
          />
          <rect
            x={HUB.x - HUB.w / 2}
            y={HUB.y - HUB.h / 2}
            width={HUB.w}
            height={HUB.h}
            rx={11}
            fill="#ffffff"
            stroke={accent}
            strokeWidth={1.4}
          />
          <image
            href={LOGO}
            x={HUB.x - 40}
            y={HUB.y - 13}
            width={80}
            height={26}
            preserveAspectRatio="xMidYMid meet"
          />
        </motion.g>

        <motion.text
          x={HUB.x}
          y={HUB.y + 44}
          textAnchor="middle"
          fill={tint(fg, 60)}
          style={{
            fontSize: 8.5,
            letterSpacing: "0.14em",
          }}
          initial={{ opacity: 0 }}
          animate={on ? { opacity: 1 } : { opacity: 0 }}
          transition={
            on ? { duration: 0.5, delay: t(LIVE_AT) } : { duration: 0.2 }
          }
        >
          60,000+ CREATORS · 15+ LANGUAGES
        </motion.text>
      </motion.g>
    </svg>
  );
}
