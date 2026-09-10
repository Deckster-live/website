import Link from "next/link";
import { HashLink } from "@/components/ui/HashLink";
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
} from "@tabler/icons-react";

const columns = [
  {
    heading: "Explore",
    links: [
      { label: "Overview", href: "/#top" },
      { label: "Case studies", href: "/#case-studies" },
      { label: "Use cases", href: "/#use-cases" },
      { label: "Why Deckster", href: "/#why-us" },
      { label: "How we do this", href: "/#solutions" },
    ],
  },
  {
    heading: "What we run",
    links: [
      { label: "UGC", href: "/#use-cases" },
      { label: "IGC", href: "/#use-cases" },
      { label: "Paid ads", href: "/#use-cases" },
      { label: "Whitelisting", href: "/#use-cases" },
      { label: "Podcast amplification", href: "/#use-cases" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Start a brief", href: "/#cta" },
      // { label: "Book a 20-min call", href: "/#cta" },
    ],
  },
] as const;

const socials = [
  {
    icon: IconBrandInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/decksterlive/",
  },
  {
    icon: IconBrandLinkedin,
    label: "LinkedIn",
    href: "https://in.linkedin.com/company/deckster-live",
  },
  { icon: IconBrandX, label: "X", href: "#" },
] as const;

const legal = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
] as const;

export function Footer() {
  return (
    <>
      <div aria-hidden className="w-full">
        <svg
          viewBox="0 0 1440 110"
          preserveAspectRatio="none"
          className="block h-14 w-full sm:h-20 md:h-28"
        >
          <path
            d="M0,24 C220,-8 360,-4 560,24 C820,60 1080,68 1440,48 L1440,110 L0,110 Z"
            fill="var(--footer-minty)"
          />
        </svg>
      </div>

      <footer
        style={{ backgroundColor: "var(--footer-minty)" }}
        className="px-5 pb-8 md:px-8"
      >
        <div className="mx-auto max-w-310">
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.heading}>
                <p className="font-display text-[13px] font-semibold text-ink">
                  {col.heading}
                </p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {l.href.startsWith("/#") || l.href.startsWith("#") ? (
                        <HashLink
                          href={l.href}
                          className="text-[13.5px] text-ink/70 transition-colors hover:text-ink"
                        >
                          {l.label}
                        </HashLink>
                      ) : (
                        <Link
                          href={l.href}
                          className="text-[13.5px] text-ink/70 transition-colors hover:text-ink"
                        >
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="col-span-2 sm:col-span-1">
              <p className="font-display text-[13px] font-semibold text-ink">
                Follow us
              </p>
              <div className="mt-4 flex items-center gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="grid h-9 w-9 place-items-center rounded-full bg-green-dark text-paper transition-colors hover:bg-ink"
                  >
                    <s.icon className="h-4 w-4" strokeWidth={1.75} />
                  </a>
                ))}
              </div>

              <a
                href="mailto:hello@deckster.live"
                className="mt-5 inline-flex items-center gap-2 text-[13.5px] text-ink/70 transition-colors hover:text-ink"
              >
                <IconMail className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                hello@deckster.live
              </a>
            </div>
          </div>

          <div
            style={{ borderColor: "var(--footer-mint-line)" }}
            className="mt-14 flex flex-col gap-3 border-t pt-6 text-[12.5px] text-ink/70 sm:flex-row sm:items-center sm:justify-between"
          >
            <p>© {new Date().getFullYear()} deckster.live</p>
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
              {legal.map((l, i) => (
                <span key={l.label} className="flex items-center gap-2.5">
                  {i > 0 && <span aria-hidden>|</span>}
                  <Link
                    href={l.href}
                    className="transition-colors hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
