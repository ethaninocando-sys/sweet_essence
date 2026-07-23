"use client";

import { AssetImage } from "@/components/ui/AssetImage";
import { MobileMenu } from "@/components/ui/MobileMenu";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollVideo } from "@/components/ui/ScrollVideo";
import {
  benefitsNumbered,
  events,
  nav,
  products,
  site,
  testimonials,
} from "@/lib/content";
import { CinematicHero } from "./CinematicHero";

const HEX = "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)";
const cineNav = nav.filter((n) => n.label !== "Home" && n.label !== "FAQ");

/**
 * Direction 4 — "Cinematic".
 * Near-black theatre, a WebGL/three.js hero that plays the honey film through
 * a grain + vignette + parallax shader, framed with letterbox bars.
 */
export function CinematicHome() {
  return (
    <div id="top" className="overflow-hidden bg-espresso text-parchment-2">
      {/* NAV */}
      <nav className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-[6vw] py-6">
        <a href="#top" className="flex items-center gap-3">
          <span
            className="flex h-11 w-[38px] items-center justify-center border-[1.5px] border-honey"
            style={{ clipPath: HEX }}
          >
            <span className="font-display text-base font-bold text-honey">SE</span>
          </span>
          <span className="font-display text-[19px] font-bold tracking-[3px] text-white">
            SWEET ESSENCE
          </span>
        </a>
        <div className="hidden items-center gap-8 text-[12px] font-semibold uppercase tracking-[2px] lg:flex">
          {cineNav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sand transition-colors hover:text-honey"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#products"
            className="rounded-full border border-honey/60 px-[22px] py-2.5 font-bold text-honey transition-colors hover:bg-honey hover:text-espresso"
          >
            Shop Now
          </a>
        </div>
        <MobileMenu
          items={cineNav}
          triggerClassName="text-honey hover:bg-honey/10"
          panelClassName="border border-honey/20 bg-espresso-card"
          linkClassName="text-sand hover:bg-honey/10 uppercase tracking-wide text-[13px] font-semibold"
        />
      </nav>

      {/* HERO — scroll-scrubbed honey film (WebGL + GSAP pinned scrub) */}
      <CinematicHero />

      {/* BENEFITS — filmstrip */}
      <section className="border-t border-honey/[.14] px-[6vw] py-[8vh]">
        <div className="grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
          {benefitsNumbered.map((b, i) => (
            <Reveal
              key={b.title}
              delay={i * 0.08}
              className="border-l border-honey/[.16] px-6 lg:px-[34px]"
            >
              <div className="mb-4 font-mono text-[13px] tracking-[2px] text-honey">
                {b.num} /
              </div>
              <h3 className="mb-2.5 font-display text-xl font-bold tracking-[.3px] text-white">
                {b.title}
              </h3>
              <p className="text-[15px] font-light leading-[1.65] text-sand">
                {b.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CINEMATIC BAND — the comb */}
      <section className="relative h-[64vh] min-h-[380px] overflow-hidden">
        <div className="absolute inset-0">
          <ScrollVideo
            src="/assets/vid-comb.mp4"
            poster="/assets/gen-comb.png"
            position="center 50%"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-b from-espresso via-espresso/45 to-espresso"
          aria-hidden
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-[12px] uppercase tracking-[5px] text-honey/85">
            Straight from the comb
          </span>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="px-[6vw] pb-[8vh] pt-[5vh]">
        <div className="mb-11 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[12px] uppercase tracking-[4px] text-honey">
              The Collection
            </span>
            <h2 className="mt-3 font-display text-[clamp(34px,4.5vw,58px)] font-bold text-white">
              Signature harvest
            </h2>
          </div>
          <a
            href="#products"
            className="font-mono text-[12px] uppercase tracking-[1px] text-honey hover:text-white"
          >
            All products →
          </a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 0.08}>
              <article className="group overflow-hidden rounded-lg border border-honey/20 bg-espresso-card transition-all duration-300 hover:-translate-y-1.5 hover:border-honey/60">
                <div className="relative h-[300px]">
                  <AssetImage src={p.img} alt={p.name} position={p.pos} />
                  <span className="absolute left-3.5 top-3.5 z-[2] rounded-[3px] border border-honey bg-espresso/55 px-[11px] py-[5px] font-mono text-[10px] uppercase tracking-[1.5px] text-honey backdrop-blur-sm">
                    {p.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="mb-[3px] font-display text-[23px] font-bold text-white">
                    {p.name}
                  </h3>
                  <p className="mb-[18px] text-[13px] tracking-[.3px] text-taupe-light">
                    {p.variety}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-honey">{p.price}</span>
                    <a
                      href="#products"
                      className="rounded border border-honey/50 px-5 py-2.5 text-[13px] font-semibold tracking-[.5px] text-parchment-2 transition-colors hover:border-honey"
                    >
                      Add to cart
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STORY — full-bleed video band */}
      <section id="story" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <ScrollVideo
            src="/assets/vid-hive.mp4"
            poster="/assets/gen-hive.png"
            position="center 50%"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(rgba(33,22,9,.82), rgba(33,22,9,.9))",
          }}
          aria-hidden
        />
        <Reveal className="relative z-[2] mx-auto max-w-[820px] px-[6vw] py-[14vh] text-center">
          <span className="font-mono text-[12px] uppercase tracking-[4px] text-honey">
            Our Story
          </span>
          <h2 className="my-6 font-display text-[clamp(30px,4vw,52px)] font-bold leading-[1.2] text-white">
            Every drop begins on our family farm.
          </h2>
          <p className="mb-9 text-[18px] font-light leading-[1.85] text-sand">
            {site.founders} raise their own bees in the Rio Grande Valley and
            harvest by hand, one frame at a time. From the first bloom to the
            sealed jar, our honey never leaves the family. That&apos;s the
            difference you taste.
          </p>
          <a
            href="#story"
            className="border-b border-honey pb-1 font-mono text-[12px] uppercase tracking-[1px] text-honey"
          >
            Read our story
          </a>
        </Reveal>
      </section>

      {/* CINEMATIC BAND — the pour */}
      <section className="relative h-[64vh] min-h-[380px] overflow-hidden">
        <div className="absolute inset-0">
          <ScrollVideo
            src="/assets/vid-extract.mp4"
            poster="/assets/gen-extract.png"
            position="center 55%"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-b from-espresso via-espresso/45 to-espresso"
          aria-hidden
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-[12px] uppercase tracking-[5px] text-honey/85">
            Poured by hand, jar by jar
          </span>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-[6vw] pb-[8vh] pt-[8vh]">
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="h-full rounded-lg border border-honey/20 px-[30px] py-[34px]">
                <div
                  className="mb-4 text-[19px] tracking-[3px] text-honey"
                  aria-label="5 out of 5 stars"
                >
                  ★★★★★
                </div>
                <blockquote className="mb-[22px] font-display text-[21px] italic leading-[1.5] text-white">
                  “{t.quote}”
                </blockquote>
                <figcaption>
                  <div className="text-[15px] font-bold text-parchment-2">
                    {t.name}
                  </div>
                  <div className="font-mono text-[12px] uppercase tracking-[1px] text-taupe-light">
                    {t.role}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MARKETS */}
      <section id="markets" className="px-[6vw] pb-[9vh] pt-[4vh]">
        <div className="rounded-xl border border-honey/20 bg-[linear-gradient(150deg,#2a1c0d,#211609)] px-[4vw] py-[5vh]">
          <div className="mb-[34px] flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-[clamp(30px,4vw,50px)] font-bold text-white">
              Next markets
            </h2>
            <a
              href="#markets"
              className="rounded-full bg-honey px-[28px] py-3 text-sm font-bold text-espresso transition-transform hover:-translate-y-0.5"
            >
              Full schedule
            </a>
          </div>
          {events.map((e) => (
            <div
              key={e.name}
              className="grid grid-cols-[110px_1fr] items-center gap-6 border-t border-honey/[.16] py-6 sm:grid-cols-[130px_1fr_auto] sm:gap-7"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-display text-[42px] font-bold leading-none text-honey">
                  {e.day}
                </span>
                <span className="font-mono text-xs uppercase tracking-[2px] text-sand">
                  {e.month}
                </span>
              </div>
              <div>
                <h3 className="mb-1 text-[18px] font-bold text-white">{e.name}</h3>
                <p className="text-sm text-sand">
                  {e.place} · {e.time}
                </p>
              </div>
              <a
                href="#markets"
                className="col-span-2 font-mono text-[12px] uppercase tracking-[1px] text-honey sm:col-span-1"
              >
                Details →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="footer"
        className="border-t border-honey/[.14] px-[6vw] pb-[5vh] pt-[8vh]"
      >
        <div className="grid gap-10 border-b border-honey/[.14] pb-[5vh] md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <span className="font-display text-[26px] font-bold tracking-[2px] text-white">
              SWEET ESSENCE
            </span>
            <p className="mt-4 max-w-[340px] font-light leading-[1.7] text-sand">
              Premium 100% pure raw honey, hand-harvested on our family farm in
              Edinburg, Texas.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-[2px] text-honey">
              Explore
            </h4>
            <div className="flex flex-col gap-[11px] text-[15px]">
              <a href="#products" className="text-sand hover:text-honey">Shop</a>
              <a href="#story" className="text-sand hover:text-honey">About</a>
              <a href="#markets" className="text-sand hover:text-honey">Events</a>
              <a href="#" className="text-sand hover:text-honey">FAQ</a>
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-[2px] text-honey">
              Contact
            </h4>
            <div className="flex flex-col gap-[11px] text-[15px] text-sand">
              <a href={`tel:${site.phone.replace(/[^\d]/g, "")}`} className="hover:text-honey">
                {site.phone}
              </a>
              <span>{site.location}</span>
            </div>
          </div>
        </div>
        <div className="pt-[30px] font-mono text-[12px] uppercase tracking-[1px] text-taupe-light">
          © 2026 Sweet Essence · Family Owned &amp; Operated since 2024
        </div>
      </footer>
    </div>
  );
}
