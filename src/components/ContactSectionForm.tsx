"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import { BUDGETS, GOALS } from "@/components/ContactSection";
import { Section } from "@/components/ui/primitives";
import { trackEvent } from "@/lib/analytics";
import { EMAIL_ADDRESS, EMAIL_HREF, WHATSAPP_HREF } from "@/lib/contact";
import { submitBrief } from "@/lib/googleSheets";
import { SOCIAL_PROFILES } from "@/lib/site";

const FIELD_ORDER = [
  "name",
  "brand",
  "email",
  "phone",
  "goal",
  "budget",
  "details",
] as const;

type FieldName = (typeof FIELD_ORDER)[number];
type Enquiry = Record<FieldName, string>;

const EMPTY: Enquiry = {
  name: "",
  brand: "",
  email: "",
  phone: "",
  goal: "",
  budget: "",
  details: "",
};

const OPTIONAL: readonly FieldName[] = ["phone", "details"];

const SOCIALS = [
  { icon: IconBrandInstagram, label: "Instagram", href: SOCIAL_PROFILES[0] },
  { icon: IconBrandLinkedin, label: "LinkedIn", href: SOCIAL_PROFILES[1] },
  { icon: IconBrandWhatsapp, label: "WhatsApp", href: WHATSAPP_HREF },
] as const;

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

/** The shared option lists are sentence fragments; capitalise them for a dropdown. */
const cap = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

/** Rounded, bordered box; turns signal-green on focus and red when missing. */
const boxClass = (invalid: boolean) =>
  `w-full rounded-xl border bg-card px-4 py-3.5 text-[15px] text-ink outline-none transition-colors placeholder:text-slate/55 focus:border-green-dark focus:ring-3 focus:ring-signal/20 ${
    invalid ? "border-destructive" : "border-line-strong"
  }`;

/**
 * Brief form for /contact. It posts to the same Google Sheet, with the same
 * columns and option values, as the homepage's ContactSection.
 */
export function ContactSectionForm() {
  const [enquiry, setEnquiry] = useState<Enquiry>(EMPTY);
  const [attempted, setAttempted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const fields = useRef(new Map<FieldName, HTMLElement>());

  const register = (name: FieldName) => (node: HTMLElement | null) => {
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

  const isMissing = (name: FieldName) => {
    if (OPTIONAL.includes(name)) return false;
    if (name === "email") return !isEmail(enquiry.email.trim());
    return enquiry[name].trim().length === 0;
  };

  const invalid = (name: FieldName) => attempted && isMissing(name);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setAttempted(true);

    const firstMissing = FIELD_ORDER.find(isMissing);

    if (firstMissing) {
      fields.current.get(firstMissing)?.focus();
      return;
    }

    setSending(true);

    try {
      // Same columns as the homepage brief, so both land in one sheet.
      await submitBrief({
        Name: enquiry.name,
        Brand: enquiry.brand,
        Goal: enquiry.goal,
        Range: enquiry.budget,
        Email: enquiry.email,
        Phone: enquiry.phone,
        AdditionalRequirement: enquiry.details,
      });
      trackEvent("generate_lead", {
        form: "brief_fields",
        page: window.location.pathname,
        budget: enquiry.budget,
      });
    } finally {
      setSending(false);
    }

    setSent(true);
  };

  /** Text input with a screen-reader label; the placeholder is the visible label. */
  const input = (
    name: FieldName,
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement> = {},
  ) => (
    <label className="block">
      <span className="sr-only">{label}</span>
      <input
        ref={register(name)}
        value={enquiry[name]}
        onChange={update(name)}
        placeholder={label}
        aria-invalid={invalid(name) || undefined}
        className={boxClass(invalid(name))}
        {...props}
      />
    </label>
  );

  const select = (
    name: FieldName,
    label: string,
    options: readonly string[],
  ) => (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <select
        ref={register(name)}
        value={enquiry[name]}
        onChange={update(name)}
        aria-invalid={invalid(name) || undefined}
        className={`${boxClass(invalid(name))} cursor-pointer appearance-none pr-10 ${
          enquiry[name] ? "" : "text-slate/55"
        }`}
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option} value={option} className="text-ink">
            {cap(option)}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-slate"
        strokeWidth={1.75}
      />
    </label>
  );

  return (
    <Section id="cta">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-[clamp(1.85rem,4.6vw,3rem)] leading-[1.06] font-semibold">
          Get in touch
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-slate md:text-base">
          Share the goal and the budget. We&rsquo;ll come back with a creator
          shortlist, a plan and an honest view of what that budget can do.
        </p>
      </div>

      {sent ? (
        <div className="mx-auto mt-12 max-w-xl text-center" role="status">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-signal/15">
            <Check className="h-5 w-5 text-green-dark" strokeWidth={2.5} />
          </span>
          <p className="font-display mt-5 text-[clamp(1.3rem,2.6vw,1.7rem)] leading-snug font-semibold">
            Thanks, your brief is with us.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-slate">
            We&rsquo;ll come back with a creator shortlist and a plan. Anything
            to add? Write to{" "}
            <a
              href={EMAIL_HREF}
              className="text-ink underline decoration-signal underline-offset-4"
            >
              {EMAIL_ADDRESS}
            </a>
            .
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto mt-10 max-w-3xl md:mt-12"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {input("name", "Name", { autoComplete: "name" })}
            {input("brand", "Brand", { autoComplete: "organization" })}
            {input("email", "Email", { type: "email", autoComplete: "email" })}
            {input("phone", "Phone (optional)", {
              type: "tel",
              autoComplete: "tel",
            })}
            {select("goal", "What's the goal?", GOALS)}
            {select("budget", "Budget range", BUDGETS)}
            <label className="block sm:col-span-2">
              <span className="sr-only">Anything else (optional)</span>
              <textarea
                ref={register("details")}
                value={enquiry.details}
                onChange={update("details")}
                rows={5}
                placeholder="Anything else? Timelines, platforms, creators you like (optional)"
                className={`${boxClass(false)} resize-y leading-relaxed`}
              />
            </label>
          </div>

          <div className="mt-7 flex flex-col items-center gap-3">
            <button
              type="submit"
              disabled={sending}
              className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-ink px-8 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-green-dark disabled:opacity-60"
            >
              {sending ? "Sending…" : "Send brief"}
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </button>
            {attempted && FIELD_ORDER.some(isMissing) && (
              <p className="text-[13px] text-destructive" role="alert">
                A few fields still need filling in.
              </p>
            )}
          </div>
        </form>
      )}

      <div className="mt-10 flex items-center justify-center gap-3">
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="grid h-10 w-10 place-items-center rounded-full bg-green-dark text-paper transition-colors hover:bg-ink"
          >
            <s.icon className="h-5 w-5" strokeWidth={1.5} />
          </a>
        ))}
      </div>
    </Section>
  );
}
