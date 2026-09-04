import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/primitives";

export function ContactSection() {
  return (
    <Section id="cta" className="pt-0! pb-24! md:pb-32!">
      <div className="glow-field relative overflow-hidden rounded-4xl bg-ink px-5 py-16 text-center sm:px-10 md:py-24">
        <p className="eyebrow text-paper/60">Let&rsquo;s work together</p>
        <h2 className="font-display mx-auto mt-4 max-w-xl text-[clamp(1.85rem,4.6vw,3rem)] font-semibold leading-tight text-paper">
          Bring your next campaign to a place built for it
        </h2>
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-paper/70">
          Tell us about your brand and goals — we&rsquo;ll get back with a
          shortlist and a plan within days, not weeks.
        </p>
        <div className="mt-9 flex flex-row items-center justify-center gap-2.5 sm:gap-3">
          <a
            href="mailto:hello@deckster.live"
            className="inline-flex w-auto shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-paper px-4 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-85 sm:px-6"
          >
            Get in touch
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </a>

          <a
            href="#how-we-work"
            className="inline-flex w-auto shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-paper/25 px-4 py-3 text-sm font-medium text-paper transition-colors hover:bg-paper/10 sm:px-6"
          >
            How it works
          </a>
        </div>
        <p className="absolute right-5 bottom-0 font-sans md:text-[110px] text-6xl font-semibold tracking-[-0.04em] text-transparent bg-clip-text bg-linear-to-b from-paper/25 to-transparent">
          deckster<span className="text-signal/50">.</span>
        </p>
      </div>
    </Section>
  );
}
