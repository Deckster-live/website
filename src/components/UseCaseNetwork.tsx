"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentProps,
  type Ref,
} from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HEAD_GAP, Section, SectionHead } from "@/components/ui/primitives";
import {
  AcquisitionIcon,
  BrandIcon,
  CampaignsIcon,
  IgcIcon,
  LaunchIcon,
  MegaphoneIcon,
  MonitorAdIcon,
  PodcastIcon,
  SeedingIcon,
  StorefrontIcon,
  UgcIcon,
  VerifiedCardIcon,
  VerifiedIdIcon,
  type IconComponent,
} from "./use-cases/icons";

/* -------------------------------------------------- */
/* Content                                            */
/* -------------------------------------------------- */

interface Format {
  id: string;
  label: string;
  Icon: IconComponent;
  /** line work */
  tint: string;
  /** accent fills */
  accent: string;
}

const FORMATS: readonly Format[] = [
  {
    id: "ugc",
    label: "UGC",
    Icon: UgcIcon,
    tint: "#4F46E5",
    accent: "#EC4899",
  },
  {
    id: "igc",
    label: "IGC",
    Icon: IgcIcon,
    tint: "#DB2777",
    accent: "#F59E0B",
  },
  {
    id: "paid-ads",
    label: "Paid Ads",
    Icon: MonitorAdIcon,
    tint: "#2563EB",
    accent: "#F59E0B",
  },
  {
    id: "whitelisting",
    label: "Whitelisting",
    Icon: VerifiedIdIcon,
    tint: "#1D4ED8",
    accent: "#10B981",
  },
  {
    id: "campaigns",
    label: "Campaigns",
    Icon: CampaignsIcon,
    tint: "#7C3AED",
    accent: "#06B6D4",
  },
  {
    id: "podcast",
    label: "Podcast Amplification",
    Icon: PodcastIcon,
    tint: "#9333EA",
    accent: "#06B6D4",
  },
];

interface Goal {
  label: string;
  Icon: IconComponent;
  tint: string;
  accent: string;
  formats: readonly string[];
}

const GOALS: readonly Goal[] = [
  {
    label: "Customer Acquisition",
    Icon: AcquisitionIcon,
    tint: "#E11D48",
    accent: "#0EA5E9",
    formats: ["paid-ads", "whitelisting", "ugc"],
  },
  {
    label: "Product Launch",
    Icon: LaunchIcon,
    tint: "#7C3AED",
    accent: "#F59E0B",
    formats: ["ugc", "igc", "campaigns"],
  },
  {
    label: "Brand Building",
    Icon: BrandIcon,
    tint: "#2563EB",
    accent: "#F59E0B",
    formats: ["igc", "campaigns", "podcast"],
  },
  {
    label: "Paid Ads",
    Icon: MegaphoneIcon,
    tint: "#EA580C",
    accent: "#10B981",
    formats: ["paid-ads", "whitelisting"],
  },
  {
    label: "Whitelisting",
    Icon: VerifiedCardIcon,
    tint: "#4F46E5",
    accent: "#10B981",
    formats: ["whitelisting", "igc", "paid-ads"],
  },
  {
    label: "Store Launch",
    Icon: StorefrontIcon,
    tint: "#0D9488",
    accent: "#F43F5E",
    formats: ["ugc", "campaigns"],
  },
  {
    label: "Seeding Campaigns",
    Icon: SeedingIcon,
    tint: "#059669",
    accent: "#D97706",
    formats: ["ugc", "igc"],
  },
];

const labelOf = (id: string) =>
  FORMATS.find((format) => format.id === id)?.label ?? id;

const CYCLE_MS = 3400;

/** Breathing room between a pill edge and where its connector starts. */
const LEAD = 10;

const mix = (color: string, amount: number, into = "var(--card)") =>
  `color-mix(in oklab, ${color} ${amount}%, ${into})`;

/** Pill lift in the item's own hue. */
const pillSkin = (tint: string, active: boolean) =>
  active
    ? {
        borderColor: mix(tint, 42, "transparent"),
        backgroundImage: `linear-gradient(100deg, ${mix(tint, 10)}, var(--card) 62%)`,
        boxShadow: `0 0 0 4px ${mix(tint, 8, "transparent")}, 0 18px 34px -22px ${mix(
          tint,
          80,
          "transparent",
        )}`,
      }
    : undefined;

/* -------------------------------------------------- */
/* Pills                                              */
/* -------------------------------------------------- */

const PILL_BASE =
  "flex items-center gap-3 rounded-full border py-2 text-left transition-all duration-300";

function IconBadge({
  Icon,
  tint,
  accent,
  active,
  className,
}: {
  Icon: IconComponent;
  tint: string;
  accent: string;
  active: boolean;
  className?: string;
}) {
  return (
    <span
      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
        className ?? ""
      }`}
      style={{
        ["--ic-1" as string]: tint,
        ["--ic-2" as string]: accent,
        borderColor: mix(tint, active ? 34 : 20, "transparent"),
        backgroundImage: `linear-gradient(140deg, ${mix(
          tint,
          active ? 20 : 12,
        )}, ${mix(accent, active ? 18 : 10)})`,
        boxShadow: active
          ? `0 6px 16px -8px ${mix(tint, 55, "transparent")}`
          : undefined,
      }}
    >
      <Icon className="h-6 w-6" />
    </span>
  );
}

interface GoalPillProps extends ComponentProps<"button"> {
  goal: Goal;
  active: boolean;
  buttonRef?: Ref<HTMLButtonElement>;
}

function GoalPill({
  goal,
  active,
  buttonRef,
  className,
  ...rest
}: GoalPillProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      aria-pressed={active}
      className={`group ${PILL_BASE} pr-2 pl-5 focus-visible:outline-none ${
        active ? "" : "border-line bg-card hover:border-line-strong"
      } ${className ?? ""}`}
      style={pillSkin(goal.tint, active)}
      {...rest}
    >
      <span
        className={`text-[14px] leading-snug font-medium transition-colors duration-300 ${
          active ? "text-ink" : "text-slate group-hover:text-ink"
        }`}
      >
        {goal.label}
      </span>

      <span className="sr-only">
        {` — we run it as ${goal.formats.map(labelOf).join(", ")}`}
      </span>

      <IconBadge
        Icon={goal.Icon}
        tint={goal.tint}
        accent={goal.accent}
        active={active}
        className="ml-auto"
      />
    </button>
  );
}

function FormatPill({
  format,
  active,
  className,
}: {
  format: Format;
  active: boolean;
  className?: string;
}) {
  return (
    <div
      className={`${PILL_BASE} pr-5 pl-2 ${
        active ? "" : "border-line bg-card"
      } ${className ?? ""}`}
      style={pillSkin(format.tint, active)}
    >
      <IconBadge
        Icon={format.Icon}
        tint={format.tint}
        accent={format.accent}
        active={active}
      />

      <span
        className={`text-[14px] leading-snug font-medium transition-colors duration-300 ${
          active ? "text-ink" : "text-slate"
        }`}
      >
        {format.label}
      </span>

      <span
        aria-hidden
        className={`ml-auto h-2 w-2 shrink-0 rounded-full transition-opacity duration-300 ${
          active ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundColor: format.tint }}
      />
    </div>
  );
}

function ColumnLabel({
  title,
  sub,
  align = "left",
}: {
  title: string;
  sub: string;
  align?: "left" | "right" | "center";
}) {
  return (
    <div
      className={
        align === "right"
          ? "text-right"
          : align === "center"
            ? "text-center"
            : "text-left"
      }
    >
      <p className="eyebrow">{title}</p>
      <p className="mt-1 text-[11.5px] text-slate/60">({sub})</p>
    </div>
  );
}

/* -------------------------------------------------- */
/* Hub — the Deckster node                            */
/* -------------------------------------------------- */

function Hub({
  discRef,
  pulseKey,
  tint,
  reduced,
  size,
}: {
  discRef?: React.Ref<HTMLDivElement>;
  pulseKey: number;
  tint: string;
  reduced: boolean;
  size: string;
}) {
  return (
    <div className="relative grid place-items-center">
      <motion.span
        key={reduced ? "static" : pulseKey}
        aria-hidden
        className="pointer-events-none absolute -inset-12 rounded-full blur-2xl"
        style={{
          background: `radial-gradient(closest-side, ${mix(
            tint,
            34,
            "transparent",
          )}, color-mix(in oklab, var(--signal) 26%, transparent) 55%, transparent)`,
        }}
        initial={reduced ? { opacity: 0.55 } : { opacity: 0.45, scale: 0.94 }}
        animate={
          reduced
            ? { opacity: 0.55 }
            : { opacity: [0.45, 0.85, 0.6], scale: [0.94, 1.05, 1] }
        }
        transition={
          reduced ? { duration: 0 } : { duration: 1.6, ease: "easeOut" }
        }
      />

      <span
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-full border transition-colors duration-500"
        style={{ borderColor: mix(tint, 14, "transparent") }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-3 rounded-full border transition-colors duration-500"
        style={{ borderColor: mix(tint, 26, "transparent") }}
      />

      <div
        ref={discRef}
        className={`relative grid ${size} place-items-center rounded-full border border-line bg-card shadow-(--shadow-float)`}
      >
        <img
          src="/logos/deckster.png"
          alt="Deckster"
          className="w-[58%] max-w-none"
        />
      </div>
    </div>
  );
}

/** Vertical connector used by the stacked mobile flow. */
function Spine({
  reduced,
  tint,
  toHub = false,
}: {
  reduced: boolean;
  tint: string;
  toHub?: boolean;
}) {
  const brand = "color-mix(in oklab, var(--signal) 70%, transparent)";

  return (
    <span
      aria-hidden
      className="relative h-9 w-0.5 overflow-hidden rounded-full transition-colors duration-500"
      style={{
        background: toHub
          ? `linear-gradient(to bottom, ${mix(tint, 75, "transparent")}, ${brand})`
          : `linear-gradient(to bottom, ${brand}, ${mix(tint, 20, "transparent")})`,
      }}
    >
      {!reduced && (
        <motion.span
          className="absolute left-1/2 h-3 w-0.5 -translate-x-1/2 rounded-full bg-signal"
          initial={{ top: "-25%", opacity: 0 }}
          animate={{ top: ["-25%", "100%"], opacity: [0, 1, 0] }}
          transition={{
            duration: 1.7,
            repeat: Infinity,
            repeatDelay: 0.5,
            ease: "linear",
          }}
        />
      )}
    </span>
  );
}

/* -------------------------------------------------- */
/* Connector geometry                                 */
/* -------------------------------------------------- */

interface Point {
  x: number;
  y: number;
}

interface StageGeometry {
  w: number;
  h: number;
  goals: (Point | null)[];
  formats: (Point | null)[];
  hubLeft: Point;
  hubRight: Point;
}

/** Horizontal-tangent cubic — the curve reads as flow, not as a diagram line. */
function flowPath(from: Point, to: Point) {
  const bend = Math.max(24, (to.x - from.x) * 0.52);

  return `M${from.x.toFixed(1)} ${from.y.toFixed(1)}C${(from.x + bend).toFixed(
    1,
  )} ${from.y.toFixed(1)} ${(to.x - bend).toFixed(1)} ${to.y.toFixed(
    1,
  )} ${to.x.toFixed(1)} ${to.y.toFixed(1)}`;
}

function Connections({
  geometry,
  activeGoal,
  matched,
  reduced,
}: {
  geometry: StageGeometry | null;
  activeGoal: number;
  matched: ReadonlySet<string>;
  reduced: boolean;
}) {
  const uid = useId().replace(/[:]/g, "");

  if (!geometry) return null;

  interface Leg {
    key: string;
    d: string;
    on: boolean;
    from: Point;
    to: Point;
    /** the hue the route carries, brand mint at the hub end */
    stops: [string, string];
  }

  const legs: Leg[] = [];
  const brand = "var(--signal)";

  geometry.goals.forEach((point, index) => {
    if (!point) return;

    const from = { x: point.x + LEAD, y: point.y };

    legs.push({
      key: `goal-${index}`,
      d: flowPath(from, geometry.hubLeft),
      on: index === activeGoal,
      from,
      to: geometry.hubLeft,
      stops: [GOALS[index].tint, brand],
    });
  });

  geometry.formats.forEach((point, index) => {
    if (!point) return;

    const to = { x: point.x - LEAD, y: point.y };

    legs.push({
      key: `format-${index}`,
      d: flowPath(geometry.hubRight, to),
      on: matched.has(FORMATS[index].id),
      from: geometry.hubRight,
      to,
      stops: [brand, FORMATS[index].tint],
    });
  });

  const live = legs.filter((leg) => leg.on);

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${geometry.w} ${geometry.h}`}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        {live.map((leg) => (
          <linearGradient
            key={`grad-${leg.key}`}
            id={`${uid}-${leg.key}`}
            gradientUnits="userSpaceOnUse"
            x1={leg.from.x}
            y1={leg.from.y}
            x2={leg.to.x}
            y2={leg.to.y}
          >
            <stop offset="0%" style={{ stopColor: leg.stops[0] }} />
            <stop offset="100%" style={{ stopColor: leg.stops[1] }} />
          </linearGradient>
        ))}
      </defs>

      {/* resting network */}
      {legs.map((leg) => (
        <path
          key={leg.key}
          d={leg.d}
          stroke="var(--line-strong)"
          strokeWidth={1.25}
          opacity={leg.on ? 0 : 0.62}
          className="transition-opacity duration-300"
        />
      ))}

      {/* the live route: goal → Deckster → formats */}
      {live.map((leg, index) => {
        const paint = `url(#${uid}-${leg.key})`;

        return (
          <g key={`live-${activeGoal}-${leg.key}`}>
            <path
              d={leg.d}
              stroke={paint}
              strokeWidth={6}
              opacity={0.18}
              style={{ filter: "blur(3px)" }}
            />

            <motion.path
              d={leg.d}
              stroke={paint}
              strokeWidth={1.8}
              initial={reduced ? { opacity: 1 } : { pathLength: 0, opacity: 0 }}
              animate={reduced ? { opacity: 1 } : { pathLength: 1, opacity: 1 }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
              }
            />

            {!reduced && (
              <motion.path
                d={leg.d}
                pathLength={1}
                stroke={paint}
                strokeWidth={3}
                strokeLinecap="round"
                strokeDasharray="0.05 0.95"
                initial={{ strokeDashoffset: 1, opacity: 0 }}
                animate={{ strokeDashoffset: 0, opacity: 0.95 }}
                transition={{
                  strokeDashoffset: {
                    duration: 2.4,
                    ease: "linear",
                    repeat: Infinity,
                    delay: 0.35 + index * 0.1,
                  },
                  opacity: { duration: 0.5, delay: 0.35 },
                }}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* -------------------------------------------------- */
/* Section                                            */
/* -------------------------------------------------- */

export function UseCaseNetwork() {
  const card = useRef<HTMLDivElement>(null);
  const inView = useInView(card, { amount: 0.25 });
  const reduced = useReducedMotion() ?? false;

  const [cycled, setCycled] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);

  const active = pinned ?? hovered ?? cycled;
  const goal = GOALS[active];
  const matched = new Set(goal.formats);

  // one goal lights up at a time while the section is on screen; hover or a tap takes over
  useEffect(() => {
    if (!inView || reduced || hovered !== null || pinned !== null) return;

    const id = window.setInterval(
      () => setCycled((index) => (index + 1) % GOALS.length),
      CYCLE_MS,
    );

    return () => window.clearInterval(id);
  }, [inView, reduced, hovered, pinned]);

  const select = (index: number) => {
    setCycled(index);
    setPinned((current) => (current === index ? null : index));
  };

  /* ---------- desktop connector measurement ---------- */

  const stage = useRef<HTMLDivElement>(null);
  const disc = useRef<HTMLDivElement>(null);
  const goalRows = useRef<(HTMLLIElement | null)[]>([]);
  const formatRows = useRef<(HTMLLIElement | null)[]>([]);
  const [geometry, setGeometry] = useState<StageGeometry | null>(null);

  const measure = useCallback(() => {
    const stageEl = stage.current;
    const discEl = disc.current;
    if (!stageEl || !discEl) return;

    const base = stageEl.getBoundingClientRect();
    if (base.width === 0) return;

    const hub = discEl.getBoundingClientRect();
    const hubY = hub.top + hub.height / 2 - base.top;

    const edge = (el: HTMLElement | null, side: "left" | "right") => {
      if (!el) return null;
      const box = el.getBoundingClientRect();

      return {
        x: (side === "right" ? box.right : box.left) - base.left,
        y: box.top + box.height / 2 - base.top,
      };
    };

    setGeometry({
      w: base.width,
      h: base.height,
      goals: GOALS.map((_, index) => edge(goalRows.current[index], "right")),
      formats: FORMATS.map((_, index) =>
        edge(formatRows.current[index], "left"),
      ),
      hubLeft: { x: hub.left - base.left, y: hubY },
      hubRight: { x: hub.right - base.left, y: hubY },
    });
  }, []);

  useEffect(() => {
    const stageEl = stage.current;
    if (!stageEl) return;

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(stageEl);
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  /* ---------- mobile: keep the active chip in view ---------- */

  const scroller = useRef<HTMLDivElement>(null);
  const chips = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const box = scroller.current;
    const chip = chips.current[active];
    if (!box || !chip || box.clientWidth === 0) return;

    // land on the chip's own snap position, so scroll snapping can't fight this
    const inset = parseFloat(getComputedStyle(box).paddingLeft) || 0;

    box.scrollTo({
      left: chip.offsetLeft - inset,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [active, reduced]);

  // side columns stay pill-width so the middle keeps enough run for the curves
  const columns =
    "grid-cols-[minmax(0,17rem)_minmax(0,1fr)_minmax(0,17rem)] gap-x-4";

  return (
    <Section id="use-cases">
      <div ref={card} className="relative">
        {/* ambient colour — soft washes behind the network, kept inside the
            column so nothing clips into a visible edge */}
        {/* <span
          aria-hidden
          className="pointer-events-none absolute -top-16 left-1/2 h-64 w-[min(44rem,100%)] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in oklab, var(--signal) 22%, transparent), transparent)",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-16 left-0 h-72 w-72 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(closest-side, ${mix(
              "#7C3AED",
              16,
              "transparent",
            )}, transparent)`,
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute right-0 -bottom-12 h-72 w-72 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(closest-side, ${mix(
              "#0EA5E9",
              15,
              "transparent",
            )}, transparent)`,
          }}
        /> */}

        <div className="relative">
          {/* ---------- heading ---------- */}
          <SectionHead
            align="center"
            eyebrow="Use cases · Solutions"
            title={
              <>
                From goal to execution:
                <span className="block">Deckster fits in everywhere</span>
              </>
            }
            copy="Pick a goal — see the formats we'd run to get you there."
          />

          {/* ---------- desktop: the network ---------- */}
          <div className={`hidden lg:block ${HEAD_GAP}`}>
            <div className={`grid ${columns} items-end`}>
              <ColumnLabel title="Your goals" sub="Use cases" />
              <span />
              <ColumnLabel title="Our formats" sub="Solutions" align="right" />
            </div>

            <div
              ref={stage}
              className={`relative mt-7 grid ${columns} items-center`}
            >
              <Connections
                geometry={geometry}
                activeGoal={active}
                matched={matched}
                reduced={reduced}
              />

              <ul className="relative z-10 flex flex-col gap-2.5">
                {GOALS.map((item, index) => (
                  <li
                    key={item.label}
                    ref={(node) => {
                      goalRows.current[index] = node;
                    }}
                  >
                    <GoalPill
                      goal={item}
                      active={index === active}
                      className="w-full"
                      onMouseEnter={() => setHovered(index)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(index)}
                      onBlur={() => setHovered(null)}
                      onClick={() => select(index)}
                    />
                  </li>
                ))}
              </ul>

              <div className="relative z-10 flex justify-center">
                <Hub
                  discRef={disc}
                  pulseKey={active}
                  tint={goal.tint}
                  reduced={reduced}
                  size="h-26 w-26"
                />
              </div>

              <ul className="relative z-10 flex flex-col gap-2.5">
                {FORMATS.map((format, index) => (
                  <li
                    key={format.id}
                    ref={(node) => {
                      formatRows.current[index] = node;
                    }}
                  >
                    <FormatPill
                      format={format}
                      active={matched.has(format.id)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ---------- mobile & tablet: the same route, stacked ---------- */}
          <div className={`lg:hidden ${HEAD_GAP}`}>
            <div className="flex items-end justify-between gap-4">
              <ColumnLabel title="Your goals" sub="Use cases" />
              <p className="text-[11px] text-slate/60">Tap to map</p>
            </div>

            <div
              ref={scroller}
              className="relative -mx-5 mt-5 flex snap-x snap-mandatory scroll-px-5 gap-2.5 overflow-x-auto px-5 pb-1 [-ms-overflow-style:none] scrollbar-none sm:-mx-8 sm:scroll-px-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
            >
              {GOALS.map((item, index) => (
                <GoalPill
                  key={item.label}
                  buttonRef={(node) => {
                    chips.current[index] = node;
                  }}
                  goal={item}
                  active={index === active}
                  className="w-58 shrink-0 snap-start"
                  onClick={() => select(index)}
                />
              ))}
            </div>

            <div className="mt-9 flex flex-col items-center">
              <Spine reduced={reduced} tint={goal.tint} toHub />
              <Hub
                pulseKey={active}
                tint={goal.tint}
                reduced={reduced}
                size="h-20 w-20"
              />
              <Spine reduced={reduced} tint={goal.tint} />
            </div>

            <div className="mt-4 flex items-end justify-between gap-4">
              <ColumnLabel title="Our formats" sub="Solutions" />
              <p className="text-[11px] text-slate/60">
                {goal.formats.length} of {FORMATS.length} matched
              </p>
            </div>

            <div className="mt-5 grid gap-2.5 min-[26rem]:grid-cols-2">
              {FORMATS.map((format) => (
                <FormatPill
                  key={format.id}
                  format={format}
                  active={matched.has(format.id)}
                />
              ))}
            </div>
          </div>

          {/* ---------- footer ---------- */}
          {/* <div className="mt-10 flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between md:mt-12">
            <p className="text-[13px] leading-relaxed text-slate">
              <span className="font-medium text-ink">{goal.label}</span>
              {" → "}
              {goal.formats.map(labelOf).join(" · ")}
            </p>

            <a
              href="#cta"
              className="group inline-flex shrink-0 items-center gap-1.5 self-start rounded-full bg-ink px-5 py-2.5 text-[13px] font-medium text-paper transition-colors hover:bg-green-dark sm:self-auto"
            >
              Get in Touch
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.75}
              />
            </a>
          </div> */}
        </div>
      </div>
    </Section>
  );
}
