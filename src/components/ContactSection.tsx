import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/primitives";

export function ContactSection() {
  return (
    <Section id="cta" className="pb-24! md:pb-32!">
      <div className="glow-field relative overflow-hidden rounded-4xl bg-ink px-6 py-16 text-center sm:px-10 md:py-24">
        <p className="eyebrow text-paper/60">Let&rsquo;s work together</p>
        <h2 className="font-display mx-auto mt-4 max-w-xl text-[clamp(1.85rem,4.6vw,3rem)] font-semibold leading-[1.08] text-paper">
          Bring your next campaign to a place built for it
        </h2>
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-paper/70">
          Tell us about your brand and goals — we&rsquo;ll get back with a
          shortlist and a plan within days, not weeks.
        </p>
        <div className="mt-9 flex items-center justify-center gap-3 flex-row">
          <a
            href="mailto:hello@deckster.live"
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-85 sm:w-auto"
          >
            Get in touch
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </a>
          <a
            href="#solutions"
            className="inline-flex w-full items-center justify-center rounded-full border border-paper/25 px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-paper/10 sm:w-auto"
          >
            See how it works
          </a>
        </div>
      </div>
    </Section>
  );
}
