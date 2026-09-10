import Image from "next/image";
import { brands, type Brand } from "@/components/brands";


function Tile({ brand }: { brand: Brand }) {
  return (
    <span className="flex h-20 w-44 shrink-0 items-center justify-center rounded-xl px-6 py-5 md:h-24 md:w-52 md:px-7 md:py-6">
      <span
        className="relative block h-full w-full"
        style={brand.scale ? { transform: `scale(${brand.scale})` } : undefined}
      >
        <Image
          src={brand.src}
          alt={brand.name}
          fill
          sizes="208px"
          loading="eager"
          className={`object-contain object-center${brand.invert ? " invert" : ""}`}
        />
      </span>
    </span>
  );
}

function Row({ items, reverse }: { items: Brand[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-mask mx-auto max-w-300 overflow-hidden">
      <div
        className={`flex w-max gap-4 md:gap-6 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
      >
        {doubled.map((brand, i) => (
          <Tile key={`${brand.name}-${i}`} brand={brand} />
        ))}
      </div>
    </div>
  );
}

export function Marquee() {
  const shuffledBrands = [...brands].sort(() => Math.random() - 0.5);
  const topRow = shuffledBrands.filter((_, i) => i % 2 === 0);
  const bottomRow = shuffledBrands.filter((_, i) => i % 2 === 1);

  return (
    <div className="mt-10 relative overflow-hidden py-14 md:py-18">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-24 bg-linear-to-r from-background to-transparent blur-xl md:w-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-24 bg-linear-to-l from-background to-transparent blur-xl md:w-40"
      />

      <p className="uppercase text-[18px] font-display px-5 text-center md:px-8 z-50">
        Brands who trust Deckster to show up
      </p>
      <div className="mt-9 flex flex-col gap-4 md:gap-6">
        <Row items={topRow} />
        <Row items={bottomRow} reverse />
      </div>
    </div>
  );
}
