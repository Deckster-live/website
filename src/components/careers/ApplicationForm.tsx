"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Check, ChevronDown, Mail } from "lucide-react";
import type { CareerRole } from "@/data/mockdata/careers";
import { submitApplication } from "@/lib/googleSheets";

const EDUCATION_OPTIONS = [
  "High School",
  "Diploma",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Other",
] as const;

const EXPERIENCE_OPTIONS = [
  "Fresher",
  "0–1 years",
  "1–3 years",
  "3–5 years",
  "5–8 years",
  "8+ years",
] as const;

const NOTICE_PERIOD_OPTIONS = [
  "Immediate",
  "15 days",
  "30 days",
  "45 days",
  "60 days",
  "90 days",
  "Currently serving notice",
] as const;

const FIELD_ORDER = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "education",
  "specialisation",
  "experience",
  "ctc",
  "expected",
  "noticePeriod",
  "resumeLink",
  "coverLetter",
  "portfolioLink",
  "linkedin",
  "whyJoin",
] as const;

type FieldName = (typeof FIELD_ORDER)[number];
type Application = Record<FieldName, string>;

const EMPTY: Application = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  education: "",
  experience: "",
  ctc: "",
  expected: "",
  noticePeriod: "",
  resumeLink: "",
  coverLetter: "",
  portfolioLink: "",
  linkedin: "",
  whyJoin: "",
  specialisation: "",
};

const OPTIONAL: readonly FieldName[] = ["ctc", "coverLetter", "linkedin"];

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

interface FieldProps {
  label: string;
  invalid: boolean;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}

function Field({
  label,
  invalid,
  optional,
  className = "",
  children,
}: FieldProps) {
  return (
    <label className={`group block ${className}`}>
      <span className="eyebrow block">
        {label}
        {optional && <span className="text-slate/50"> · optional</span>}
      </span>

      <span
        className={`relative mt-2.5 block border-b transition-colors ${
          invalid ? "border-destructive" : "border-line-strong"
        }`}
      >
        {children}
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

interface SelectFieldProps {
  name: FieldName;
  label: string;
  value: string;
  options: readonly string[];
  invalid: boolean;
  register: (name: FieldName, node: HTMLElement | null) => void;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SelectField({
  name,
  label,
  value,
  options,
  invalid,
  register,
  onChange,
}: SelectFieldProps) {
  return (
    <Field label={label} invalid={invalid}>
      <select
        ref={(node) => register(name, node)}
        value={value}
        onChange={onChange}
        className={`${inputClass} cursor-pointer appearance-none pr-7 ${
          value ? "" : "text-slate/45"
        }`}
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option} value={option} className="text-ink">
            {option}
          </option>
        ))}
      </select>

      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-0 h-4 w-4 -translate-y-1/2 text-slate"
        strokeWidth={1.75}
      />
    </Field>
  );
}

interface ApplicationFormProps {
  role: CareerRole;
  onSentChange?: (sent: boolean) => void;
}

export function ApplicationForm({ role, onSentChange }: ApplicationFormProps) {
  const [application, setApplication] = useState<Application>(EMPTY);
  const [attempted, setAttempted] = useState(false);
  const [sending, setSending] = useState(false);
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
      setApplication((previous) => ({
        ...previous,
        [name]: event.target.value,
      }));

  const isMissing = (name: FieldName) => {
    if (OPTIONAL.includes(name)) return false;
    if (name === "email") return !isEmail(application.email.trim());
    return application[name].trim().length === 0;
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
      await submitApplication({ position: role.name, ...application });
    } finally {
      setSending(false);
    }

    setSent(true);
    onSentChange?.(true);
  };

  if (sent) {
    return (
      <div className="mx-auto max-w-xl text-center">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-signal/15">
          <Check className="h-5 w-5 text-green-dark" strokeWidth={2.5} />
        </span>

        <p className="font-display mt-5 text-[clamp(1.3rem,2.6vw,1.7rem)] leading-snug font-semibold">
          Thanks — your application is on its way.
        </p>

        <p className="mt-3 text-[15px] leading-relaxed text-slate">
          We&rsquo;ve received your details and will get back to shortlisted
          candidates within a week.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto max-w-2xl">
      <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
        <Field label="First name" invalid={invalid("firstName")}>
          <input
            ref={(node) => register("firstName", node)}
            value={application.firstName}
            onChange={update("firstName")}
            placeholder="First name"
            autoComplete="given-name"
            className={inputClass}
          />
        </Field>

        <Field label="Last name" invalid={invalid("lastName")}>
          <input
            ref={(node) => register("lastName", node)}
            value={application.lastName}
            onChange={update("lastName")}
            placeholder="Last name"
            autoComplete="family-name"
            className={inputClass}
          />
        </Field>

        <Field label="Email" invalid={invalid("email")}>
          <input
            ref={(node) => register("email", node)}
            type="email"
            value={application.email}
            onChange={update("email")}
            placeholder="you@example.com"
            autoComplete="email"
            className={inputClass}
          />
        </Field>

        <Field label="Phone number" invalid={invalid("phone")}>
          <input
            ref={(node) => register("phone", node)}
            type="tel"
            value={application.phone}
            onChange={update("phone")}
            placeholder="+91 00000 00000"
            autoComplete="tel"
            className={inputClass}
          />
        </Field>

        <SelectField
          name="education"
          label="Highest education"
          value={application.education}
          options={EDUCATION_OPTIONS}
          invalid={invalid("education")}
          register={register}
          onChange={update("education")}
        />

        <Field label="Specialisation" invalid={invalid("specialisation")}>
          <input
            ref={(node) => register("specialisation", node)}
            value={application.specialisation}
            onChange={update("specialisation")}
            placeholder="What you specialise in"
            className={inputClass}
          />
        </Field>

        <SelectField
          name="experience"
          label="Experience"
          value={application.experience}
          options={EXPERIENCE_OPTIONS}
          invalid={invalid("experience")}
          register={register}
          onChange={update("experience")}
        />

        <Field label="Current CTC" invalid={invalid("ctc")} optional>
          <input
            ref={(node) => register("ctc", node)}
            value={application.ctc}
            onChange={update("ctc")}
            placeholder="e.g. ₹8 LPA"
            className={inputClass}
          />
        </Field>
        <Field label="Expected Salary" invalid={invalid("expected")} optional>
          <input
            ref={(node) => register("expected", node)}
            value={application.expected}
            onChange={update("expected")}
            placeholder="e.g. ₹8 LPA"
            className={inputClass}
          />
        </Field>
        <SelectField
          name="noticePeriod"
          label="Notice period"
          value={application.noticePeriod}
          options={NOTICE_PERIOD_OPTIONS}
          invalid={invalid("noticePeriod")}
          register={register}
          onChange={update("noticePeriod")}
        />

        <Field label="Resume link" invalid={invalid("resumeLink")}>
          <input
            ref={(node) => register("resumeLink", node)}
            value={application.resumeLink}
            onChange={update("resumeLink")}
            placeholder="Link to your resume"
            className={inputClass}
          />
        </Field>

        <Field label="Portfolio link" invalid={invalid("portfolioLink")}>
          <input
            ref={(node) => register("portfolioLink", node)}
            value={application.portfolioLink}
            onChange={update("portfolioLink")}
            placeholder="Link to your portfolio or past work"
            className={inputClass}
          />
        </Field>

        <Field label="LinkedIn profile" invalid={invalid("linkedin")} optional>
          <input
            ref={(node) => register("linkedin", node)}
            value={application.linkedin}
            onChange={update("linkedin")}
            placeholder="linkedin.com/in/you"
            className={inputClass}
          />
        </Field>

        <Field
          label="Cover letter"
          invalid={invalid("coverLetter")}
          optional
          className="sm:col-span-2"
        >
          <textarea
            ref={(node) => register("coverLetter", node)}
            value={application.coverLetter}
            onChange={update("coverLetter")}
            rows={3}
            placeholder="Anything you'd like to add alongside your resume."
            className={`${inputClass} resize-none leading-relaxed`}
          />
        </Field>

        <Field
          label="Why do you want to join us?"
          invalid={invalid("whyJoin")}
          className="sm:col-span-2"
        >
          <textarea
            ref={(node) => register("whyJoin", node)}
            value={application.whyJoin}
            onChange={update("whyJoin")}
            rows={3}
            placeholder="A line or two on why this role, and why now."
            className={`${inputClass} resize-none leading-relaxed`}
          />
        </Field>
      </div>

      <div className="mt-11 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={sending}
          className="group inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-ink px-6 py-3 text-sm font-medium whitespace-nowrap text-paper transition-colors hover:bg-green-dark disabled:opacity-60"
        >
          {sending ? "Submitting…" : "Submit application"}
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
          />
        </button>

        <div className="text-[13px] text-slate">
          {attempted && FIELD_ORDER.some(isMissing) ? (
            <span className="text-destructive">
              A few required fields still need filling in.
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
  );
}
