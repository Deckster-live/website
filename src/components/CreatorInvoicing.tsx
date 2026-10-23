"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Bell,
  CircleCheck,
  FileText,
  Mail,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { INVOICE_CREATE_URL, INVOICE_URL } from "@/lib/invoice";

/*
 * Deckster Invoice on the agency site: a talent manager picks a creator, types the deal into a little printer,
 * and the invoice prints out of it. Numbered notes around the receipt say which feature handles each part, and
 * two looping clocks under notes 5 and 6 act out the payment and usage-rights follow-up. Fictional creators,
 * agency and brand; the numbers add up the way the tool computes them (18% IGST on ₹1,14,000, 20% commission).
 */

const PROMPT =
  "Bill Glowberry for 2 reels at 45k and 3 stories at 8k, due in 15 days, 30 days usage";

const PRINT_MS = 2200;

type Phase = "idle" | "typing" | "printing" | "done";

interface Note {
  n: number;
  title: string;
  copy: string;
}

const LEFT: readonly Note[] = [
  {
    n: 1,
    title: "Typed, not filled in",
    copy: "Describe the deal in English, Hinglish or Hindi. AI drafts it in seconds.",
  },
  {
    n: 3,
    title: "Brands saved once",
    copy: "GSTIN, address and contacts reused on every invoice, with your theme and terms.",
  },
  {
    n: 5,
    title: "Reminders that chase for you",
    copy: "The brand is emailed 3 days before the due date and the day after it slips.",
  },
];

const RIGHT: readonly Note[] = [
  {
    n: 2,
    title: "Bill for any creator you manage",
    copy: "Pick a creator from your roster and invoice as them. Your commission is tracked on every deal, never printed.",
  },
  {
    n: 4,
    title: "GST, worked out",
    copy: "CGST + SGST, IGST or export under LUT, picked from both addresses.",
  },
  {
    n: 6,
    title: "Usage rights on the clock",
    copy: "Alerts at 5 and 3 days and on the day. Extend in one click.",
  },
];

const ALL_NOTES: readonly Note[] = [...LEFT, ...RIGHT].sort((a, b) => a.n - b.n);

const ROSTER = [
  { initials: "AR", name: "Aanya", color: "from-pink-400 to-amber-300" },
  { initials: "DM", name: "Dev", color: "from-sky-400 to-violet-400" },
  { initials: "MS", name: "Meher", color: "from-amber-300 to-lime-400" },
  { initials: "RI", name: "Rohan", color: "from-emerald-400 to-cyan-400" },
] as const;

export function CreatorInvoicing() {
  const stage = useRef<HTMLDivElement>(null);
  // starts when the printer itself is in view (on phones the notes make the block taller than the screen)
  const inView = useInView(stage, { amount: 0.6, once: true });
  const reduced = useReducedMotion() ?? false;
  const [phase, setPhase] = useState<Phase>("idle");
  const [chars, setChars] = useState(0);
  // bumped by Replay so the clocks start over
  const [cycle, setCycle] = useState(0);

  // idle → typing (once in view) → printing → done; reduced motion skips straight to done
  useEffect(() => {
    if (!inView) return;
    let t: number | undefined;
    if (reduced && phase !== "done") {
      t = window.setTimeout(() => {
        setChars(PROMPT.length);
        setPhase("done");
      }, 0);
    } else if (phase === "idle") {
      t = window.setTimeout(() => setPhase("typing"), 300);
    } else if (phase === "typing") {
      t =
        chars < PROMPT.length
          ? window.setTimeout(() => setChars((c) => c + 1), 26)
          : window.setTimeout(() => setPhase("printing"), 450);
    } else if (phase === "printing") {
      t = window.setTimeout(() => setPhase("done"), PRINT_MS);
    }
    return () => window.clearTimeout(t);
  }, [inView, reduced, phase, chars]);

  const replay = () => {
    setChars(0);
    setPhase("typing");
    setCycle((c) => c + 1);
  };

  const printed = phase === "printing" || phase === "done";
  const done = phase === "done";

  const clocks: Record<number, ReactNode> = {
    5: <ProcessClock key={`pay-${cycle}`} script={PAYMENT} run={done} reduced={reduced} />,
    6: <ProcessClock key={`usage-${cycle}`} script={USAGE} run={done} reduced={reduced} />,
  };

  return (
    <section
      id="invoicing"
      className="relative scroll-mt-24 overflow-hidden px-5 pb-10 pt-20 md:px-8 md:pb-14 md:pt-28 lg:pb-16 lg:pt-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--signal) 16%, transparent), transparent 65%)",
        }}
      />
      <div className="mx-auto max-w-310">
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-green-darkest px-3 py-1.5 text-[12px] font-medium text-paper">
            <span className="rounded-full bg-signal px-1.5 py-0.5 text-[10px] font-semibold uppercase leading-none tracking-wide text-ink">
              New
            </span>
            Deckster Invoice
          </p>
          <h2 className="font-display mt-5 text-[clamp(1.7rem,4.2vw,2.85rem)] leading-[1.08] font-semibold">
            We run the brand side.{" "}
            <span className="text-green-dark">Now creators get their side too.</span>
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-slate md:text-base">
            An invoicing tool built for creators and talent managers. Tell it the deal, and it
            prints a correct, GST-ready invoice, then keeps an eye on payment and usage rights.
          </p>
        </div>

        <div className="mt-14 grid items-start gap-10 md:mt-16 lg:grid-cols-[1fr_minmax(0,25rem)_1fr] lg:gap-10">
          <NoteColumn notes={LEFT} side="left" show={done} extras={clocks} className="hidden lg:grid" />

          {/* printer + receipt */}
          <div className="order-1 mx-auto w-full max-w-[25rem] lg:order-none">
            <div
              ref={stage}
              className="relative z-10 rounded-2xl bg-green-darkest p-3 text-paper shadow-[0_24px_50px_-24px_rgb(0_0_0/0.6)]"
            >
              {/* the manager's roster: who this invoice is for */}
              <div className="relative mb-2.5 flex items-center justify-between gap-2 rounded-xl bg-paper/[0.06] px-2.5 py-2">
                <span className="text-[10.5px] leading-tight text-paper/60">
                  Spotlight Talent
                  <span className="block text-paper/90">billing for</span>
                </span>
                <span className="flex items-center gap-1.5">
                  {ROSTER.map((c, i) => (
                    <span
                      key={c.initials}
                      className={`grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br text-[9.5px] font-semibold text-ink transition-all duration-500 ${c.color} ${
                        i === 0
                          ? "ring-2 ring-signal ring-offset-2 ring-offset-green-darkest"
                          : "opacity-45"
                      }`}
                      title={c.name}
                    >
                      {c.initials}
                    </span>
                  ))}
                  <span className="ml-0.5 text-[10.5px] text-paper/50">+8</span>
                </span>
                <Marker n={2} show={done} className="-right-2 -top-2" />
              </div>

              <div className="flex items-center justify-between px-1 pb-2 text-[10px] uppercase tracking-[0.18em] text-paper/50">
                <span className="flex items-center gap-1.5">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      phase === "printing"
                        ? "animate-pulse bg-signal"
                        : done
                          ? "bg-signal"
                          : "bg-paper/30"
                    }`}
                  />
                  {phase === "printing" ? "Printing" : done ? "Ready" : "Describe the deal"}
                </span>
                {done && !reduced && (
                  <button
                    type="button"
                    onClick={replay}
                    className="flex items-center gap-1 normal-case tracking-normal text-paper/60 transition-colors hover:text-paper"
                  >
                    <RotateCcw className="h-3 w-3" /> Replay
                  </button>
                )}
              </div>
              <div className="relative flex min-h-[4.5rem] items-start gap-2 rounded-xl bg-paper/10 px-3 py-2.5 text-[13.5px] leading-snug">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                <span>
                  {PROMPT.slice(0, chars)}
                  {phase === "typing" && (
                    <span className="ml-0.5 inline-block h-3.5 w-px translate-y-0.5 animate-pulse bg-signal" />
                  )}
                </span>
                <Marker n={1} show={done} className="-right-2 -top-2" />
              </div>
              {/* the slot */}
              <div className="mx-2 mt-3 h-1.5 rounded-full bg-ink/80" />
            </div>

            {/* fixed-size window the receipt slides down into, so nothing below moves */}
            <div className="relative -mt-1 overflow-hidden px-5 pb-3">
              <motion.div
                initial={false}
                animate={{ y: printed ? "0%" : "-101%" }}
                transition={{
                  // prints slowly, tears off fast on replay
                  duration: reduced ? 0 : printed ? PRINT_MS / 1000 : 0.35,
                  ease: [0.45, 0, 0.25, 1],
                }}
              >
                <Receipt showMarkers={done} />
              </motion.div>
            </div>
          </div>

          <NoteColumn notes={RIGHT} side="right" show={done} extras={clocks} className="hidden lg:grid" />

          {/* phones and tablets: one list in order, 1 to 6, under the receipt */}
          <NoteColumn
            notes={ALL_NOTES}
            side="right"
            show={done}
            extras={clocks}
            className="order-2 grid sm:grid-cols-2 lg:hidden"
          />
        </div>

        <div className="mt-12 flex flex-nowrap justify-center gap-2 sm:gap-3">
          <a
            href={INVOICE_CREATE_URL}
            className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-ink px-3.5 py-2.5 text-[12.5px] font-medium text-paper transition-colors hover:bg-green-dark sm:gap-2 sm:px-5 sm:text-[14px]"
          >
            Create a free invoice
            <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2} />
          </a>
          <a
            href={INVOICE_URL}
            className="inline-flex items-center whitespace-nowrap rounded-full border border-line-strong bg-paper px-3.5 py-2.5 text-[12.5px] font-medium transition-colors hover:bg-mist sm:px-5 sm:text-[14px]"
          >
            Explore Deckster Invoice
          </a>
        </div>
        <p className="mt-3 text-center text-[12.5px] text-slate">
          5 free invoices, no signup needed.
        </p>
      </div>
    </section>
  );
}

function Receipt({ showMarkers }: { showMarkers: boolean }) {
  return (
    <div className="relative bg-white px-5 pb-6 pt-5 font-mono text-[12px] text-ink shadow-[0_30px_60px_-30px_rgb(0_0_0/0.35)]">
      <div className="flex items-start justify-between">
        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-slate">
          Tax invoice
        </span>
        <span>INV/26-27/014</span>
      </div>

      <Row className="mt-4 border-t border-dashed border-line-strong pt-3">
        <span className="text-slate">From</span>
        <span className="text-right">
          Aanya Rao
          <span className="block text-[10.5px] text-slate">GSTIN 27ABCPR1234F1Z5</span>
        </span>
      </Row>
      <Row className="mt-2">
        <span className="text-slate">To</span>
        <span className="text-right">
          Glowberry Skincare
          <span className="block text-[10.5px] text-slate">GSTIN 29AAGCG4521K1Z3</span>
        </span>
        <Marker n={3} show={showMarkers} className="-left-9 top-0" />
      </Row>

      <div className="mt-4 border-t border-dashed border-line-strong pt-3">
        <Row>
          <span>Instagram Reel × 2</span>
          <span>90,000</span>
        </Row>
        <Row className="mt-1.5">
          <span>Story set × 3</span>
          <span>24,000</span>
        </Row>
        <Row className="mt-1.5 text-slate">
          <span>IGST 18%</span>
          <span>20,520</span>
          <Marker n={4} show={showMarkers} className="-right-9 -top-0.5" />
        </Row>
      </div>

      <Row className="mt-3 border-t border-ink pt-2.5 font-sans text-[15px] font-semibold">
        <span>Total</span>
        <span className="tabular-nums">₹1,34,520</span>
      </Row>

      {/* what the manager earns: recorded against the deal, not printed for the brand */}
      <div className="mt-3 rounded-md border border-dashed border-signal bg-signal/10 px-2.5 py-1.5 font-sans text-[11px] text-green-dark">
        <Row>
          <span>Spotlight commission 20%</span>
          <span className="font-semibold tabular-nums">₹22,800</span>
        </Row>
        <span className="block text-[10px] opacity-75">Tracked for you · not printed</span>
      </div>

      <div className="mt-4 space-y-1.5 border-t border-dashed border-line-strong pt-3 text-[11px]">
        <Row>
          <span className="text-slate">Due 7 Nov</span>
          <span>reminder · 4 Nov</span>
          <Marker n={5} show={showMarkers} className="-left-9 -top-0.5" />
        </Row>
        <Row>
          <span className="text-slate">Usage rights</span>
          <span>30 days · to 22 Nov</span>
          <Marker n={6} show={showMarkers} className="-right-9 -top-0.5" />
        </Row>
      </div>

      {/* torn edge */}
      <div
        aria-hidden
        className="absolute inset-x-0 -bottom-2 h-2"
        style={{
          background:
            "linear-gradient(135deg, white 50%, transparent 50%) 0 0 / 12px 12px repeat-x, linear-gradient(225deg, white 50%, transparent 50%) 0 0 / 12px 12px repeat-x",
        }}
      />
    </div>
  );
}

function Row({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative flex items-start justify-between gap-4 ${className}`}>
      {children}
    </div>
  );
}

function Marker({ n, show, className }: { n: number; show: boolean; className: string }) {
  return (
    <span
      aria-hidden
      className={`absolute grid h-5 w-5 place-items-center rounded-full bg-signal font-sans text-[10px] font-semibold text-ink shadow transition-all duration-300 ${className} ${
        show ? "scale-100 opacity-100" : "scale-50 opacity-0"
      }`}
      style={{ transitionDelay: show ? `${n * 90}ms` : "0ms" }}
    >
      {n}
    </span>
  );
}

function NoteColumn({
  notes,
  side,
  show,
  extras,
  className,
}: {
  notes: readonly Note[];
  side: "left" | "right";
  show: boolean;
  extras: Record<number, ReactNode>;
  className: string;
}) {
  return (
    <ul
      className={`gap-6 lg:grid-cols-1 lg:gap-12 lg:pt-6 ${
        side === "left" ? "lg:text-right" : ""
      } ${className}`}
    >
      {notes.map(({ n, title, copy }) => (
        <li
          key={n}
          className={`flex gap-3 transition-opacity duration-500 lg:block ${
            show ? "opacity-100" : "opacity-40 lg:opacity-30"
          }`}
          style={{ transitionDelay: show ? `${n * 90}ms` : "0ms" }}
        >
          <span
            className={`grid h-6 w-6 shrink-0 place-items-center rounded-full bg-green-darkest text-[11px] font-semibold text-paper lg:mb-2 ${
              side === "left" ? "lg:ml-auto" : ""
            }`}
          >
            {n}
          </span>
          <span className="block min-w-0 flex-1">
            <span className="block text-[15px] font-medium">{title}</span>
            <span className="mt-1 block text-[13.5px] leading-snug text-slate">{copy}</span>
            {extras[n] && <span className="mt-3 block text-left">{extras[n]}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* -------------------------------------------------- */
/* Looping process clocks (notes 5 and 6)             */
/* -------------------------------------------------- */

type Icon = "mail" | "bell" | "check" | "doc";
type Tone = "signal" | "amber";

type Step =
  | { kind: "count"; to: number; status: (days: number) => string }
  | {
      kind: "event";
      title: string;
      lines: readonly { icon: Icon; text: string }[];
      tone: Tone;
      hold: number;
      /** shown in the ring instead of the day count */
      face?: string;
      /** fill the ring (paid, extended) */
      full?: boolean;
    };

interface Script {
  label: string;
  start: number;
  steps: readonly Step[];
}

const PAYMENT: Script = {
  label: "Payment · INV/014",
  start: 15,
  steps: [
    { kind: "count", to: 3, status: (d) => `Due in ${d} days` },
    {
      kind: "event",
      title: "Reminder emailed",
      tone: "signal",
      hold: 2200,
      lines: [
        { icon: "mail", text: "To accounts@glowberry.in · due in 3 days" },
        { icon: "bell", text: "In-app: reminder went out" },
      ],
    },
    { kind: "count", to: 0, status: (d) => (d === 0 ? "Due today" : `Due in ${d} days`) },
    {
      kind: "event",
      title: "Overdue · nudged",
      tone: "amber",
      hold: 2200,
      face: "+1",
      lines: [
        { icon: "mail", text: "Firm, polite reminder to Glowberry" },
        { icon: "bell", text: "In-app: 1 day overdue" },
      ],
    },
    {
      kind: "event",
      title: "Paid · ₹1,34,520",
      tone: "signal",
      hold: 2400,
      face: "✓",
      full: true,
      lines: [
        { icon: "check", text: "Marked paid on 9 Nov" },
        { icon: "check", text: "Reminders stop on their own" },
      ],
    },
  ],
};

const USAGE: Script = {
  label: "Usage rights · reel",
  start: 30,
  steps: [
    { kind: "count", to: 5, status: (d) => `${d} days of usage left` },
    {
      kind: "event",
      title: "5 days left",
      tone: "signal",
      hold: 1600,
      lines: [
        { icon: "mail", text: "Email to Glowberry" },
        { icon: "bell", text: "Alert to Aanya & Spotlight" },
      ],
    },
    { kind: "count", to: 3, status: (d) => `${d} days of usage left` },
    {
      kind: "event",
      title: "3 days left",
      tone: "signal",
      hold: 1600,
      lines: [
        { icon: "mail", text: "Email to Glowberry" },
        { icon: "bell", text: "Alert to Aanya & Spotlight" },
      ],
    },
    { kind: "count", to: 0, status: (d) => (d === 0 ? "Ends today" : `${d} days of usage left`) },
    {
      kind: "event",
      title: "Ends today · all told",
      tone: "amber",
      hold: 2200,
      lines: [
        { icon: "mail", text: "Brand: stop using the reel today" },
        { icon: "bell", text: "Creator & agency alerted" },
      ],
    },
    {
      kind: "event",
      title: "Extended +30 days",
      tone: "signal",
      hold: 2400,
      face: "+30",
      full: true,
      lines: [
        { icon: "doc", text: "Extension invoice drafted · ₹29,500" },
        { icon: "check", text: "New end date: 22 Dec" },
      ],
    },
  ],
};

const TICK_MS = 120;
const ICONS = { mail: Mail, bell: Bell, check: CircleCheck, doc: FileText } as const;

/** Acts out a script in one fixed-size box, over and over, while `run` is on. */
function ProcessClock({
  script,
  run,
  reduced,
}: {
  script: Script;
  run: boolean;
  reduced: boolean;
}) {
  const [i, setI] = useState(0);
  const [days, setDays] = useState(script.start);
  const step = script.steps[i]!;

  useEffect(() => {
    if (!run) return;
    let t: number;
    if (step.kind === "count") {
      t =
        days > step.to
          ? window.setTimeout(
              () => setDays((d) => d - 1),
              i === 0 && days === script.start ? 700 : TICK_MS,
            )
          : window.setTimeout(() => setI(i + 1), 0);
    } else {
      t = window.setTimeout(() => {
        const next = (i + 1) % script.steps.length;
        if (next === 0) setDays(script.start);
        setI(next);
      }, step.hold);
    }
    return () => window.clearTimeout(t);
  }, [run, i, days, step, script]);

  const event = step.kind === "event" ? step : null;
  const amber = event?.tone === "amber";
  const R = 22;
  const C = 2 * Math.PI * R;
  const fill = event?.full ? 1 : days / script.start;
  const status =
    event?.title ?? (step.kind === "count" ? step.status(days) : "") ?? "";

  return (
    <span
      className={`block rounded-2xl border bg-paper p-3 transition-all duration-500 ${
        event
          ? amber
            ? "border-amber-400/60 shadow-[0_16px_30px_-22px_rgb(0_0_0/0.5)]"
            : "border-signal/60 shadow-[0_16px_30px_-22px_rgb(0_0_0/0.5)]"
          : "border-line"
      }`}
    >
      <span className="flex items-center gap-3">
        <span className="relative h-14 w-14 shrink-0">
          <svg viewBox="0 0 56 56" className="h-14 w-14 -rotate-90">
            <circle cx="28" cy="28" r={R} fill="none" stroke="var(--line)" strokeWidth="5" />
            <circle
              cx="28"
              cy="28"
              r={R}
              fill="none"
              stroke={amber ? "#f59e0b" : event ? "var(--signal)" : "var(--green-dark)"}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - fill)}
              style={{
                transition: reduced
                  ? "none"
                  : `stroke-dashoffset ${event?.full ? 600 : TICK_MS}ms ease-out, stroke 300ms`,
              }}
            />
          </svg>
          <span className="absolute inset-0 grid place-items-center text-center leading-none">
            <span>
              <span
                className={`block font-display text-base font-semibold tabular-nums ${
                  amber ? "text-amber-600" : ""
                }`}
              >
                {event?.face ?? days}
              </span>
              {!event?.face && (
                <span className="block text-[8.5px] uppercase tracking-wider text-slate">days</span>
              )}
            </span>
          </span>
        </span>
        <span className="min-w-0 flex-1">
          <span className="eyebrow block truncate">{script.label}</span>
          <span className="mt-0.5 block truncate text-[14px] font-medium">{status}</span>
        </span>
        <motion.span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
            event ? (amber ? "bg-amber-400 text-ink" : "bg-signal text-ink") : "bg-mist text-slate"
          }`}
          animate={event && !reduced ? { rotate: [0, -16, 14, -10, 6, 0] } : { rotate: 0 }}
          transition={event && !reduced ? { duration: 0.6, repeat: Infinity, repeatDelay: 0.9 } : { duration: 0 }}
        >
          <Bell className="h-3.5 w-3.5" />
        </motion.span>
      </span>

      {/* what fires at this step; space is reserved so the box never changes size */}
      <span className="mt-2.5 block h-[3.5rem] space-y-1">
        {event
          ? event.lines.map((l, k) => {
              const Icon = ICONS[l.icon];
              return (
                <motion.span
                  key={`${i}-${k}`}
                  className="flex items-center gap-2 rounded-md bg-mist/80 px-2 py-1 text-[11.5px]"
                  initial={reduced ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: k * 0.18 }}
                >
                  <Icon
                    className={`h-3.5 w-3.5 shrink-0 ${amber ? "text-amber-600" : "text-green-dark"}`}
                  />
                  <span className="truncate">{l.text}</span>
                </motion.span>
              );
            })
          : (
              <span className="flex items-center gap-2 px-2 py-1 text-[11.5px] text-slate">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-dark" />
                {run ? "Deckster is keeping watch…" : "Starts once it’s issued"}
              </span>
            )}
      </span>

      {/* where we are in the process */}
      <span className="mt-1 flex gap-1">
        {script.steps.map((_, k) => (
          <span
            key={k}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              k < i ? "bg-green-dark/50" : k === i ? (amber ? "bg-amber-400" : "bg-signal") : "bg-line"
            }`}
          />
        ))}
      </span>
    </span>
  );
}
