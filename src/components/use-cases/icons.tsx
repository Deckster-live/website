import type { ReactNode } from "react";

export interface IconProps {
  className?: string;
}

export type IconComponent = (props: IconProps) => ReactNode;

/**
 * Two-tone flat icons. The pill sets --ic-1 (line work) and --ic-2 (accent
 * fills); KNOCKOUT punches shapes back out of a filled accent.
 */
const LINE = "var(--ic-1, currentColor)";
const ACCENT = "var(--ic-2, currentColor)";
const KNOCKOUT = "var(--card)";

function Glyph({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={LINE}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

/* -------------------------------------------------- */
/* Goals                                              */
/* -------------------------------------------------- */

/** Horseshoe magnet pulling three leads into its poles. */
export function AcquisitionIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <circle cx="4.6" cy="3.4" r="1.05" fill={ACCENT} stroke="none" />
      <path d="M2.8 6.4a1.8 1.8 0 0 1 3.6 0Z" fill={ACCENT} stroke="none" />

      <circle cx="12" cy="2.3" r="1.25" fill={ACCENT} stroke="none" />
      <path d="M9.9 5.9a2.1 2.1 0 0 1 4.2 0Z" fill={ACCENT} stroke="none" />

      <circle cx="19.4" cy="3.4" r="1.05" fill={ACCENT} stroke="none" />
      <path d="M17.6 6.4a1.8 1.8 0 0 1 3.6 0Z" fill={ACCENT} stroke="none" />

      <path d="M6.8 8.2v5a5.2 5.2 0 0 0 10.4 0v-5" />
      <path d="M9.4 8.2v5a2.6 2.6 0 0 0 5.2 0v-5" />
      <path
        d="M6.8 8.2h2.6v2H6.8zM14.6 8.2h2.6v2h-2.6z"
        fill={LINE}
        stroke="none"
      />
    </Glyph>
  );
}

/** Rocket climbing at 45° with thrust and motion trail. */
export function LaunchIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <g transform="rotate(-42 12 12)">
        <path
          d="M8.6 20.6v1.7M15.4 20.6v1.7M12 21.9v1.4"
          stroke={ACCENT}
          opacity="0.55"
        />
        <path
          d="M9.9 16.6c.2 2 .9 3.5 2.1 4.5 1.2-1 1.9-2.5 2.1-4.5Z"
          fill={ACCENT}
          stroke={ACCENT}
        />
        <path d="M12 3.4c2.5 2.4 3.9 5.6 3.9 8.9 0 1.6-.3 3.1-.9 4.4H9c-.6-1.3-.9-2.8-.9-4.4 0-3.3 1.4-6.5 3.9-8.9Z" />
        <path d="M9 13c-1.9 1-3.2 2.6-3.5 4.5H9M15 13c1.9 1 3.2 2.6 3.5 4.5H15" />
        <circle cx="12" cy="10.2" r="1.75" fill={ACCENT} stroke={LINE} />
      </g>
    </Glyph>
  );
}

/** Shield around a four-point star — trust and identity. */
export function BrandIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path
        d="M12 2.9 19.4 5.6v5.2c0 4.8-3 8.3-7.4 9.7-4.4-1.4-7.4-4.9-7.4-9.7V5.6Z"
        fill={ACCENT}
        fillOpacity="0.12"
      />
      <path
        d="M12 7.8 13 10.4 15.6 11.4 13 12.4 12 15 11 12.4 8.4 11.4 11 10.4Z"
        fill={ACCENT}
        stroke={ACCENT}
      />
    </Glyph>
  );
}

/** Bullhorn angled right, spend bubble and reach waves. */
export function MegaphoneIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <g transform="rotate(-10 12 12)">
        <path
          d="M3.4 10.6 12.2 6.6v11.2L3.4 13.8Z"
          fill={ACCENT}
          fillOpacity="0.14"
        />
        <path d="M3.4 11.3H2.2a1.1 1.1 0 0 0 0 2.2h1.2" />
        <path d="M7.2 15.6l1.2 3a1.35 1.35 0 0 0 2.5-1l-.4-1" />
        <path d="M14.4 9.6a5.2 5.2 0 0 1 0 5.2" stroke={ACCENT} />
        <path d="M16.8 8a8.4 8.4 0 0 1 0 8.4" stroke={ACCENT} opacity="0.7" />
      </g>

      <circle cx="19" cy="4.6" r="3.5" fill={ACCENT} stroke="none" />
      <path
        d="M19 2.5v4.2M20.2 3.6c-.2-.5-.8-.7-1.3-.7-.6 0-1.2.3-1.2.9 0 1.3 2.5.7 2.5 2 0 .6-.6 1-1.3 1-.6 0-1.1-.2-1.3-.7"
        stroke={KNOCKOUT}
        strokeWidth="1.2"
      />
    </Glyph>
  );
}

/** Profile card with a verified badge over the corner. */
export function VerifiedCardIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <rect
        x="2.6"
        y="4.2"
        width="15.8"
        height="13.4"
        rx="3.2"
        fill={ACCENT}
        fillOpacity="0.1"
      />
      <circle cx="8" cy="9.4" r="2.1" />
      <path d="M4.7 15a3.4 3.4 0 0 1 6.6 0" />
      <path d="M13.2 8.5h3M13.2 11.3h3" opacity="0.45" />

      <circle cx="18.4" cy="17.4" r="4.2" fill={ACCENT} stroke="none" />
      <path
        d="M16.5 17.4 17.9 18.8 20.4 15.9"
        stroke={KNOCKOUT}
        strokeWidth="1.8"
      />
    </Glyph>
  );
}

/** Storefront with awning, opening pennant and inauguration ribbon. */
export function StorefrontIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M12 5.8V3.2" stroke={ACCENT} />
      <path
        d="M12 3.2h3.6l-1.1 1.3 1.1 1.3H12Z"
        fill={ACCENT}
        stroke={ACCENT}
      />

      <path
        d="M3.2 9.8 5.4 5.8h13.2l2.2 4Z"
        fill={ACCENT}
        fillOpacity="0.16"
      />
      <path
        d="M8.4 5.8 7.6 9.8M12 5.8v4M15.6 5.8l.8 4"
        stroke={ACCENT}
        opacity="0.5"
      />

      <path d="M5 9.8v10h14v-10" />
      <path d="M9.4 19.8v-4.2a2.6 2.6 0 0 1 5.2 0v4.2" />
      <path d="M12 15.4v4.4" opacity="0.45" />

      <path d="M5 12.4h14" stroke={ACCENT} />
      <path
        d="M12 12.4 9.9 11v2.8l2.1-1.4ZM12 12.4l2.1-1.4v2.8L12 12.4Z"
        fill={ACCENT}
        stroke={ACCENT}
      />
    </Glyph>
  );
}

/** Seedling in a soil mound with growth nodes around it. */
export function SeedingIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path
        d="M3.4 20.2c1.7-3.1 4.7-4.7 8.6-4.7s6.9 1.6 8.6 4.7Z"
        fill={ACCENT}
        fillOpacity="0.2"
        stroke={ACCENT}
      />
      <path d="M12 15.6V9" />
      <path
        d="M12 12.2c0-3 2.1-5.1 5.1-5.5.4 3-1.9 5.5-5.1 5.5Z"
        fill={LINE}
        fillOpacity="0.14"
      />
      <path
        d="M12 9.4c0-2.5-1.8-4.3-4.4-4.7-.4 2.5 1.7 4.7 4.4 4.7Z"
        fill={LINE}
        fillOpacity="0.14"
      />

      <circle cx="19.5" cy="12.3" r="1.8" stroke={ACCENT} />
      <circle cx="4.6" cy="11.2" r="1.2" fill={ACCENT} stroke="none" />
      <circle
        cx="16.2"
        cy="3.2"
        r="1"
        fill={ACCENT}
        stroke="none"
        opacity="0.6"
      />
      <circle
        cx="7.6"
        cy="16.6"
        r="0.7"
        fill={ACCENT}
        stroke="none"
        opacity="0.5"
      />
    </Glyph>
  );
}

/* -------------------------------------------------- */
/* Formats                                            */
/* -------------------------------------------------- */

/** Phone shooting video — creator-made content. */
export function UgcIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <rect
        x="6.2"
        y="2.4"
        width="11.6"
        height="19.2"
        rx="3.2"
        fill={ACCENT}
        fillOpacity="0.09"
      />
      <path d="M10.6 5h2.8" opacity="0.45" />

      <circle cx="12" cy="9.6" r="3" />
      <circle cx="12" cy="9.6" r="1.5" fill={ACCENT} stroke="none" />
      <circle cx="11.2" cy="8.8" r="0.5" fill={KNOCKOUT} stroke="none" />

      <circle cx="12" cy="16.2" r="2.7" fill={ACCENT} stroke="none" />
      <path
        d="M11.1 14.9 13.5 16.2 11.1 17.5Z"
        fill={KNOCKOUT}
        stroke="none"
      />
    </Glyph>
  );
}

/** Creator avatar with a spark and an engagement bubble. */
export function IgcIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <circle cx="8.4" cy="9.4" r="4.4" fill={ACCENT} fillOpacity="0.1" />
      <circle cx="8.4" cy="8.1" r="1.55" />
      <path d="M5.8 12.9a2.7 2.7 0 0 1 5.2 0" />

      <path
        d="M18.6 1.9 19.3 3.9 21.3 4.6 19.3 5.3 18.6 7.3 17.9 5.3 15.9 4.6 17.9 3.9Z"
        fill={ACCENT}
        stroke={ACCENT}
      />

      <rect x="13.4" y="12.6" width="8.6" height="7" rx="2.8" />
      <path d="M16.6 19.6 15.4 22.1 18.4 19.6" />
      <path
        d="M17.7 18c-1.4-1-2.2-1.7-2.2-2.5 0-.75.6-1.3 1.3-1.3.4 0 .7.15.9.45.2-.3.5-.45.9-.45.7 0 1.3.55 1.3 1.3 0 .8-.8 1.5-2.2 2.5Z"
        fill={ACCENT}
        stroke="none"
      />
    </Glyph>
  );
}

/** Sponsored placement on screen, coin badge and a click. */
export function MonitorAdIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <rect
        x="2.4"
        y="4"
        width="19.2"
        height="13.2"
        rx="2.8"
        fill={ACCENT}
        fillOpacity="0.09"
      />
      <path d="M12 17.2v3.2M8.8 20.4h6.4" />

      <rect x="5" y="6.6" width="7.2" height="7.2" rx="1.6" opacity="0.5" />
      <path d="M14 8.2h4.2M14 10.6h3" opacity="0.5" />

      <path
        d="M13.9 11.6 19.8 14.3 17.1 15 16.4 17.6Z"
        fill={LINE}
        stroke="none"
      />

      <circle cx="19.4" cy="4.4" r="3.5" fill={ACCENT} stroke="none" />
      <path
        d="M19.4 2.3v4.2M20.6 3.4c-.2-.5-.8-.7-1.3-.7-.6 0-1.2.3-1.2.9 0 1.3 2.5.7 2.5 2 0 .6-.6 1-1.3 1-.6 0-1.1-.2-1.3-.7"
        stroke={KNOCKOUT}
        strokeWidth="1.2"
      />
    </Glyph>
  );
}

/** ID card with a lock and a cleared check badge. */
export function VerifiedIdIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <rect
        x="2.4"
        y="4.4"
        width="16"
        height="14"
        rx="3.2"
        fill={ACCENT}
        fillOpacity="0.09"
      />
      <circle cx="7.8" cy="9.4" r="2" fill={LINE} fillOpacity="0.18" />
      <path d="M4.6 15a3.2 3.2 0 0 1 6.4 0" />

      <rect
        x="12.6"
        y="8.8"
        width="4.8"
        height="3.8"
        rx="1.2"
        fill={ACCENT}
        stroke={ACCENT}
      />
      <path d="M14 8.8V7.9a1.4 1.4 0 0 1 2.8 0v.9" stroke={ACCENT} />
      <circle cx="15" cy="10.7" r="0.6" fill={KNOCKOUT} stroke="none" />

      <circle cx="18.6" cy="17.2" r="4.2" fill={ACCENT} stroke="none" />
      <path
        d="M16.7 17.2 18.1 18.6 20.5 15.7"
        stroke={KNOCKOUT}
        strokeWidth="1.8"
      />
    </Glyph>
  );
}

/** Three nodes wired into a campaign pipeline. */
export function CampaignsIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path
        d="M9.6 15.6 6.6 9.2"
        stroke={ACCENT}
        strokeDasharray="1.8 2"
        opacity="0.6"
      />
      <circle cx="5.2" cy="6.6" r="2.6" fill={ACCENT} fillOpacity="0.14" />
      <circle cx="18.8" cy="6.6" r="2.6" fill={ACCENT} fillOpacity="0.14" />
      <circle cx="12" cy="17.6" r="2.6" fill={ACCENT} fillOpacity="0.14" />

      <path d="M8 6.6h8.2" />
      <path d="M14.8 5.2 16.4 6.6 14.8 8" stroke={ACCENT} />
      <path d="M17.5 8.9 13.6 15.4" />
      <path d="M13.7 13.5 13.5 15.5 15.3 14.5" stroke={ACCENT} />
    </Glyph>
  );
}

/** Studio mic inside an equaliser. */
export function PodcastIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path
        d="M2.2 8.8v2.6M4.2 6.2v7.6M6.2 7.8v4.4"
        stroke={ACCENT}
        opacity="0.75"
      />
      <path
        d="M21.8 8.4v3.4M19.8 5.2v9.2M17.8 7v6"
        stroke={ACCENT}
        opacity="0.75"
      />

      <rect
        x="9.4"
        y="2.6"
        width="5.2"
        height="10"
        rx="2.6"
        fill={ACCENT}
        fillOpacity="0.16"
      />
      <path d="M11 5.4h2M11 7.6h2M11 9.8h2" stroke={ACCENT} opacity="0.8" />

      <path d="M6.9 10.4a5.1 5.1 0 0 0 10.2 0" />
      <path d="M12 15.5v3.1M8.8 18.6h6.4" />
    </Glyph>
  );
}
