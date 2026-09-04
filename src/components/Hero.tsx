import { IconArrowUpRight, IconBrandInstagram } from "@tabler/icons-react";
import { Sparkline } from "./ui/primitives";

function StatCard({
  label,
  value,
  sub,
  className = "",
}: {
  label: string;
  value: string;
  sub?: string;
  className?: string;
}) {
  return (
    <div className={`surface rounded-xl px-4 py-3.5 ${className}`}>
      <p className="text-[11px] tracking-wide text-slate">{label}</p>
      <p className="font-display mt-1 text-[22px] leading-none font-semibold md:text-[26px]">
        {value}
      </p>
      {sub && <p className="mt-1.5 text-[11px] text-slate">{sub}</p>}
    </div>
  );
}

function TrendPill({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`surface flex items-center gap-2 rounded-full py-1.5 pr-3 pl-2.5 text-[11.5px] ${className}`}
    >
      <IconArrowUpRight className="h-3.5 w-3.5 text-signal" />
      <span className="text-slate">Trend</span>
      <span className="rounded-full bg-signal/12 px-2 py-0.5 font-medium text-green-dark">
        {value}
      </span>
    </div>
  );
}

function BarsCard({ className = "" }: { className?: string }) {
  const bars = [38, 52, 44, 66, 58, 82, 74];
  return (
    <div
      className={`surface flex h-25 items-end gap-2 rounded-xl px-4 py-4 ${className}`}
    >
      {bars.map((b, i) => (
        <span
          key={i}
          style={{ height: `${b}%` }}
          className={`w-3 rounded-[3px] ${i > 4 ? "bg-sky-800" : "bg-sky-800/25"}`}
        />
      ))}
    </div>
  );
}

function DonutCard({
  pct,
  label,
  className = "",
}: {
  pct: number;
  label: string;
  className?: string;
}) {
  const c = 2 * Math.PI * 26;
  return (
    <div
      className={`surface flex items-center gap-3 rounded-xl px-4 py-4 ${className}`}
    >
      <svg viewBox="0 0 64 64" className="h-12 w-12 -rotate-90">
        <circle
          cx="32"
          cy="32"
          r="26"
          fill="none"
          stroke="var(--mist)"
          strokeWidth="9"
        />
        <circle
          cx="32"
          cy="32"
          r="26"
          fill="none"
          stroke="pink"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${(pct / 100) * c} ${c}`}
        />
      </svg>
      <div>
        <p className="font-display text-[17px] leading-none font-semibold">
          {pct}%
        </p>
        <p className="mt-1 text-[11px] text-slate">{label}</p>
      </div>
    </div>
  );
}

function CommentsChart({ className = "" }: { className?: string }) {
  const series = [
    30, 90, 120, 180, 230, 245, 250, 258, 262, 268, 272, 300, 430, 470, 880,
    940,
  ];
  return (
    <div className={`surface-float rounded-2xl p-4 md:p-5 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-[15px] font-semibold">
          Cumulative Comments
        </p>
      </div>

      <div className="relative mt-4">
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-px w-full bg-line" />
          ))}
        </div>
        <div className="flex gap-3">
          <div className="flex flex-col justify-between py-0.5 text-[10px] text-slate">
            <span>1K</span>
            <span>750</span>
            <span>500</span>
            <span>250</span>
            <span>0</span>
          </div>
          <Sparkline
            points={series}
            stroke="purple"
            className="h-30 w-full md:h-38"
          />
        </div>
        <div className="absolute top-6 left-[22%] hidden rounded-xl border border-line bg-card px-3 py-2.5 shadow-(--shadow-float) sm:block">
          <p className="text-[11px] font-medium">
            {new Date(Date.now() - 86400000).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
          <p className="text-[10.5px] text-slate">Total Comments</p>
          <div className="mt-1.5 flex items-center gap-2">
            <IconBrandInstagram className="h-4 w-4 text-pink-400" />
            <span className="text-[12px] font-bold text-rose-400">
              Instagram
            </span>
            <span className="font-display ml-3 text-[13px] font-semibold">
              891
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-slate">
        <span className="h-2 w-2 rounded-[2px] bg-purple-800" />
        Instagram
      </div>
    </div>
  );
}

function CreatorRow({ className = "" }: { className?: string }) {
  const rows = [
    {
      img: "/images/avatar2.jpg",
      n: "Neerya Kapoor",
      h: "@neerya_creates",
      f: "30K",
      v: "4.4M",
      l: "1.3K",
      c: "5",
      e: "0.032%",
      sentiment: [33, 67, 0],
    },
    {
      img: "/images/avatar1.jpg",
      n: "Lily Chloe",
      h: "@lily_chloe",
      f: "270K",
      v: "6.3M",
      l: "3.5K",
      c: "23",
      e: "0.061%",
      sentiment: [65, 30, 5],
    },
    {
      img: "/images/avatar.png",
      n: "Neeraj Bhatia",
      h: "@coolboy_29",
      f: "30K",
      v: "134.6K",
      l: "-",
      c: "67",
      e: "0.159%",
      sentiment: [42, 27, 31],
    },
  ];
  const columns = [
    "Creator",
    "Deliverable",
    "Sentiment",
    "Followers",
    "Views",
    "Likes",
    "Comments",
    "Engagement",
  ];

  return (
    <div className={`surface  rounded-xl ${className}`}>
      <div className="min-w-170 overflow-hidden">
        <div className="grid grid-cols-[1.55fr_.8fr_1.15fr_.7fr_.7fr_.6fr_.65fr_1fr] items-center gap-2 border-b border-line px-4 py-2.5 text-[10px] text-slate">
          {columns.map((column) => (
            <span key={column} className="truncate">
              {column}
            </span>
          ))}
        </div>
        {rows.map((r) => (
          <div
            key={r.h}
            className="grid min-h-16 grid-cols-[1.55fr_.8fr_1.15fr_.7fr_.7fr_.6fr_.65fr_1fr] items-center gap-2 border-b border-line px-4 py-2 last:border-0"
          >
            <div className="flex min-w-0 items-center gap-2">
              <span className="grid h-7 w-7 shrink-0 overflow-hidden place-items-center rounded-full bg-mist">
                <img src={r.img} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-medium">{r.n}</p>
                <p className="truncate text-[9px] text-slate">{r.h}</p>
              </div>
            </div>
            <span className="w-fit rounded-md border border-line-strong px-2 py-1 text-[10px]">
              Reel
            </span>
            <div className="flex items-center gap-1 text-[9px] text-slate">
              {r.sentiment.map((value, index) => (
                <span key={index} className="flex items-center gap-0.5">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${index === 0 ? "bg-signal" : index === 1 ? "bg-amber-400" : "bg-red-400"}`}
                  />
                  {value}%
                </span>
              ))}
            </div>
            <span className="text-[11px]">{r.f}</span>
            <span className="text-[11px]">{r.v}</span>
            <span className="text-[11px]">{r.l}</span>
            <span className="text-[11px]">{r.c}</span>
            <span className="text-[11px]">{r.e}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pt-28 pb-6 md:px-8 md:pt-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-18%] left-1/2 h-180 w-300 -translate-x-1/2 rounded-full opacity-70"
        style={{ background: "var(--glow-signal)", filter: "blur(20px)" }}
      />
      <div className="relative mx-auto max-w-300">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="animate-rise mt-6 text-[clamp(2.35rem,7vw,4.6rem)] leading-[1.2] font-semibold">
            Better creators. Better campaigns. Better outcomes.{" "}
          </h1>
          <p className="animate-rise mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-slate md:text-[17px]">
            Discover creators, manage campaigns, track performance and make
            better decisions — all in one place.
          </p>
          <div className="animate-rise mt-8 flex items-center justify-center gap-3 flex-row">
            <a
              href="#cta"
              className="w-full rounded-full bg-ink px-6 py-3 text-center text-sm font-medium text-paper transition-colors hover:bg-green-dark sm:w-auto"
            >
              Get Started
            </a>
            <a
              href="#product"
              className="w-full rounded-full border border-line-strong px-6 py-3 text-center text-sm font-medium transition-colors hover:bg-mist sm:w-auto"
            >
              Explore More
            </a>
          </div>
        </div>

        {/* Collage */}
        <div className="relative mx-auto mt-14 max-w-270 md:mt-20">
          {/* mobile / tablet stack */}
          <div className="grid grid-cols-2 gap-3 lg:hidden">
            <StatCard label="Likes" value="93K" />
            <StatCard label="Comments" value="921" />
            <CommentsChart className="col-span-2" />
            <StatCard label="Engagement Rate" value="0.556%" />
            <DonutCard pct={72} label="Deliverables live" />
            <CreatorRow className="col-span-2" />
          </div>

          {/* desktop collage */}
          <div className="relative hidden h-150 lg:block">
            <CommentsChart className=" absolute top-0 left-1/2 w-110 -translate-x-1/2" />
            <StatCard
              label="Likes"
              value="93K"
              className="absolute top-0 left-[3%] w-38 -rotate-2"
            />
            <BarsCard className="absolute top-30 left-[10%] w-40" />
            <TrendPill value="+0.32%" className="absolute top-30 left-[1%]" />
            <StatCard
              label="Comments"
              value="921"
              className="absolute top-60 left-[7%] w-42 rotate-1"
            />
            <CreatorRow className="absolute top-90 left-[2%] w-170" />

            <TrendPill value="+0.58%" className="absolute top-10 right-[3%]" />
            <DonutCard
              pct={72}
              label="Deliverables live"
              className="absolute top-20 right-[8%] w-50"
            />
            <StatCard
              label="Engagement Rate"
              value="0.556%"
              sub="Across 42 creators"
              className="absolute top-50 right-[2%] w-50 rotate-1"
            />
            <StatCard
              label="Views"
              value="276.3M"
              className="absolute top-80 right-[12%] w-42 -rotate-1"
            />
            <div className="surface absolute top-110 right-[3%] w-57 rounded-xl px-4 py-3.5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-slate">Spend pacing</p>
                <span className="text-[11px] font-medium text-green-dark">
                  On track
                </span>
              </div>
              <Sparkline
                points={[10, 22, 18, 36, 44, 40, 62, 74]}
                stroke="orange"
                className="mt-3 h-9 w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
