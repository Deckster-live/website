const brands = [
  "Rare Rabbit",
  "The Pant Project",
  "Bewakoof",
  "Snitch",
  "Fabindia",
  "Wildcraft",
  "Bombay Shaving Co.",
  "Mokobara",
  "The Souled Store",
  "Campus Sutra",
  "Chumbak",
  "Third Wave Coffee",
];

function Tile({ name }: { name: string }) {
  return (
    <span className="surface flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl px-6 md:h-24 md:w-52">
      <span className="font-display truncate text-[15px] font-medium tracking-[-0.01em] text-slate md:text-[17px]">
        {name}
      </span>
    </span>
  );
}

function Row({ names, reverse }: { names: string[]; reverse?: boolean }) {
  const doubled = [...names, ...names];
  return (
    <div className="marquee-mask mx-auto max-w-300 overflow-hidden">
      <div
        className={`flex w-max gap-4 md:gap-6 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
      >
        {doubled.map((name, i) => (
          <Tile key={i} name={name} />
        ))}
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <div className="relative overflow-hidden py-14 md:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-background to-transparent blur-xl md:w-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-background to-transparent blur-xl md:w-40"
      />

      <p className="eyebrow px-5 text-center md:px-8">
        Brands We&rsquo;ve Worked With
      </p>
      <div className="mt-9 flex flex-col gap-4 md:gap-6">
        <Row names={brands.slice(0, 6)} />
        <Row names={brands.slice(6)} reverse />
      </div>
    </div>
  );
}
