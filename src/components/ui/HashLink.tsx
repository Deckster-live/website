"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, MouseEvent } from "react";

type HashLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

/**
 * Wraps next/link for same-page hash anchors (e.g. "/#cta"). A plain <Link>
 * only scrolls when the hash actually changes, so a second click on a link
 * pointing at the section the URL already has (e.g. two "/#cta" CTAs in a
 * row) does nothing. This scrolls manually every time and syncs the URL
 * with replaceState, falling back to normal navigation off the homepage.
 */
export function HashLink({ href, onClick, ...props }: HashLinkProps) {
  const pathname = usePathname();
  const hrefStr = href.toString();
  const match = hrefStr.match(/^(?:\/)?#(.+)$/);
  const targetId = match?.[1];

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);

    if (!targetId || e.defaultPrevented) return;

    const isHomePage = pathname === "/";
    const isSamePageHash = hrefStr.startsWith("#") || hrefStr.startsWith("/#");

    if (!(isHomePage || isSamePageHash)) {
      return;
    }

    const el = document.getElementById(targetId);
    if (!el) return;

    e.preventDefault();
    const currentHash = window.location.hash;
    const scrollToTarget = () => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    if (currentHash === `#${targetId}`) {
      const url = new URL(window.location.href);
      url.hash = "";
      window.history.replaceState(null, "", url.toString());
      requestAnimationFrame(() => {
        const nextUrl = new URL(window.location.href);
        nextUrl.hash = targetId;
        window.history.replaceState(null, "", nextUrl.toString());
        scrollToTarget();
      });
      return;
    }

    const url = new URL(window.location.href);
    url.hash = targetId;
    window.history.replaceState(null, "", url.toString());
    scrollToTarget();
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
