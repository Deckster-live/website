import { HEAD_GAP, Section } from "@/components/ui/primitives";

const stats = [
  { value: "150+", label: "Brands" },
  { value: "1,000+", label: "Campaigns" },
  { value: "60,000+", label: "Creators" },
  { value: "15+", label: "Languages" },
] as const;

export function AboutImpact() {
  return (
    <Section id="impact" className="pt-10 md:pt-14 lg:pt-16">
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
