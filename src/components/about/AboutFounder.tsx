import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { HEAD_GAP, Section, SectionHead } from "@/components/ui/primitives";
import { INVOICE_URL } from "@/lib/invoice";
import { FOUNDER } from "@/lib/site";

/**
 * Outlets for the "Featured in" strip, each linking to its latest piece.
 * An outlet without a `logo` file renders as its name until one is added.
 */
const OUTLETS: {
  name: string;
  url: string;
  logo?: { src: string; width: number; height: number; className: string };
}[] = [
  {
    name: "Storyboard18",
    url: FOUNDER.press[0].url,
    logo: { src: "/images/press/storyboard18.svg", width: 149, height: 60, className: "h-8" },
  },
  {
    name: "Moneycontrol",
    url: FOUNDER.press[4].url,
    logo: { src: "/images/press/moneycontrol.webp", width: 286, height: 60, className: "h-5" },
  },
  {
    name: "NDTV Profit",
    url: FOUNDER.press[3].url,
    logo: { src: "/images/press/ndtv-profit.webp", width: 220, height: 120, className: "h-9" },
  },
];

/**
 * Background-removed portrait with a white sticker outline baked into the
 * image, on a brand-green panel. Falls back to initials if no photo is set.
 */
function Portrait() {
  return (
    <div className="relative mx-auto aspect-4/5 w-full max-w-80 overflow-hidden rounded-[2rem] lg:max-w-none bg-[radial-gradient(ellipse_80%_70%_at_50%_35%,var(--green-peacock),var(--green-dark)_55%,var(--green-darkest))] md:mx-0">
      {FOUNDER.photo ? (
        <Image
          src={FOUNDER.photo}
          alt={`${FOUNDER.name}, founder of Deckster`}
          fill
          sizes="(min-width: 1024px) 24rem, 20rem"
          className="object-contain object-bottom"
        />
      ) : (
        <span className="font-display grid h-full w-full place-items-center text-6xl font-semibold text-paper">
          SA
        </span>
      )}
    </div>
  );
}

export function AboutFounder() {
  return (
    <Section id="founder">
      <SectionHead eyebrow="Founder" title="A note from our founder" />

      <div
        className={`grid gap-12 lg:grid-cols-[24rem_1fr] lg:items-center lg:gap-16 ${HEAD_GAP}`}
      >
        <Portrait />

        <div>
          <h3 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold">
            {FOUNDER.name}
          </h3>
          <p className="mt-1 text-[15px] text-green-dark">{FOUNDER.role}</p>

          <div className="mt-6 max-w-2xl space-y-4 text-[15px] leading-relaxed text-slate md:text-base">
            <p>
              I started Deckster in 2020 to help brands tell their stories
              through creators. Six years on, I&apos;ve spent more hours than I
              can count behind the scenes: briefing, negotiating, reviewing,
              re-reviewing. What it taught me is that good creator marketing
              isn&apos;t luck. It&apos;s choosing creators on real audience
              data, running the work properly and being honest about what it
              delivered. That&apos;s the whole job here.
            </p>
            <p>
              It also taught me to respect the other side of the table.
              Creators who do well become businesses, and the invoices,
              payment follow-ups and usage rights that come with it eat into
              the time they should spend creating. So we built{" "}
              <a
                href={INVOICE_URL}
                className="font-medium text-ink underline decoration-line underline-offset-4 hover:text-green-dark"
              >
                Deckster Invoice
              </a>{" "}
              to take that off their plate.
            </p>
          </div>

          {/* Pull quote, from his own posts on why Deckster works the way it does */}
          <p className="font-display mt-7 max-w-2xl border-l-2 border-signal pl-4 text-lg leading-snug font-medium text-ink">
            &ldquo;Most influencer marketing numbers are fiction. The deck
            almost never matches what actually happened.&rdquo;
          </p>

          <a
            href={FOUNDER.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1 text-[15px] font-medium text-green-dark transition-colors hover:text-ink"
          >
            Message me on LinkedIn
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </a>

          {/* Press credibility at a glance; the full list sits below */}
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <span className="eyebrow">Featured in</span>
            {OUTLETS.map((outlet) => (
              <a
                key={outlet.name}
                href={outlet.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${FOUNDER.name} in ${outlet.name}`}
                className="opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
              >
                {outlet.logo ? (
                  // Plain <img>: tiny static logos gain nothing from next/image.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={outlet.logo.src}
                    alt={outlet.name}
                    width={outlet.logo.width}
                    height={outlet.logo.height}
                    className={`${outlet.logo.className} w-auto`}
                  />
                ) : (
                  <span className="font-display text-lg font-bold tracking-tight text-ink">
                    {outlet.name}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Full width under both columns, as compact cards, to keep the section short */}
      <h4 className="eyebrow mt-12">In the press</h4>
      {/* Phones: one swipeable row. Larger screens: a 2–3 column grid. */}
      <ul className="-mx-5 mt-4 flex snap-x scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
        {FOUNDER.press.map((item) => (
          <li key={item.url} className="w-[78%] shrink-0 snap-start sm:w-auto">

            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full items-start justify-between gap-3 rounded-2xl border border-line px-4 py-3 transition-colors hover:border-green-dark"
            >
              <span>
                <span className="block text-[12px] text-slate">
                  {item.outlet} · {item.date}
                </span>
                <span className="mt-1 line-clamp-2 text-[14px] leading-snug font-medium text-ink group-hover:text-green-dark">
                  {item.title}
                </span>
              </span>
              <ArrowUpRight
                className="mt-0.5 h-4 w-4 shrink-0 text-slate transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
