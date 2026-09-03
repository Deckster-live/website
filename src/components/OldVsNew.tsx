import { Check, X } from "lucide-react";
import { Section } from "@/components/ui/primitives";

const oldWay = [
  "Slow, manual searches across platforms",
  "No way to verify real performance",
  "Same approach for every brand and budget",
  "Little trust between brand and creator",
];

const newWay = [
  "Instant, matched creator discovery",
  "Vetted authenticity and performance data",
  "Partnerships shaped around your goals",
  "Built-in trust, from first contact to payout",
];

export function OldVsNew() {
  return (
    <Section id="old-vs-new">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">The old way vs. the new way</p>
        <h2 className="mt-4 text-[clamp(1.85rem,4.6vw,3.15rem)] font-semibold leading-[1.06]">
          A smarter way to work with creators
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-slate md:text-base">
          See how we simplify the process, so you can focus on partnerships
          that actually move the needle.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <div className="rounded-[2rem] border border-line bg-mist/60 p-8 md:p-10">
          <h3 className="font-display text-2xl font-semibold text-slate italic">
            Old Way
          </h3>
          <ul className="mt-8 space-y-5">
            {oldWay.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <X
                  className="mt-0.5 h-4 w-4 shrink-0 text-slate"
                  strokeWidth={1.75}
                />
                <span className="text-[14.5px] leading-relaxed text-slate md:text-[15px]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[2rem] bg-signal/12 p-8 md:p-10">
          <h3 className="font-display text-2xl font-semibold text-green-dark italic">
            New Way
          </h3>
          <ul className="mt-8 space-y-5">
            {newWay.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-green-dark"
                  strokeWidth={2}
                />
                <span className="text-[14.5px] leading-relaxed text-ink md:text-[15px]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
