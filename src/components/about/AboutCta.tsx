import { HashLink } from "@/components/ui/HashLink";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/primitives";
import Link from "next/link";

export function AboutCta() {
  return (
    <Section id="cta">
      <div className="glow-field relative overflow-hidden rounded-4xl bg-ink px-5 py-16 text-center sm:px-10 md:py-24">
        <p className="eyebrow text-paper/60">Get in touch</p>
        <h2 className="font-display mx-auto mt-4 max-w-xl text-[clamp(1.85rem,4.6vw,3rem)] leading-tight font-semibold text-paper">
          Let&rsquo;s find the creators your customers already trust
        </h2>
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-paper/70">
          Tell us the goal and the budget. We&rsquo;ll come back with a creator
          shortlist, a plan, and an honest view of what that budget can do.
        </p>
        <div className="mt-9 flex flex-row items-center justify-center gap-2.5 sm:gap-3">
          <Link
            href="/contact"
            className="inline-flex w-auto shrink-0 items-center justify-center gap-1.5 rounded-full bg-paper px-4 py-3 text-sm font-medium whitespace-nowrap text-ink transition-opacity hover:opacity-85 sm:px-6"
          >
            Start a brief
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
        <p className="absolute right-5 bottom-0 font-sans text-6xl font-semibold tracking-[-0.04em] text-transparent bg-linear-to-b from-paper/25 to-transparent bg-clip-text md:text-[110px]">
          deckster<span className="text-signal/50">.</span>
        </p>
      </div>
    </Section>
  );
}
