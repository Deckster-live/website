"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

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
      className={`fixed left-3 right-3 top-3 z-50 mx-auto max-w-300 overflow-hidden rounded-2xl transition-all duration-500 sm:left-4 sm:right-4 sm:top-4 sm:rounded-full ${
        scrolled
          ? "border border-line bg-background/75 backdrop-blur-xl"
          : "border border-transparent bg-(--footer-minty)"
      }`}
    >
      {/* Main navbar */}
      <div className="mx-auto grid min-h-14 max-w-6xl grid-cols-[1fr_auto] items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3 md:px-8 lg:grid-cols-[1fr_auto_1fr]">
        {/* Logo */}
        <Link
          href="#top"
          onClick={closeMenu}
          className="flex min-w-0 items-center gap-2"
          aria-label="Deckster home"
        >
          <img src="/logos/wordmark-ink.png" className="h-8" />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-6 lg:flex xl:gap-8"
          aria-label="Main navigation"
        >
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="whitespace-nowrap text-sm font-medium text-slate transition-colors hover:text-foreground xl:text-base"
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
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line transition-colors hover:bg-background/50 lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`lg:hidden ${open ? "block" : "hidden"}`}>
        <div className="border-t border-line/70 bg-background/90 backdrop-blur-xl">
          <nav
            className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-5 md:px-8"
            aria-label="Mobile navigation"
          >
            {links.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                className="border-b border-line/70 py-3.5 text-sm font-medium text-slate transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            ))}

            <Link
              href="#cta"
              onClick={closeMenu}
              className="mb-3 mt-4 rounded-full bg-ink px-4 py-2.5 text-center text-sm font-medium text-paper transition-colors hover:bg-green-dark"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
