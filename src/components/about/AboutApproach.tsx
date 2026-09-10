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
            copy="We treat every campaign as a system, not a one-time push — built on filtering for the right platform, the right category, the right audience, and the right budget before a single piece of content goes live. From positioning and targeting to execution and optimisation, every decision has a purpose and a place within the larger strategy. That same structure runs quietly behind everything we do, creating a repeatable process that removes guesswork and keeps performance consistent — so results are driven by strategy, not accident."
          />
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
