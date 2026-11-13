import { HEAD_GAP, Section } from "@/components/ui/primitives";
import { STATS } from "@/lib/stats";

const stats = [
  { value: STATS.brands, label: "Brands" },
  { value: STATS.campaigns, label: "Campaigns" },
  { value: STATS.creatorNetwork, label: "Creators in our network" },
  { value: STATS.languages, label: "Languages" },
] as const;

export function AboutImpact() {
  return (
    <Section id="impact">
      <h2 className="font-display mx-auto max-w-2xl text-center text-[clamp(1.7rem,4.2vw,2.85rem)] leading-[1.08] font-semibold">
        Where we stand today
      </h2>

      <div
        className={`grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5 ${HEAD_GAP}`}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl bg-card px-6 py-10 text-center md:py-12"
          >
            <p className="font-display text-[clamp(2rem,5vw,3rem)] leading-none font-semibold tracking-[-0.02em]">
              {stat.value}
            </p>
            <p className="mt-2 text-[13px] text-slate md:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
