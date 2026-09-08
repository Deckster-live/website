"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, ChevronDown, Copy, Mail } from "lucide-react";
import { Section } from "@/components/ui/primitives";

const GOALS = [
  "acquire new customers",
  "launch a product",
  "build the brand",
  "scale paid ads",
  "run whitelisting",
  "seed to creators",
  "open a new store",
] as const;

const BUDGETS = [
  "under ₹5L",
  "₹5L – ₹15L",
  "₹15L – ₹50L",
  "₹50L and up",
  "still figuring it out",
] as const;

const FIELD_ORDER = ["name", "brand", "goal", "budget", "email"] as const;

type FieldName = (typeof FIELD_ORDER)[number];
type Brief = Record<FieldName, string>;

const EMPTY_BRIEF: Brief = {
  name: "",
  brand: "",
  goal: "",
  budget: "",
  email: "",
};

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

function composeBrief(brief: Brief) {
  return [
    "Hi Deckster,",
    "",
    `I'm ${brief.name} from ${brief.brand}. We're looking to ${brief.goal}, with a budget around ${brief.budget}.`,
    "",
    `Reach me at ${brief.email}.`,
  ].join("\n");
}

/* -------------------------------------------------- */
/* Inline blanks                                      */
/* -------------------------------------------------- */

function blankLine({ invalid, filled }: { invalid: boolean; filled: boolean }) {
  if (invalid) return "border-red-400/80";
  if (filled) return "border-signal/70";
  return "border-paper/30 hover:border-paper/55";
}

interface InlineTextProps {
  name: FieldName;
  value: string;
  placeholder: string;
  type?: "text" | "email";
  invalid: boolean;
  onChange: (value: string) => void;
  register: (name: FieldName, node: HTMLInputElement | null) => void;
}

function InlineText({
  name,
  value,
  placeholder,
  type = "text",
  invalid,
  onChange,
  register,
}: InlineTextProps) {
  return (
    <span
      className={`group relative inline-grid max-w-full border-b pb-0.5 align-baseline transition-colors focus-within:border-signal ${blankLine(
        { invalid, filled: value.length > 0 },
      )}`}
    >
      {/* invisible sizer keeps the blank exactly as wide as its content */}
      <span
        aria-hidden
        className="col-start-1 row-start-1 invisible px-1.5 whitespace-pre"
      >
        {value || placeholder}
      </span>

      <input
        ref={(node) => register(name, node)}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        autoComplete={
          name === "email" ? "email" : name === "name" ? "name" : "organization"
        }
        spellCheck={false}
        size={1}
        className="col-start-1 row-start-1 w-full min-w-0 bg-transparent px-1.5 text-paper caret-signal outline-none placeholder:text-paper/35 placeholder:italic"
      />

      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-300 ease-out group-focus-within:scale-x-100"
      />
    </span>
  );
}

interface InlineChoiceProps {
  name: FieldName;
  value: string;
  placeholder: string;
  options: readonly string[];
  invalid: boolean;
  onSelect: (value: string) => void;
  register: (name: FieldName, node: HTMLButtonElement | null) => void;
}

function InlineChoice({
  name,
  value,
  placeholder,
  options,
  invalid,
  onSelect,
  register,
}: InlineChoiceProps) {
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLSpanElement>(null);
  const popover = useRef<HTMLSpanElement>(null);

  // nudge the popover back inside the viewport when the blank sits near an edge
  useEffect(() => {
    const node = popover.current;
    if (!open || !node) return;

    node.style.marginLeft = "0px";
    const overflow =
      node.getBoundingClientRect().right - (window.innerWidth - 12);
    if (overflow > 0) node.style.marginLeft = `${-overflow}px`;
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handlePointer = (event: MouseEvent) => {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <span ref={wrapper} className="relative inline-block align-baseline">
      <button
        ref={(node) => register(name, node)}
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={placeholder}
        className={`group inline-flex items-center gap-1.5 border-b px-1.5 pb-0.5 text-left transition-colors focus-visible:border-signal focus-visible:outline-none ${blankLine(
          { invalid, filled: value.length > 0 },
        )}`}
      >
        <span className={value ? "text-paper" : "text-paper/35 italic"}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 text-paper/45 transition-transform duration-200 ${
            open ? "-scale-y-100" : ""
          }`}
          strokeWidth={2}
        />
      </button>

      {open && (
        <span
          ref={popover}
          className="animate-content-rise absolute top-[calc(100%+12px)] left-0 z-30 block w-[min(19rem,76vw)] overflow-hidden rounded-2xl border border-line bg-paper font-sans text-ink shadow-(--shadow-float)"
        >
          <span
            role="listbox"
            className="block max-h-[min(16rem,45vh)] overflow-y-auto p-1.5"
          >
            {options.map((option) => {
              const selected = option === value;

              return (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onSelect(option);
                    setOpen(false);
                  }}
                  className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-[13.5px] transition-colors hover:bg-mist"
                >
                  <span className={selected ? "font-medium" : "text-slate"}>
                    {option}
                  </span>
                  {selected && (
                    <Check
                      className="h-3.5 w-3.5 text-signal"
                      strokeWidth={2.5}
                    />
                  )}
                </button>
              );
            })}
          </span>
        </span>
      )}
    </span>
  );
}

/* -------------------------------------------------- */
/* Section                                            */
/* -------------------------------------------------- */

export function ContactSection() {
  const [brief, setBrief] = useState<Brief>(EMPTY_BRIEF);
  const [attempted, setAttempted] = useState(false);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const fields = useRef(new Map<FieldName, HTMLElement>());

  const register = (name: FieldName, node: HTMLElement | null) => {
    if (node) fields.current.set(name, node);
    else fields.current.delete(name);
  };

  const update = (name: FieldName) => (value: string) =>
    setBrief((previous) => ({ ...previous, [name]: value }));

  const isMissing = (name: FieldName) =>
    name === "email"
      ? !isEmail(brief.email.trim())
      : brief[name].trim().length === 0;

  const filledCount = FIELD_ORDER.filter((name) => !isMissing(name)).length;
  const remaining = FIELD_ORDER.length - filledCount;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setAttempted(true);

    const firstMissing = FIELD_ORDER.find(isMissing);

    if (firstMissing) {
      fields.current.get(firstMissing)?.focus();
      return;
    }

    const subject = `Brief from ${brief.brand.trim()} — ${brief.goal}`;
    const mailto = `mailto:hello@deckster.live?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(composeBrief(brief))}`;

    window.location.href = mailto;
    setSent(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(composeBrief(brief));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const invalid = (name: FieldName) => attempted && isMissing(name);

  return (
    <Section id="cta" className="relative">
      <div
        className="glow-field relative overflow-hidden rounded-4xl bg-[radial-gradient(circle_at_center,#051F20_0%,#051F20_35%,var(--ink)_100%)] px-5 py-14 sm:rounded-[2.5rem] sm:px-10 md:py-20 lg:px-14"
        style={{
          ["--glow-field-image" as string]:
            "radial-gradient(70% 55% at 78% 0%, color-mix(in oklab, var(--signal) 30%, transparent) 0%, transparent 72%)",
        }}
      >
        {/* graph-paper texture — the brief sheet it's written on */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in oklab, var(--paper) 7%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--paper) 7%, transparent) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(90% 75% at 50% 0%, black, transparent 100%)",
          }}
        />

        <p
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-5 hidden font-sans text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.82] font-semibold tracking-tighter text-transparent select-none bg-linear-to-b from-paper/22 to-transparent bg-clip-text sm:left-10 lg:left-14 lg:block"
        >
          deckster<span className="text-signal/40">.</span>
        </p>

        <div className="relative grid gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-center lg:gap-16">
          {/* -------- Left: the ask -------- */}
          <div className="relative">
            <p className="eyebrow text-paper/55">Start a brief</p>

            <h2 className="font-display mt-4 text-[clamp(1.9rem,4.4vw,3rem)] leading-[1.1] font-semibold text-paper">
              Let&rsquo;s build your next campaign
            </h2>

            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-paper/65">
              Tell us the goal. We&rsquo;ll bring the reach, the right voices,
              and the results to match.
            </p>

            <div className="mt-9 flex flex-col gap-3 border-t border-paper/12 pt-7">
              {/* <p className="flex items-center gap-2.5 text-[13px] text-paper/55">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
                </span>
                A human reads every brief — usually replies same day
              </p> */}

              <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href="mailto:hello@deckster.live"
                  className="group inline-flex items-center gap-2 text-[14px] text-paper/80 transition-colors hover:text-signal"
                >
                  <Mail className="h-4 w-4" strokeWidth={1.75} />
                  hello@deckster.live
                </a>

                <a
                  href="mailto:hello@deckster.live?subject=Book%20a%2020-min%20call"
                  className="group inline-flex items-center gap-1.5 text-[14px] text-paper/80 transition-colors hover:text-signal"
                >
                  Book a 20-min call
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                  />
                </a>
              </div>
            </div>
          </div>

          {/* -------- Right: the brief -------- */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-[1.5rem] border border-paper/12 bg-paper/4.5 backdrop-blur-sm sm:rounded-[1.75rem]"
          >
            {/* document header */}
            <div className="flex items-center justify-between gap-4 border-b border-paper/12 px-5 py-3.5 sm:px-7">
              <p className="eyebrow text-paper/45">
                {sent ? "Brief · sent" : "Brief · draft"}
              </p>

              {/* <div className="flex items-center gap-2.5">
                <span className="flex items-center gap-1" aria-hidden>
                  {FIELD_ORDER.map((name, index) => (
                    <span
                      key={name}
                      className={`h-0.75 w-5 rounded-full transition-colors duration-300 ${
                        index < filledCount ? "bg-signal" : "bg-paper/18"
                      }`}
                    />
                  ))}
                </span>
                <span className="font-sans text-[11px] tabular-nums text-paper/45">
                  {filledCount}/{FIELD_ORDER.length}
                </span>
              </div> */}
            </div>

            {/* the brief itself */}
            {sent ? (
              <div className="px-5 py-9 sm:px-7 sm:py-11">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-signal/15">
                  <Check className="h-5 w-5 text-signal" strokeWidth={2.5} />
                </span>

                <p className="font-display mt-5 text-[clamp(1.25rem,2.4vw,1.6rem)] leading-snug font-semibold text-paper">
                  Your brief is ready to send.
                </p>

                <p className="mt-3 max-w-md text-[14px] leading-relaxed text-paper/60">
                  We&rsquo;ve opened your mail client with it written out. If
                  nothing happened, copy the brief and send it to{" "}
                  <a
                    href="mailto:hello@deckster.live"
                    className="text-paper underline decoration-signal/60 underline-offset-4"
                  >
                    hello@deckster.live
                  </a>
                  .
                </p>

                <pre className="mt-6 overflow-x-auto rounded-2xl border border-paper/12 bg-paper/4 p-4 font-sans text-[12.5px] leading-relaxed whitespace-pre-wrap text-paper/70">
                  {composeBrief(brief)}
                </pre>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 text-sm font-medium text-ink transition-opacity hover:opacity-90"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" strokeWidth={2.5} />
                    ) : (
                      <Copy className="h-4 w-4" strokeWidth={2} />
                    )}
                    {copied ? "Copied" : "Copy brief"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="text-sm text-paper/60 transition-colors hover:text-paper"
                  >
                    Edit the brief
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="font-display px-5 py-8 text-[clamp(1.05rem,2.1vw,1.4rem)] leading-[2.1] text-paper/45 sm:px-7 sm:py-10">
                  Hi Deckster — I&rsquo;m{" "}
                  <InlineText
                    name="name"
                    value={brief.name}
                    placeholder="your name"
                    invalid={invalid("name")}
                    onChange={update("name")}
                    register={register}
                  />{" "}
                  from{" "}
                  <InlineText
                    name="brand"
                    value={brief.brand}
                    placeholder="your brand"
                    invalid={invalid("brand")}
                    onChange={update("brand")}
                    register={register}
                  />
                  . We&rsquo;re looking to{" "}
                  <InlineChoice
                    name="goal"
                    value={brief.goal}
                    placeholder="pick a goal"
                    options={GOALS}
                    invalid={invalid("goal")}
                    onSelect={update("goal")}
                    register={register}
                  />
                  , with a budget around{" "}
                  <InlineChoice
                    name="budget"
                    value={brief.budget}
                    placeholder="pick a range"
                    options={BUDGETS}
                    invalid={invalid("budget")}
                    onSelect={update("budget")}
                    register={register}
                  />
                  . Reach me at{" "}
                  <InlineText
                    name="email"
                    type="email"
                    value={brief.email}
                    placeholder="you@brand.com"
                    invalid={invalid("email")}
                    onChange={update("email")}
                    register={register}
                  />
                  .
                </div>

                {/* document footer */}
                <div className="flex flex-col gap-4 border-t border-paper/12 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                  <p className="order-2 text-[12.5px] text-paper/45 sm:order-1">
                    {attempted && remaining > 0
                      ? `${remaining} blank${remaining > 1 ? "s" : ""} still to fill`
                      : "No spam, no drip sequence. One reply, from a human."}
                  </p>

                  <button
                    type="submit"
                    className="order-1 inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-signal px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-90 sm:order-2"
                  >
                    Send the brief
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </Section>
  );
}

/* -------------------------------------------------- */
/* Variant — the original, form-free CTA slab          */
/* -------------------------------------------------- */

export function ContactSectionClassic() {
  return (
    <Section id="cta">
      <div className="glow-field relative overflow-hidden rounded-4xl bg-ink px-5 py-16 text-center sm:px-10 md:py-24">
        <p className="eyebrow text-paper/60">Let&rsquo;s work together</p>
        <h2 className="font-display mx-auto mt-4 max-w-xl text-[clamp(1.85rem,4.6vw,3rem)] leading-tight font-semibold text-paper">
          Bring your next campaign to a place built for it
        </h2>
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-paper/70">
          Tell us about your brand and goals — we&rsquo;ll get back with a
          shortlist and a plan within days, not weeks.
        </p>
        <div className="mt-9 flex flex-row items-center justify-center gap-2.5 sm:gap-3">
          <a
            href="mailto:hello@deckster.live"
            className="inline-flex w-auto shrink-0 items-center justify-center gap-1.5 rounded-full bg-paper px-4 py-3 text-sm font-medium whitespace-nowrap text-ink transition-opacity hover:opacity-85 sm:px-6"
          >
            Get in touch
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </a>

          <Link
            href="/#solutions"
            className="inline-flex w-auto shrink-0 items-center justify-center rounded-full border border-paper/25 px-4 py-3 text-sm font-medium whitespace-nowrap text-paper transition-colors hover:bg-paper/10 sm:px-6"
          >
            How it works
          </Link>
        </div>
        <p className="absolute right-5 bottom-0 font-sans text-6xl font-semibold tracking-[-0.04em] text-transparent bg-linear-to-b from-paper/25 to-transparent bg-clip-text md:text-[110px]">
          deckster<span className="text-signal/50">.</span>
        </p>
      </div>
    </Section>
  );
}
