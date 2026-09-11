import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { CareerHero } from "@/components/careers/CareerHero";
import { WhyWorkWithUs } from "@/components/careers/WhyWorkWithUs";
import { OpenRoles } from "@/components/careers/OpenRoles";
import { Section } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Open roles at Deckster — join a small, fast-moving team building the way brands run creator marketing.",
};

export default function CareersPage() {
  return (
    <>
      <CareerHero />
      <WhyWorkWithUs />
      <OpenRoles limit={3} />

      <Section className="pt-0! pb-24! md:pb-32!">
        <div className="glow-field relative overflow-hidden rounded-4xl bg-ink px-5 py-16 text-center sm:px-10 md:py-24">
          <p className="eyebrow text-paper/60">Don&rsquo;t see your role?</p>
          <h2 className="font-display mx-auto mt-4 max-w-xl text-[clamp(1.85rem,4.6vw,3rem)] leading-tight font-semibold text-paper">
            We&rsquo;re always open to meeting good people
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-paper/70">
            If none of the open roles fit but you think you&rsquo;d be a good
            addition to the team, send us a note anyway.
          </p>
          <div className="mt-9 flex flex-row items-center justify-center gap-2.5 sm:gap-3">
            <a
              href="mailto:hello@deckster.live"
              className="inline-flex w-auto shrink-0 items-center justify-center gap-1.5 rounded-full bg-paper px-6 py-3 text-sm font-medium whitespace-nowrap text-ink transition-opacity hover:opacity-85"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
