import Image from "next/image";
import { Section, SectionHead } from "@/components/ui/primitives";

function TeamScreen() {
  return (
    <div className="relative mx-auto w-full sm:max-w-lg lg:mx-0 lg:max-w-none">
      <div className="surface-float overflow-hidden rounded-xl bg-ink lg:rotate-1">
        <div className="relative flex items-center px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          </div>

          <p className="absolute left-1/2 -translate-x-1/2 text-[11px] font-medium text-paper">
            Faces behind Deckster
          </p>
        </div>

        <div className="relative aspect-[1400/729] w-full">
          <Image
            src="/images/team.webp"
            alt="The Deckster team, dialled in from a video call"
            fill
            sizes="(min-width: 1024px) 44vw, (min-width: 640px) 32rem, 92vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}

export function AboutStory() {
  return (
    <Section id="who-we-are">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <div>
          <SectionHead
            eyebrow="About the company"
            title="Who we are"
            copy="Deckster is a technology-driven place for brands to plan, launch and scale influencer-led campaigns — without stitching together five different tools or teams to do it. We bring creators, data and execution into one place, so brands spend less time managing the process and more time seeing results."
          />

          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate md:text-base">
            We work across categories, budgets and formats — from a single
            seeding campaign to a full-funnel launch — with the same principle
            underneath everything: match brands with the right voices, back it
            with real data, and stay accountable for the outcome, start to
            finish.
          </p>
        </div>

        <TeamScreen />
      </div>
    </Section>
  );
}
