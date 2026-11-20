"use client";

import { useState } from "react";
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandX,
  IconCheck,
  IconLink,
} from "@tabler/icons-react";

/** "Share this article": WhatsApp first, then LinkedIn, X, Facebook and copy link. No Instagram: it has no
 * web link for sharing a page. */
export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: "WhatsApp", Icon: IconBrandWhatsapp, href: `https://wa.me/?text=${t}%20${u}` },
    { label: "LinkedIn", Icon: IconBrandLinkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { label: "X", Icon: IconBrandX, href: `https://x.com/intent/tweet?text=${t}&url=${u}` },
    { label: "Facebook", Icon: IconBrandFacebook, href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  ];
  const button =
    "grid h-10 w-10 place-items-center rounded-full border border-line-strong text-ink/75 transition-colors hover:border-ink hover:bg-ink hover:text-paper";

  async function copy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <p className="font-display text-[15px] font-semibold text-ink">Share this article</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {links.map(({ label, Icon, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${label}`}
            className={button}
          >
            <Icon className="h-4.5 w-4.5" stroke={1.75} />
          </a>
        ))}
        <button type="button" onClick={copy} aria-label="Copy link" className={button}>
          {copied ? <IconCheck className="h-4.5 w-4.5" stroke={2} /> : <IconLink className="h-4.5 w-4.5" stroke={1.75} />}
        </button>
      </div>
      {/* Announced to screen readers too. */}
      <p aria-live="polite" className="mt-2 h-4 text-[12.5px] text-green-dark">
        {copied ? "Link copied" : ""}
      </p>
    </div>
  );
}
