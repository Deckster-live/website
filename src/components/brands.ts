/** One roster, shared by the homepage marquee and the Why Us track-record tile. */
export type Brand = {
  name: string;
  src: string;
  /** Optical size tweak so wordmarks and square marks read at the same weight. */
  scale?: number;
  /** Some assets ship as white-on-transparent; flip them so they read on the light tile. */
  invert?: boolean;
};

export const brands: Brand[] = [
  { name: "Aqualogia", src: "/logos/brands/aqualogia.svg" },
  { name: "Ampere Electric", src: "/logos/brands/ampere.png", scale: 1.5 },
  { name: "Astrotalk", src: "/logos/brands/astrotalk.png" },
  { name: "ASUS", src: "/logos/brands/asus.svg", scale: 0.9 },
  { name: "Athena", src: "/logos/brands/athena.png", scale: 1.4 },
  { name: "Ather", src: "/logos/brands/ather.png" },
  { name: "Bewakoof", src: "/logos/brands/bewakoof.svg" },
  { name: "Bioderma", src: "/logos/brands/bioderma.svg" },
  { name: "Blinkit", src: "/logos/brands/blinkit.svg", scale: 0.8 },
  { name: "BlissClub", src: "/logos/brands/blissclub.png" },
  { name: "Brocode", src: "/logos/brands/brocode.png", scale: 1.2 },
  { name: "Dove", src: "/logos/brands/dove.svg", scale: 1.15 },
  { name: "Duolingo", src: "/logos/brands/duolingo.svg" },
  { name: "Honasa", src: "/logos/brands/honasa.png", scale: 1.15 },
  { name: "Kapiva", src: "/logos/brands/kapiva.png" },
  { name: "Keventers", src: "/logos/brands/keventers.png", scale: 1.4 },
  { name: "Lenskart", src: "/logos/brands/lenskart.svg", scale: 1.15 },
  { name: "Logitech", src: "/logos/brands/logitech.svg", scale: 0.9 },
  { name: "Mahina", src: "/logos/brands/mahina.png", scale: 1.05 },
  { name: "Mamaearth", src: "/logos/brands/mamaearth.png" },
  { name: "Oben Electric", src: "/logos/brands/oben.png", invert: true },
  {
    name: "Policybazaar UAE",
    src: "/logos/brands/policybazar-ae.png",
    scale: 1.15,
  },
  { name: "Rare Rabbit", src: "/logos/brands/rarerabbit.png", scale: 1.4 },
  { name: "Swisse", src: "/logos/brands/swisse.svg", scale: 0.95 },
  { name: "Theater", src: "/logos/brands/theater.png", scale: 1.5 },
  { name: "The Bear House", src: "/logos/brands/thebearhouse.svg" },
  {
    name: "The Pant Project",
    src: "/logos/brands/thepantproject.png",
    scale: 1.5,
  },
  { name: "Tuborg", src: "/logos/brands/tuborg.svg", scale: 0.95 },
  { name: "Urbano", src: "/logos/brands/urbano.svg" },
  { name: "Veirdo", src: "/logos/brands/veirdo.svg" },
  { name: "Wargaming", src: "/logos/brands/wargaming.png", scale: 1.4 },
  { name: "Woodland", src: "/logos/brands/woodland.png", scale: 1.25 },
  { name: "Zomato", src: "/logos/brands/zomato.png", scale: 1.3 },
];
