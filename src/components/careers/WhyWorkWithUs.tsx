import { SectionHead } from "@/components/ui/primitives";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import Image from "next/image";

/**
 * Four bespoke cards rather than one data-driven tile — each has a
 * genuinely different anatomy (full-bleed photo, plain color, a photo
 * peeking in from the side), so forcing them through one shared
 * "variant" prop would fight the design more than it would save code.
 */

function OwnershipCard({ className }: { className?: string }) {
  return (
    <div
      className={`relative flex min-h-64 flex-col justify-end overflow-hidden rounded-3xl p-6 md:min-h-72 md:p-7 ${className ?? ""}`}
      style={{ background: "oklch(0.3133 0.0413 180.37)" }}
    >
      <Image
        src="/images/careers/working.png"
        fill
        alt=""
        className="object-cover object-top"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

      <div className="relative">
        <p className="font-display text-lg font-semibold text-paper">
          Ownership from day one
        </p>
        <p className="mt-1.5 max-w-xs text-[13.5px] leading-relaxed text-paper/75">
          No layers between you and the work — you&rsquo;ll own real accounts
          and real decisions early.
        </p>
      </div>
    </div>
  );
}

function NoRedTapeCard({ className }: { className?: string }) {
  return (
    <div
      className={`flex min-h-64 flex-col justify-end rounded-3xl bg-mist p-6 md:min-h-72 md:p-7 ${className ?? ""}`}
    >
      <p className="font-display text-lg font-semibold text-ink">No red tape</p>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink/70">
        A flat, fast-moving team — good ideas move without three rounds of
        sign-off.
      </p>
    </div>
  );
}

function LearnByDoingCard({ className }: { className?: string }) {
  return (
    <div
      className={`flex min-h-64 flex-col justify-end rounded-3xl p-6 md:min-h-72 md:p-7 ${className ?? ""}`}
      style={{ background: "oklch(0.7395 0.058 155.23)" }}
    >
      <p className="font-display text-lg font-semibold text-ink">
        Learn by doing
      </p>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink/70">
        You&rsquo;ll work directly with brands and creators from week one, not
        shadow someone who does.
      </p>
    </div>
  );
}

function GrowCard({ className }: { className?: string }) {
  return (
    <div
      className={`relative flex min-h-64 items-end overflow-hidden rounded-3xl bg-green-dark p-6 md:min-h-72 md:p-7 ${className ?? ""}`}
    >
      {/* Content */}
      <div className="relative z-10 w-1/2">
        <p className="font-display text-lg font-semibold text-paper">
          Grow as we grow
        </p>

        <p className="mt-1.5 text-[13.5px] leading-relaxed text-paper/75">
          We&rsquo;re early — the shape of your role today isn&rsquo;t the
          ceiling on what it becomes.
        </p>
      </div>

      {/* Image */}
      <div className="relative h-64 -mb-15 w-1/2">
        <Image
          src="/images/careers/grow.png"
          fill
          alt=""
          className="object-contain object-right"
        />
      </div>
    </div>
  );
}

export function WhyWorkWithUs() {
  return (
    <section className="relative isolate overflow-hidden px-5 py-20 md:px-8 md:py-28 lg:py-32">
      <div className="mx-auto max-w-310">
        <SectionHead
          align="center"
          eyebrow="Why Deckster"
          title="Everything that makes this a good place to build a career"
          copy="Not just a job description — here's what it actually feels like day to day."
        />

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
          <OwnershipCard className="md:col-span-2 " />
          <NoRedTapeCard className="md:col-span-1 " />
          <LearnByDoingCard className="md:col-span-1" />
          <GrowCard className="md:col-span-2" />
        </div>
      </div>
    </section>
  );
}
