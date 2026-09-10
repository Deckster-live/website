import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

/** One rhythm for every section on the page — Hero and the marquee aside. */
export const SECTION_Y = "py-20 md:py-28 lg:py-32";

export function Section({ id, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={`px-5 md:px-8 ${SECTION_Y} ${className ?? ""}`}
    >
      <div className="mx-auto max-w-310">{children}</div>
    </section>
  );
}

/** Space between a section's header block and the content under it. */
export const HEAD_GAP = "mt-12 md:mt-16";

interface SectionHeadProps {
  eyebrow: string;
  title: ReactNode;
  copy?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHead({
  eyebrow,
  title,
  copy,
  align = "left",
  className,
}: SectionHeadProps) {
  const alignment =
    align === "center"
      ? "mx-auto max-w-2xl text-center"
      : "max-w-2xl text-left";

  return (
    <div className={`${alignment} ${className ?? ""}`}>
      <p className="eyebrow">{eyebrow}</p>

      <h2 className="font-display mt-4 text-[clamp(1.7rem,4.2vw,2.85rem)] leading-[1.08] font-semibold">
        {title}
      </h2>

      {copy && (
        <p className="mt-5 text-[15px] leading-relaxed text-slate md:text-base">
          {copy}
        </p>
      )}
    </div>
  );
}

interface SparklineProps {
  points: number[];
  className?: string;
  stroke?: string;
  fill?: boolean;
}

export function Sparkline({
  points,
  className,
  stroke = "var(--signal)",
  fill = true,
}: SparklineProps) {
  if (points.length === 0) {
    return null;
  }

  const width = 100;
  const height = 34;

  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;

  const coords = points.map((point, index) => {
    const x =
      points.length === 1 ? width / 2 : (index / (points.length - 1)) * width;

    const y = height - ((point - min) / span) * (height - 4) - 2;

    return [x, y] as const;
  });

  const path = coords
    .map(([x, y], index) => {
      if (index === 0) {
        return `M${x.toFixed(2)},${y.toFixed(2)}`;
      }

      const [previousX, previousY] = coords[index - 1];
      const controlX = (previousX + x) / 2;

      return `C${controlX.toFixed(2)},${previousY.toFixed(
        2,
      )} ${controlX.toFixed(2)},${y.toFixed(
        2,
      )} ${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {fill && (
        <path
          d={`${path} L${width},${height} L0,${height} Z`}
          fill={stroke}
          opacity="0.1"
        />
      )}

      <path
        d={path}
        fill="none"
        stroke={stroke}
        strokeWidth="1.6"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
