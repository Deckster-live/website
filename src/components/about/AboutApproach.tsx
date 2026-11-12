import Image from "next/image";
import { Section, SectionHead } from "@/components/ui/primitives";

export function AboutApproach() {
  return (
    <Section id="approach">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <SectionHead
            eyebrow="How we operate"
            title="Every campaign runs as a system"
            copy="Before a single post goes live, every brief runs through the same seven filters: platform, category, audience data and quality, content quality, logistics, past campaign performance and budget fit."
          />
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate md:text-base">
            Then one team handles negotiation, content approvals, publishing
            and paid amplification, and you follow the results in a live
            report pulled from the platforms, not pasted into a deck. The
            outcome is a process you can repeat, not a campaign you hope works.
          </p>
        </div>
        <div className="relative aspect-1120/958 w-full overflow-hidden rounded-2xl">
          <Image
            src="/images/about.webp"
            alt="The filters every Deckster campaign runs through before it goes live"
            fill
            sizes="(min-width: 768px) 46vw, 92vw"
            className="object-cover"
          />
        </div>
      </div>
    </Section>
  );
}
