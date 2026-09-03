"use client";

import { motion } from "framer-motion";
import {
  Radar,
  Handshake,
  Repeat2,
  Building2,
  MessagesSquare,
  PenTool,
  BadgeCheck,
  Activity,
  FileBarChart,
} from "lucide-react";
import { SectionHead } from "@/components/ui/primitives";

const services = [
  {
    icon: Radar,
    t: "Creator discovery & partnerships",
    d: "Match creators to objectives using audience and performance signals.",
  },
  {
    icon: Handshake,
    t: "Smart negotiations",
    d: "Rate benchmarks and scope clarity before terms are ever agreed.",
  },
  {
    icon: Repeat2,
    t: "Barter campaigns",
    d: "Product-led collaborations tracked with the same rigour as paid.",
  },
  {
    icon: Building2,
    t: "Talent agency connections",
    d: "Direct routes into managed talent rosters, without cold outreach.",
  },
  {
    icon: MessagesSquare,
    t: "Single point of contact",
    d: "One accountable person across every collaboration, always.",
  },
  {
    icon: PenTool,
    t: "Creative support",
    d: "Hooks, scripts and formats shaped around what actually performs.",
  },
  {
    icon: BadgeCheck,
    t: "Campaign management",
    d: "Approvals, timelines and deliverables kept on schedule.",
  },
  {
    icon: Activity,
    t: "Live performance tracking",
    d: "Delivery and engagement visible while the campaign runs.",
  },
  {
    icon: FileBarChart,
    t: "Comprehensive reports",
    d: "Campaign, creator and content level results in one place.",
  },
] as const;

export function ServicesTimeline() {
  return (
    <section id="services" className="px-5 py-20 md:px-8 md:py-28 lg:py-36">
      <div className="mx-auto max-w-310">
        <SectionHead
          eyebrow="What we cover"
          title="Everything a campaign needs, under one roof"
          align="center"
        />

        <div className="relative mt-16 md:mt-20">
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-6 w-px bg-line md:left-1/2 md:-translate-x-1/2"
          />

          <div className="flex flex-col gap-16 md:gap-14">
            {services.map((s, i) => {
              const isRight = i % 2 === 1;
              return (
                <motion.div
                  key={s.t}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`surface relative flex items-start gap-5 rounded-2xl p-5 pl-16 md:w-[calc(40%-1rem)] md:gap-6 md:p-6 md:pl-0 ${
                    isRight
                      ? "md:ml-auto md:flex-row md:pl-10"
                      : "md:mr-auto md:flex-row-reverse md:pr-10 md:text-right"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute top-1 left-3 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-signal bg-paper md:top-2 ${
                      isRight
                        ? "md:-left-3 md:-translate-x-1/2"
                        : "md:left-auto md:-right-3 md:translate-x-1/2"
                    }`}
                  />

                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-mist">
                    <s.icon
                      className="h-6 w-6 text-green-dark"
                      strokeWidth={1.5}
                    />
                  </span>

                  <div>
                    <h3 className="font-display text-[16px] font-semibold md:text-[17px]">
                      {s.t}
                    </h3>
                    <p className="mt-1.5 max-w-sm text-[13.5px] leading-relaxed text-slate md:text-[14px]">
                      {s.d}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
