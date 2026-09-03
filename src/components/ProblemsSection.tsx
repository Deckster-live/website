import {
  Search,
  ShieldQuestion,
  Layers3,
  Activity,
  CreditCard,
  ChartNoAxesCombined,
} from "lucide-react";
import { Section, SectionHead } from "@/components/ui/primitives";

const problems = [
  {
    icon: Search,
    t: "Finding the right fit",
    d: "Difficulty finding relevant creators who actually align with campaign goals.",
  },
  {
    icon: ShieldQuestion,
    t: "Uncertain authenticity",
    d: "Uncertainty in vetting creators for authenticity and real performance.",
  },
  {
    icon: Layers3,
    t: "Collaboration overload",
    d: "Challenges in managing multiple collaborations across creators at once.",
  },
  {
    icon: Activity,
    t: "No real-time visibility",
    d: "Inability to track real-time performance once a campaign goes live.",
  },
  {
    icon: CreditCard,
    t: "Payment friction",
    d: "Payment delays or complications when working with several creators.",
  },
  {
    icon: ChartNoAxesCombined,
    t: "Scattered reporting",
    d: "Campaign results spread across disconnected tools and spreadsheets.",
  },
] as const;

export function ProblemsSection() {
  return (
    <Section id="problems">
      <SectionHead
        eyebrow="The reality today"
        title="Working with creators shouldn't feel this hard"
        copy="Brands run into the same friction, campaign after campaign — before results even enter the picture."
      />

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {problems.map((p) => (
          <div
            key={p.t}
            className="bg-white group cursor-default rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-(--shadow-float) md:p-7"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-mist transition-colors duration-300 group-hover:bg-signal/12">
              <p.icon
                className="h-5 w-5 text-slate transition-colors duration-300 group-hover:text-green-dark"
                strokeWidth={1.6}
              />
            </span>
            <h3 className="font-display mt-5 text-[17px] font-semibold">
              {p.t}
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-slate">{p.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
