"use client";

import { useState } from "react";
import { HashLink } from "@/components/ui/HashLink";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { HEAD_GAP, Section, SectionHead } from "@/components/ui/primitives";

const FAQS = [
  {
    q: "What does Deckster actually do?",
    a: "We run creator campaigns end to end — matching, negotiation, content approvals, paid amplification, tracking and the final report. You bring the goal and the budget; we bring the right voices, the plan, and one team accountable for the result.",
  },
  {
    q: "How do you pick the creators?",
    a: "Every brief runs through seven filters — platform, category, audience data and quality, content quality, logistics, past campaign performance and budget fit. What reaches your shortlist is already the right fit, not the most convenient name on a list.",
  },
  {
    q: "Which formats can you run?",
    a: "UGC and IGC, paid ads, creator whitelisting, always-on campaigns and podcast amplification. Most goals need a mix — pick a goal in the section above and you'll see exactly what we'd put behind it.",
  },
  {
    q: "What's the smallest budget you work with?",
    a: "We've run campaigns under ₹5L and campaigns well past ₹50L. The goal matters more than the number — tell us both and we'll say honestly whether that budget can get you there before you commit to anything.",
  },
  {
    q: "How soon can a campaign go live?",
    a: "You'll have a shortlist and a plan within days of sending the brief, not weeks. Go-live then depends on approvals and logistics — seeding waves move fastest, while paid and whitelisting need a little more lead time.",
  },
  {
    q: "How do we know it's working?",
    a: "You watch it happen. Delivery and engagement are visible while the campaign is still running, and you get campaign, creator and content level reporting at the end — pulled straight from the platform APIs, not estimated.",
  },
  {
    q: "Do you handle contracts, payments and logistics?",
    a: "Yes. Rates, contracts, product dispatch, content moderation, creator payments and reporting all sit with us, and you get a single point of contact from the first brief to the final number.",
  },
] as const;

export function FaqSection() {
  const [open, setOpen] = useState(0);
  const reduced = useReducedMotion() ?? false;

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

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="answer"
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { duration: 0.34, ease: [0.16, 1, 0.3, 1] }
                    }
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-[14.5px] leading-relaxed text-slate sm:px-7 sm:pb-6 sm:text-[15px] sm:pr-20">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
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
