import Image from "next/image";
import { Section, SectionHead } from "@/components/ui/primitives";
import { INVOICE_URL } from "@/lib/invoice";

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

        <div className="relative aspect-1400/729 w-full">
          <Image
            src="/images/team1.webp"
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
            eyebrow="Our story"
            title="Built in 2020 to take the guesswork out of creator marketing"
            copy="Too many creator campaigns still run on spreadsheets, screenshot reports and gut feel. Deckster started with a simple idea: a brand should know why each creator was picked, what the campaign is doing while it runs, and what it delivered at the end."
          />

          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate md:text-base">
            So we built one team that does it all: creator selection backed by
            data, negotiation, content approvals, amplification and live
            reporting. Today we run creator campaigns for brands like Rare
            Rabbit, Swisse, BlissClub, Mahina and Policybazaar UAE, from a
            single seeding drop to a full-funnel launch.
          </p>

          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate md:text-base">
            And because creators are half of every deal, we build for them
            too.{" "}
            <a
              href={INVOICE_URL}
              className="font-medium text-ink underline-offset-4 hover:text-green-dark hover:underline"
            >
              Deckster Invoice
            </a>{" "}
            is our free GST invoicing app for creators and talent managers.
          </p>
        </div>

        <TeamScreen />
      </div>
    </Section>
  );
}
