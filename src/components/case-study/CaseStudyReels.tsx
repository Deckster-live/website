"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { CaseStudyReel } from "@/data/mockdata/case-studies";

/** Beyond this, the rest collapse behind a "Show more" toggle. */
const VISIBLE = 4;

function ReelCard({ reel }: { reel: CaseStudyReel }) {
  return (
    <a
      href={reel.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group/reel relative aspect-9/16 overflow-hidden rounded-xl bg-mist ring-1 ring-black/5 md:rounded-2xl"
    >
      <img src={reel.cover} alt="" className="h-full w-full object-cover" />
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover/reel:bg-black/15">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-white/90 opacity-0 shadow-sm transition-opacity duration-200 group-hover/reel:opacity-100">
          <svg
            viewBox="0 0 24 24"
            className="ml-0.5 h-4 w-4 fill-ink"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </a>
  );
}

/** Every creative from the campaign. The homepage card shows the first two;
 * here the full set is on show, with anything past the first row folded
 * behind a toggle. */
export function CaseStudyReelsGrid({ reels }: { reels: CaseStudyReel[] }) {
  const [expanded, setExpanded] = useState(false);

  const shown = reels.slice(0, VISIBLE);
  const rest = reels.slice(VISIBLE);

  return (
    <>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
        {shown.map((reel, i) => (
          <ReelCard key={reel.cover + i} reel={reel} />
        ))}
      </div>

      {rest.length > 0 && (
        <>
          {/* 0fr → 1fr animates to the content's own height, so the row
              never needs a hardcoded max-height. */}
          <div
            className={`grid transition-[grid-template-rows] duration-500 ease-out ${
              expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div
                className={`mt-3 grid grid-cols-2 gap-3 transition-opacity duration-300 sm:grid-cols-4 md:mt-4 md:gap-4 ${
                  expanded ? "opacity-100 delay-150" : "opacity-0"
                }`}
              >
                {rest.map((reel, i) => (
                  <ReelCard key={reel.cover + i} reel={reel} />
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-[13px] font-medium text-ink transition-colors hover:border-green-dark hover:text-green-dark"
          >
            {expanded ? "Show less" : `Show ${rest.length} more`}
            <ChevronDown
              aria-hidden
              className={`h-4 w-4 transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </>
      )}
    </>
  );
}
