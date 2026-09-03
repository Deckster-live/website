import {
  Radar,
  Handshake,
  Repeat2,
  MessagesSquare,
  PenTool,
  BadgeCheck,
  Activity,
  FileBarChart,
} from "lucide-react";

const services = [
  {
    icon: Radar,
    t: "Creator Discovery & Partnerships",
    d: "Match creators to objectives using audience and performance signals.",
  },
  {
    icon: Handshake,
    t: "Smart Negotiations",
    d: "Rate benchmarks and scope clarity before terms are ever agreed.",
  },
  {
    icon: Repeat2,
    t: "Barter Campaigns",
    d: "Product-led collaborations tracked with the same rigour as paid.",
  },
  {
    icon: MessagesSquare,
    t: "Single Point of Contact",
    d: "One accountable person across every collaboration, always.",
  },
  {
    icon: PenTool,
    t: "Creative Support",
    d: "Hooks, scripts and formats shaped around what actually performs.",
  },
  {
    icon: BadgeCheck,
    t: "Campaign Management",
    d: "Approvals, timelines and deliverables kept on schedule.",
  },
  {
    icon: Activity,
    t: "Live Performance Tracking",
    d: "Delivery and engagement visible while the campaign runs.",
  },
  {
    icon: FileBarChart,
    t: "Comprehensive Reports",
    d: "Campaign, creator and content level results in one place.",
  },
] as const;

export function ServicesGrid() {
  return (
    <section
      id="services"
      className="glow-field relative overflow-hidden px-5 py-20 md:px-8 md:py-28"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in oklab, var(--green-dark) 88%, var(--paper)) 0%, var(--ink) 100%)",
      }}
    >
      <div className="relative mx-auto max-w-[1240px]">
        <h2 className="font-display max-w-xl text-[clamp(1.9rem,4.6vw,3rem)] leading-[1.1] font-medium text-paper">
          Everything you need to run creator campaigns
        </h2>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-20 md:grid-cols-4 md:gap-x-8 md:gap-y-16">
          {services.map((s) => (
            <div key={s.t}>
              <s.icon
                className="h-7 w-7 text-paper/90"
                strokeWidth={1.25}
              />
              <h3 className="font-display mt-5 text-[16px] leading-snug font-medium text-paper md:text-[17px]">
                {s.t}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-paper/60 md:text-[13.5px]">
                {s.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
