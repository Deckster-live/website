"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Product", href: "#product" },
  { label: "How we work", href: "#how-we-work" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "About", href: "#about" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-4 z-50 mx-auto rounded-full max-w-300 transition-all duration-500 ${
        scrolled
          ? "border-b border-line bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent bg-(--footer-minty)"
      }`}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3.5 md:px-8 lg:grid-cols-[1fr_auto_1fr]">
        {/* Logo */}
        <Link
          href="#top"
          className="flex min-w-0 items-center gap-2"
          aria-label="Deckster home"
        >
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-ink">
            <span className="h-1.5 w-1.5 rounded-xs bg-signal" />
          </span>

          <span className="truncate font-display text-[15px] font-semibold tracking-[-0.02em]">
            Deckster
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Main navigation"
        >
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-base font-medium text-slate transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2">
          <Link
            href="#cta"
            className="hidden rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-paper transition-colors hover:bg-green-dark sm:inline-flex"
          >
            Get Started
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="border-t border-line bg-background/95 backdrop-blur-xl lg:hidden">
          <nav
            className="mx-auto flex max-w-400 flex-col px-5 py-2 md:px-8"
            aria-label="Mobile navigation"
          >
            {links.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                className="border-b border-line py-3 text-sm text-slate last:border-0"
              >
                {label}
              </Link>
            ))}

            <Link
              href="#cta"
              onClick={closeMenu}
              className="mb-3 mt-3 rounded-full bg-ink px-4 py-2.5 text-center text-base font-medium text-paper transition-colors hover:bg-green-dark"
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
