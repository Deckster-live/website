"use client";

import { useState } from "react";
import { FAQS } from "@/data/faqs";
import { HashLink } from "@/components/ui/HashLink";
import { ArrowUpRight, Plus } from "lucide-react";
import { HEAD_GAP, Section, SectionHead } from "@/components/ui/primitives";

export function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <Section id="faq" className="py-0!">
      <SectionHead
        align="center"
        eyebrow="FAQ"
        title="Questions brands ask us"
        copy="The short answers. The longer ones usually happen on a call."
      />

      <ul
        className={`mx-auto max-w-3xl overflow-hidden rounded-3xl border border-line bg-card shadow-(--shadow-soft) ${HEAD_GAP}`}
      >
        {FAQS.map((faq, index) => {
          const isOpen = index === open;

          return (
            <li key={faq.q} className="border-b border-line last:border-b-0">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  className="group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-mist/50 focus-visible:bg-mist/50 focus-visible:outline-none sm:gap-6 sm:px-7 sm:py-5"
                >
                  <span
                    className={`font-sans flex-1 text-[15px] leading-snug font-medium transition-colors duration-300 sm:text-[16px] ${
                      isOpen ? "text-ink" : "text-slate group-hover:text-ink"
                    }`}
                  >
                    {faq.q}
                  </span>

                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                      isOpen
                        ? "border-signal/45 bg-signal/12 text-green-dark"
                        : "border-line bg-mist text-slate group-hover:border-line-strong"
                    }`}
                  >
                    <Plus
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      strokeWidth={2}
                    />
                  </span>
                </button>
              </h3>

              {/* Every answer stays in the HTML (crawlers and AI engines read
                  it); closed ones collapse to 0fr and are made inert. */}
              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                inert={!isOpen}
                className={`grid transition-[grid-template-rows,opacity] duration-[340ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-[14.5px] leading-relaxed text-slate sm:px-7 sm:pb-6 sm:text-[15px] sm:pr-20">
                    {faq.a}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-8 text-center text-[14px] text-slate">
        Still have a question?{" "}
        <HashLink
          href="/#cta"
          className="group inline-flex items-center gap-1 font-medium text-ink transition-colors hover:text-green-dark"
        >
          Send us the brief
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
          />
        </HashLink>
      </p>
    </Section>
  );
}
