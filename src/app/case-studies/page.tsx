import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/primitives";
import { caseStudies, type CaseStudy } from "@/data/mockdata/case-studies";
import { jsonLd, pageMetadata, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Influencer Marketing Case Studies",
  description:
    "Creator campaigns Deckster has run for Indian and global brands, with the reach, content and results behind each one, backed by live reports.",
  path: "/case-studies",
});

function StudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group flex h-full flex-col rounded-[1.75rem] border border-line bg-card p-2.5 transition duration-300 hover:-translate-y-1 hover:border-green-dark/40 hover:shadow-(--shadow-soft)"
    >
      {/* Logo on white: two of the logos ship with their own solid background. */}
      <div className="relative grid h-40 place-items-center rounded-[1.35rem] bg-white ring-1 ring-line">
        <span className="absolute top-3 left-3 rounded-full bg-mist px-3 py-1 text-[11.5px] font-medium text-ink/75">
          {study.tab}
        </span>
        {/* Plain <img>: one logo is an SVG, and these are small static files. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={study.brand_logo}
          alt={`${study.brand} logo`}
          className="h-12 w-auto max-w-[60%] object-contain transition-transform duration-500 group-hover:scale-105"
          style={
            study.logo_scale
              ? { height: `${3 * study.logo_scale}rem` }
              : undefined
          }
        />
      </div>

      <div className="flex flex-1 flex-col px-3.5 pt-5 pb-3.5">
        <h2 className="text-[13px] font-medium tracking-wide text-slate uppercase">
          {study.brand}
        </h2>
        <p className="font-display mt-2 text-[2.1rem] leading-none font-semibold tracking-[-0.02em] text-green-dark">
          {study.usp_metric}
        </p>
        <p className="mt-2 text-[15px] leading-snug font-medium text-ink">
          {study.usp}
        </p>
        <p className="mt-3 line-clamp-3 flex-1 text-[14px] leading-relaxed text-slate">
          {study.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
          <span className="text-[14px] font-medium text-ink">
            Read the case study
          </span>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line-strong transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Hub for every case study. It reads the same data as the study pages, so new studies list themselves. */
export default function CaseStudiesPage() {
  const url = `${SITE_URL}/case-studies`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Influencer Marketing Case Studies",
      url,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: caseStudies.map((study, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}/case-studies/${study.slug}`,
          name: `${study.brand} case study`,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Case Studies", item: url },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(structuredData)}
      />

      <section className="relative isolate overflow-hidden">
        {/* CSS background, so the headline (not this painting) is the LCP element. */}
        <div aria-hidden className="absolute inset-0 -z-10">
          {/* Watercolour waves, turned landscape and muted so the text stays the focus. */}
          <div className="absolute inset-0 bg-[url(/images/waves-bg.webp)] bg-cover bg-center" />
          {/* Light paper glow behind the text keeps it readable over the waves. */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_45%,var(--paper)_20%,transparent_75%)] opacity-80" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-b from-transparent to-paper" />
        </div>

        <div className="relative px-5 pt-32 pb-28 md:px-8 md:pt-44 md:pb-40">
          <div className="animate-rise mx-auto max-w-3xl text-center">
            <p className="eyebrow">Case studies</p>
            <h1 className="font-display mt-5 text-[clamp(2.1rem,6vw,3.85rem)] leading-[1.06] font-semibold">
              Influencer campaigns, and the numbers they delivered
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-ink/75 md:text-lg">
              Real briefs from real brands. Every result here comes from a
              live campaign report pulled from the platforms, not a slide
              built after the fact.
            </p>
          </div>
        </div>
      </section>

      <Section className="pt-6 md:pt-10 lg:pt-12">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <li key={study.slug}>
              <StudyCard study={study} />
            </li>
          ))}

          {/* Closes the grid with the next step instead of an empty cell. */}
          <li>
            <div className="glow-field relative flex h-full min-h-80 flex-col justify-between overflow-hidden rounded-[1.75rem] bg-ink p-7 text-paper">
              <div>
                <p className="eyebrow text-paper/55">Your brand next?</p>
                <p className="font-display mt-4 text-[1.7rem] leading-tight font-semibold">
                  Let&rsquo;s write your case study together
                </p>
                <p className="mt-3 text-[14.5px] leading-relaxed text-paper/70">
                  Tell us the goal and the budget. We&rsquo;ll come back with a
                  creator shortlist and a plan.
                </p>
              </div>
              <Link
                href="/contact"
                className="mt-8 inline-flex w-fit items-center gap-1.5 rounded-full bg-paper px-5 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-85"
              >
                Start a brief
                <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </div>
          </li>
        </ul>
      </Section>
    </>
  );
}
