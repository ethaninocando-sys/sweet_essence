import type {
  Benefit,
  MarketEvent,
  NumberedBenefit,
  Product,
  Testimonial,
} from "./types";

/**
 * Single source of truth for the home page copy. All three design
 * directions render from this data — only the presentation differs.
 */

export const site = {
  name: "Sweet Essence",
  tagline: "Family Owned & Operated · Since 2024",
  phone: "(956) 460-1498",
  location: "Edinburg, TX",
  region: "Rio Grande Valley",
  founders: "Simón & Joelda Elizondo",
  facebookLabel: "Message on Facebook",
} as const;

export const nav = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#story" },
  { label: "Shop", href: "#products" },
  { label: "Events", href: "#markets" },
  { label: "FAQ", href: "#" },
  { label: "Contact", href: "#footer" },
];

export const benefits: Benefit[] = [
  {
    title: "Raw & Unfiltered",
    desc: "Never heated or over-processed, so every enzyme, antioxidant and trace of pollen stays intact.",
  },
  {
    title: "From Our Own Hives",
    desc: "Harvested on our family farm in the Rio Grande Valley — traceable from flower to jar.",
  },
  {
    title: "Seasonal Wellness",
    desc: "Local pollen and natural antioxidants that support your body the way nature intended.",
  },
  {
    title: "One Pure Ingredient",
    desc: "100% pure raw honey. Nothing added, nothing taken away — ever.",
  },
];

export const benefitsNumbered: NumberedBenefit[] = benefits.map((b, i) => ({
  ...b,
  num: "0" + (i + 1),
}));

export const products: Product[] = [
  {
    name: "Wildflower",
    variety: "Raw honey · 12 oz",
    price: "$14",
    tag: "Bestseller",
    img: "/assets/gen-wildflower.png",
    pos: "center 42%",
  },
  {
    name: "Mesquite Reserve",
    variety: "Raw honey · 16 oz",
    price: "$18",
    tag: "Local favorite",
    img: "/assets/gen-mesquite.png",
    pos: "center 45%",
  },
  {
    name: "Citrus Blossom",
    variety: "Raw honey · 12 oz",
    price: "$15",
    tag: "Seasonal",
    img: "/assets/gen-citrus.png",
    pos: "center 45%",
  },
  {
    name: "Dark & Bold",
    variety: "Raw honey · 16 oz",
    price: "$19",
    tag: "Robust",
    img: "/assets/gen-darkbold.png",
    pos: "center 45%",
  },
  {
    name: "Honeycomb Soap",
    variety: "Beeswax · handmade",
    price: "$9",
    tag: "Handmade",
    img: "/assets/gen-soap.png",
    pos: "center 52%",
  },
  {
    name: "Pure Honey Candle",
    variety: "Beeswax · 8 oz",
    price: "$16",
    tag: "For the home",
    img: "/assets/gen-candle.png",
    pos: "center 50%",
  },
];

export const productsFeatured = products.slice(0, 3);

export const testimonials: Testimonial[] = [
  {
    quote:
      "The most floral, delicate honey I've ever tasted. You can tell it's the real thing.",
    name: "Marisol G.",
    role: "McAllen, TX",
  },
  {
    quote:
      "We buy three jars every single market. My kids won't touch store honey anymore.",
    name: "David R.",
    role: "Edinburg, TX",
  },
  {
    quote:
      "So kind at their booth, and the honey is unreal. A true Valley treasure.",
    name: "Ana T.",
    role: "Pharr, TX",
  },
];

export const events: MarketEvent[] = [
  {
    day: "09",
    month: "Aug",
    name: "The Landmark Farmers Market",
    place: "Alamo, TX",
    time: "Sun 11am–3pm",
  },
  {
    day: "16",
    month: "Aug",
    name: "Pulse Wellness Market",
    place: "McAllen, TX",
    time: "Sat 9am–1pm",
  },
  {
    day: "23",
    month: "Aug",
    name: "Fireman's Park Market",
    place: "McAllen, TX",
    time: "Sat 9am–12pm",
  },
  {
    day: "06",
    month: "Sep",
    name: "Midsummer Night Market",
    place: "Edinburg, TX",
    time: "Fri 5–9pm",
  },
];

/** Shared honeycomb pattern as an inline SVG data URI. */
export function honeycomb(opacity = 0.16, stroke = "e0a94a") {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='104' viewBox='0 0 60 104'><g fill='none' stroke='%23${stroke}' stroke-opacity='${opacity}' stroke-width='1.4'><path d='M30 2 L56 17 L56 47 L30 62 L4 47 L4 17 Z'/><path d='M30 54 L56 69 L56 99 L30 114 L4 99 L4 69 Z'/></g></svg>`;
  return `url("data:image/svg+xml,${svg}")`;
}
