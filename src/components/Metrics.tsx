import { HEAD_GAP, Section } from "@/components/ui/primitives";

const stats = [
  { label: "Reach", value: "1B+", sub: "Audience size" },
  { label: "Scale", value: "300+", sub: "Campaigns executed" },
  { label: "Network", value: "15K+", sub: "Creators activated" },
  { label: "Trust", value: "50+", sub: "Brand partners" },
] as const;

export function Metrics() {
  return (
    <Section>
      <div className="surface-float rounded-3xl px-6 py-10 sm:px-10 sm:py-12 md:px-14 md:py-14">
        <h2 className="font-display mx-auto max-w-2xl text-center text-[clamp(1.7rem,4.2vw,2.85rem)] leading-[1.08] font-semibold">
          Numbers that do the talking
        </h2>

        <div
          className={`grid grid-cols-2 gap-x-6 gap-y-10 text-center md:grid-cols-4 md:gap-x-8 ${HEAD_GAP}`}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`relative min-w-0 ${
                i > 0
                  ? "before:absolute before:top-1 before:bottom-1 before:-left-3 before:hidden before:w-px before:bg-line md:before:block md:before:-left-4"
                  : ""
              }`}
            >
              <p className="eyebrow text-signal font-bold text-[14px]">
                {s.label}
              </p>
              <p className="font-display mt-3 text-[clamp(2rem,5vw,3rem)] leading-none font-semibold tracking-[-0.02em]">
                {s.value}
              </p>
              <p className="mt-2 text-[13px] text-slate md:text-sm">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
