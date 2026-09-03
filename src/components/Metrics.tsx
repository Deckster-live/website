import { Section } from "@/components/ui/primitives";

const stats = [
  { label: "Reach", value: "94.8M", sub: "Views in a single campaign" },
  { label: "Scale", value: "500+", sub: "Campaigns executed" },
  { label: "Network", value: "10K+", sub: "Creators onboarded" },
  { label: "Trust", value: "20+", sub: "Brand partners" },
] as const;

export function Metrics() {
  return (
    <Section className="py-7! md:py-10!">
      <div className="surface-float flex flex-col items-center justify-center rounded-xl">
        <h1 className="mx-auto mt-6 text-center text-[20px] font-bold md:text-[50px]">
          Numbers say a lot about us
        </h1>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 rounded-3xl px-6 py-10 text-center sm:px-10 sm:py-12 md:grid-cols-4 md:gap-x-8 md:px-14 md:py-14">
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
