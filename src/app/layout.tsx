import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sweetessence.example"),
  title: {
    default: "Sweet Essence · Pure Raw Honey from the Rio Grande Valley",
    template: "%s · Sweet Essence",
  },
  description:
    "100% pure raw honey, hand-harvested on our family farm in Edinburg, Texas. Never heated, never filtered. Just one pure ingredient.",
  keywords: [
    "raw honey",
    "Rio Grande Valley honey",
    "Texas honey",
    "family farm",
    "unfiltered honey",
    "Edinburg TX",
  ],
  openGraph: {
    title: "Sweet Essence · Pure Raw Honey",
    description:
      "Raw, unfiltered honey from our family farm in the Rio Grande Valley.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${cormorant.variable} ${playfair.variable}`}
      >
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
