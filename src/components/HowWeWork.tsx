import { Section, SectionHead } from "@/components/ui/primitives";

const steps = [
  {
    n: "01",
    t: "Brief & Discovery",
    d: "Objectives, audience and budget captured once — creators matched by audience overlap and category performance.",
  },
  {
    n: "02",
    t: "Shortlist & Negotiate",
    d: "Ranked shortlists with authenticity signals, rate benchmarks and deliverable scope agreed upfront.",
  },
  {
    n: "03",
    t: "Contract & Plan",
    d: "Terms and timelines locked in one place, with concepts and content calendars mapped per creator.",
  },
  {
    n: "04",
    t: "Execute & Track Live",
    d: "Approvals, go-live and real-time performance visible on a single shared timeline.",
  },
  {
    n: "05",
    t: "Report & Optimise",
    d: "Full results delivered, with spend and deliverables reallocated while the campaign is still running.",
  },
] as const;

export function HowWeWork() {
  return (
    <Section id="how-we-work">
      <SectionHead
        eyebrow="How we work"
        title="Five steps, one accountable thread"
        copy="No handoffs between tools or teams — the same thread runs from the first brief to the final report."
      />

      <div className="mt-14 border-t border-line">
        {steps.map((s) => (
          <div
            key={s.n}
            className="grid grid-cols-[3.5rem_1fr] items-start gap-4 border-b border-line py-7 sm:grid-cols-[5rem_minmax(0,16rem)_1fr] sm:items-center sm:gap-8 md:py-8"
          >
            <span className="font-display text-[15px] text-slate">{s.n}</span>
            <h3 className="font-display text-[18px] font-semibold sm:text-[20px]">
              {s.t}
            </h3>
            <p className="col-span-2 mt-2 max-w-lg text-[14px] leading-relaxed text-slate sm:col-span-1 sm:mt-0 sm:text-[15px]">
              {s.d}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
