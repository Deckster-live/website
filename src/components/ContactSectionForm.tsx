"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Check, ChevronDown, Mail } from "lucide-react";
import { HashLink } from "@/components/ui/HashLink";
import { Section } from "@/components/ui/primitives";

const BUDGETS = [
  "Under ₹5L",
  "₹5L – ₹15L",
  "₹15L – ₹50L",
  "₹50L and up",
  "Not sure yet",
] as const;

const FIELD_ORDER = ["name", "brand", "email", "budget", "goal"] as const;

type FieldName = (typeof FIELD_ORDER)[number];
type Enquiry = Record<FieldName, string>;

const EMPTY: Enquiry = {
  name: "",
  brand: "",
  email: "",
  budget: "",
  goal: "",
};

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

/* -------------------------------------------------- */
/* Hairline field                                     */
/* -------------------------------------------------- */

interface FieldProps {
  label: string;
  invalid: boolean;
  className?: string;
  children: React.ReactNode;
}

function Field({ label, invalid, className = "", children }: FieldProps) {
  return (
    <label className={`group block ${className}`}>
      <span className="eyebrow block">{label}</span>

      <span
        className={`relative mt-2.5 block border-b transition-colors ${
          invalid ? "border-destructive" : "border-line-strong"
        }`}
      >
        {children}

        {/* the hairline becomes signal on focus — the only accent in the field */}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-px left-0 h-[1.5px] w-full origin-left scale-x-0 bg-signal transition-transform duration-300 ease-out group-focus-within:scale-x-100"
        />
      </span>
    </label>
  );
}

const inputClass =
  "w-full bg-transparent py-2.5 text-[15px] text-ink outline-none placeholder:text-slate/45";

/* -------------------------------------------------- */
/* Section                                            */
/* -------------------------------------------------- */

export function ContactSectionForm() {
  const [enquiry, setEnquiry] = useState<Enquiry>(EMPTY);
  const [attempted, setAttempted] = useState(false);
  const [sent, setSent] = useState(false);

  const fields = useRef(new Map<FieldName, HTMLElement>());

  const register = (name: FieldName, node: HTMLElement | null) => {
    if (node) fields.current.set(name, node);
    else fields.current.delete(name);
  };

  const update =
    (name: FieldName) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setEnquiry((previous) => ({ ...previous, [name]: event.target.value }));

  const isMissing = (name: FieldName) =>
    name === "email"
      ? !isEmail(enquiry.email.trim())
      : enquiry[name].trim().length === 0;

  const invalid = (name: FieldName) => attempted && isMissing(name);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setAttempted(true);

    const firstMissing = FIELD_ORDER.find(isMissing);

    if (firstMissing) {
      fields.current.get(firstMissing)?.focus();
      return;
    }

    const body = [
      "Hi Deckster,",
      "",
      `Name: ${enquiry.name}`,
      `Brand: ${enquiry.brand}`,
      `Email: ${enquiry.email}`,
      `Budget: ${enquiry.budget}`,
      "",
      "What we're looking to achieve:",
      enquiry.goal,
    ].join("\n");

    window.location.assign(
      `mailto:hello@deckster.live?subject=${encodeURIComponent(
        `Enquiry from ${enquiry.brand.trim()}`,
      )}&body=${encodeURIComponent(body)}`,
    );

    setSent(true);
  };

  return (
    <Section id="cta" className="pt-0! pb-24! md:pb-32!">
      <div
        className="glow-field relative rounded-4xl py-4 md:py-8"
        style={{
          ["--glow-field-image" as string]:
            "radial-gradient(circle clamp(14rem, 42vw, 28rem) at 50% 10%, color-mix(in oklab, var(--signal) 16%, transparent) 0%, transparent 72%)",
        }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Let&rsquo;s work together</p>

          <h2 className="font-display mt-4 text-[clamp(1.85rem,4.6vw,3.15rem)] leading-[1.06] font-semibold">
            Let&rsquo;s build your next campaign
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-slate md:text-base">
            Tell us the goal. We&rsquo;ll bring the reach, the right voices, and
            the results to match.
          </p>
        </div>

        {sent ? (
          <div className="mx-auto mt-14 max-w-xl text-center">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-signal/15">
              <Check className="h-5 w-5 text-green-dark" strokeWidth={2.5} />
            </span>

            <p className="font-display mt-5 text-[clamp(1.3rem,2.6vw,1.7rem)] leading-snug font-semibold">
              Thanks — your enquiry is on its way.
            </p>

            <p className="mt-3 text-[15px] leading-relaxed text-slate">
              We&rsquo;ve opened your mail client with the details filled in. If
              nothing happened, send it straight to{" "}
              <a
                href="mailto:hello@deckster.live"
                className="text-ink underline decoration-signal underline-offset-4"
              >
                hello@deckster.live
              </a>
              .
            </p>

            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-7 text-sm text-slate underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-signal"
            >
              Edit the details
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mx-auto mt-14 max-w-3xl md:mt-16"
          >
            <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
              <Field label="Name" invalid={invalid("name")}>
                <input
                  ref={(node) => register("name", node)}
                  value={enquiry.name}
                  onChange={update("name")}
                  placeholder="Your full name"
                  autoComplete="name"
                  className={inputClass}
                />
              </Field>

              <Field label="Brand" invalid={invalid("brand")}>
                <input
                  ref={(node) => register("brand", node)}
                  value={enquiry.brand}
                  onChange={update("brand")}
                  placeholder="Company or label"
                  autoComplete="organization"
                  className={inputClass}
                />
              </Field>

              <Field label="Email" invalid={invalid("email")}>
                <input
                  ref={(node) => register("email", node)}
                  type="email"
                  value={enquiry.email}
                  onChange={update("email")}
                  placeholder="you@brand.com"
                  autoComplete="email"
                  className={inputClass}
                />
              </Field>

              <Field label="Budget" invalid={invalid("budget")}>
                <select
                  ref={(node) => register("budget", node)}
                  value={enquiry.budget}
                  onChange={update("budget")}
                  className={`${inputClass} cursor-pointer appearance-none pr-7 ${
                    enquiry.budget ? "" : "text-slate/45"
                  }`}
                >
                  <option value="">Pick a range</option>
                  {BUDGETS.map((budget) => (
                    <option key={budget} value={budget} className="text-ink">
                      {budget}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 right-0 h-4 w-4 -translate-y-1/2 text-slate"
                  strokeWidth={1.75}
                />
              </Field>

              <Field
                label="What are you looking to achieve?"
                invalid={invalid("goal")}
                className="sm:col-span-2"
              >
                <textarea
                  ref={(node) => register("goal", node)}
                  value={enquiry.goal}
                  onChange={update("goal")}
                  rows={3}
                  placeholder="A launch, a always-on funnel, a store opening — whatever the goal, tell us in a line or two."
                  className={`${inputClass} resize-none leading-relaxed`}
                />
              </Field>
            </div>

            <div className="mt-11 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-row items-center gap-2.5 sm:gap-3">
                <button
                  type="submit"
                  className="group inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-ink px-6 py-3 text-sm font-medium whitespace-nowrap text-paper transition-colors hover:bg-green-dark"
                >
                  Get in Touch
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                  />
                </button>

                <HashLink
                  href="/#how-we-work"
                  className="inline-flex shrink-0 items-center justify-center rounded-full border border-line-strong px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors hover:bg-mist"
                >
                  Book a Call
                </HashLink>
              </div>

              <div className="text-[13px] text-slate">
                {attempted && FIELD_ORDER.some(isMissing) ? (
                  <span className="text-destructive">
                    A few fields still need filling in.
                  </span>
                ) : (
                  <a
                    href="mailto:hello@deckster.live"
                    className="inline-flex items-center gap-2 transition-colors hover:text-ink"
                  >
                    <Mail className="h-4 w-4" strokeWidth={1.75} />
                    Or just email hello@deckster.live
                  </a>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </Section>
  );
}
