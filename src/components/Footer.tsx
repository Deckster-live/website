import Link from "next/link";
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";

const columns = [
  {
    heading: "Explore",
    links: [
      { label: "Overview", href: "#top" },
      { label: "The problem", href: "#problems" },
      { label: "How it works", href: "#solutions" },
      { label: "What we cover", href: "#services" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Old way vs. new way", href: "#old-vs-new" },
      { label: "Get in touch", href: "#cta" },
    ],
  },
  {
    heading: "More from Deckster",
    links: [
      { label: "Sign in", href: "#" },
      { label: "Partner with us", href: "#cta" },
      { label: "Careers", href: "#" },
      { label: "Contact us", href: "#cta" },
    ],
  },
] as const;

const socials = [
  { icon: IconBrandInstagram, label: "Instagram", href: "#" },
  { icon: IconBrandLinkedin, label: "LinkedIn", href: "#" },
  { icon: IconBrandX, label: "X", href: "#" },
] as const;

const legal = [
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Accessibility", href: "#" },
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
                      <Link
                        href={l.href}
                        className="text-[13.5px] text-ink/70 transition-colors hover:text-ink"
                      >
                        {l.label}
                      </Link>
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
