"use client";

import { AssetImage } from "@/components/ui/AssetImage";
import { MobileMenu } from "@/components/ui/MobileMenu";
import { Reveal } from "@/components/ui/Reveal";
import {
  benefits,
  events,
  honeycomb,
  nav,
  products,
  site,
  testimonials,
} from "@/lib/content";

const HEX = "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)";

// Organic drops FAQ from its primary nav (matches the mockup).
const organicNav = nav.filter((n) => n.label !== "FAQ" && n.label !== "Home");

/**
 * Direction 2 — "Organic".
 * Warm linen palette, rounded cards, soft shadows, centered hero.
 */
export function OrganicHome() {
  return (
    <div id="top" className="overflow-hidden bg-linen text-cocoa-ink">
      {/* NAV */}
      <nav className="sticky top-0 z-40 flex items-center justify-between bg-linen/[.92] px-[6vw] py-[22px] backdrop-blur-md">
        <a href="#top" className="flex items-center gap-3">
          <span
            className="flex h-12 w-[42px] items-center justify-center bg-amber"
            style={{ clipPath: HEX }}
          >
            <span className="font-serif text-[19px] font-bold text-white">
              SE
            </span>
          </span>
          <span className="font-serif text-2xl font-bold">Sweet Essence</span>
        </a>
        <div className="hidden items-center gap-[30px] text-[15px] font-medium lg:flex">
          {organicNav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-gold-link"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#products"
            className="rounded-full bg-amber px-[26px] py-3 font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Shop Now
          </a>
        </div>
        <MobileMenu
          items={nav.filter((n) => n.label !== "Home")}
          triggerClassName="text-cocoa-ink hover:bg-cocoa-ink/5"
          panelClassName="border border-cocoa-ink/10 bg-white"
          linkClassName="text-cocoa-ink hover:bg-linen"
        />
      </nav>

      {/* HERO */}
      <section
        className="relative px-[6vw] pb-[9vh] pt-[11vh] text-center"
        style={{
          backgroundImage: honeycomb(0.12, "c68a2e"),
          backgroundSize: "60px 104px",
        }}
      >
        <Reveal className="mx-auto max-w-[780px]">
          <span className="mb-[26px] inline-block rounded-full bg-white px-5 py-[9px] text-[13px] font-semibold tracking-[1px] text-gold-link shadow-sm">
            🍯 100% Pure Raw Honey · Rio Grande Valley
          </span>
          <h1 className="mb-6 font-serif text-[clamp(44px,6.5vw,86px)] font-bold leading-[1.02]">
            Honey the way
            <br />
            nature made it.
          </h1>
          <p className="mx-auto mb-9 max-w-[540px] text-[20px] font-light leading-[1.7] text-bark">
            Raw, unfiltered, and harvested on our own family farm. Every jar is a
            taste of the Valley in bloom.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#products"
              className="rounded-full bg-amber px-[38px] py-[17px] text-base font-semibold text-white shadow-[0_16px_30px_-12px_rgba(198,138,46,.6)] transition-transform hover:-translate-y-0.5"
            >
              Shop Now
            </a>
            <a
              href="#markets"
              className="rounded-full bg-white px-[38px] py-[17px] text-base font-semibold text-cocoa-ink shadow-sm transition-transform hover:-translate-y-0.5"
            >
              Find Us at Our Next Market
            </a>
          </div>
        </Reveal>
        <Reveal
          delay={0.15}
          className="mx-auto mt-[60px] h-[280px] max-w-[1000px] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-40px_rgba(51,38,26,.4)] sm:h-[360px] md:h-[460px]"
        >
          <AssetImage
            src="/assets/gen-texture.png"
            alt="Raw honeycomb dripping with fresh honey"
            position="center 50%"
            sizes="(max-width: 1000px) 88vw, 1000px"
            priority
          />
        </Reveal>
      </section>

      {/* BENEFITS */}
      <section className="px-[6vw] py-[8vh]">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08}>
              <div className="h-full rounded-[22px] bg-white px-[26px] py-8 shadow-[0_20px_40px_-30px_rgba(51,38,26,.3)]">
                <div className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-butter">
                  <div
                    className="h-[25px] w-[22px] bg-amber"
                    style={{ clipPath: HEX }}
                  />
                </div>
                <h3 className="mb-2.5 text-[19px] font-bold">{b.title}</h3>
                <p className="text-[15px] font-light leading-[1.6] text-bark">
                  {b.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="px-[6vw] pb-[8vh] pt-[4vh]">
        <div className="mb-[46px] text-center">
          <h2 className="mb-2.5 font-serif text-[clamp(34px,4.5vw,56px)] font-bold">
            Our favorites
          </h2>
          <p className="text-[17px] text-bark">
            Small-batch honey, beeswax soaps, and pure honey candles.
          </p>
        </div>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 0.08}>
              <article className="overflow-hidden rounded-[24px] bg-white shadow-[0_20px_44px_-34px_rgba(51,38,26,.4)] transition-transform duration-300 hover:-translate-y-2">
                <div className="relative h-[280px]">
                  <AssetImage src={p.img} alt={p.name} position={p.pos} />
                  <span className="absolute left-3.5 top-3.5 z-[2] rounded-full bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.8px] text-gold-link">
                    {p.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="mb-[3px] text-xl font-bold">{p.name}</h3>
                  <p className="mb-4 text-sm text-taupe-aa">{p.variety}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[19px] font-bold text-amber">
                      {p.price}
                    </span>
                    <a
                      href="#products"
                      className="rounded-full bg-cocoa-ink px-[22px] py-[11px] text-sm font-semibold text-white transition-opacity hover:opacity-90"
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

      {/* FARM STORY */}
      <section id="story" className="px-[6vw] pb-[8vh] pt-[4vh]">
        <div className="grid items-center gap-[50px] rounded-[30px] bg-white px-[4vw] py-[5vh] lg:grid-cols-2">
          <Reveal className="h-[300px] overflow-hidden rounded-[22px] sm:h-[380px] lg:h-[440px]">
            <AssetImage
              src="/assets/gen-apiary.png"
              alt="Sweet Essence beehives on the family farm in the Rio Grande Valley"
              position="center 55%"
              sizes="(max-width: 1024px) 92vw, 45vw"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <span className="text-[13px] font-semibold uppercase tracking-[3px] text-gold-link">
              From our hives to your table
            </span>
            <h2 className="mb-5 mt-4 font-serif text-[clamp(30px,3.6vw,46px)] font-bold leading-[1.1]">
              A family farm, buzzing with life.
            </h2>
            <p className="mb-7 text-[17px] font-light leading-[1.8] text-bark">
              Founded by {site.founders}, we tend every hive ourselves on our
              farm in the Rio Grande Valley. No middlemen, no processing plants —
              just our family, our bees, and honey poured fresh into every jar.
            </p>
            <a
              href="#story"
              className="inline-block rounded-full bg-amber px-8 py-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Meet the beekeepers
            </a>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-[6vw] pb-[8vh] pt-[4vh] text-center">
        <h2 className="mb-11 font-serif text-[clamp(32px,4vw,50px)] font-bold">
          What our neighbors say
        </h2>
        <div className="grid gap-[26px] md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="h-full rounded-[24px] bg-white px-[30px] py-[34px] text-left shadow-[0_20px_44px_-34px_rgba(51,38,26,.35)]">
                <div
                  className="mb-4 text-[19px] tracking-[3px] text-honey"
                  aria-label="5 out of 5 stars"
                >
                  ★★★★★
                </div>
                <blockquote className="mb-5 text-[17px] leading-[1.6] text-cocoa-ink">
                  “{t.quote}”
                </blockquote>
                <figcaption>
                  <div className="text-[15px] font-bold">{t.name}</div>
                  <div className="text-[13px] text-taupe-aa">{t.role}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MARKETS */}
      <section id="markets" className="px-[6vw] pb-[9vh] pt-[4vh]">
        <div className="mb-10 text-center">
          <h2 className="mb-2.5 font-serif text-[clamp(32px,4vw,50px)] font-bold">
            Come say hello
          </h2>
          <p className="text-[17px] text-bark">
            Catch us at markets and pop-ups across the Valley.
          </p>
        </div>
        <div className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
          {events.map((e, i) => (
            <Reveal key={e.name} delay={(i % 4) * 0.06}>
              <div className="h-full rounded-[22px] bg-white px-6 py-7 shadow-[0_20px_40px_-34px_rgba(51,38,26,.35)]">
                <div className="mb-[18px] inline-flex flex-col items-center rounded-2xl bg-butter px-[18px] py-3">
                  <span className="font-serif text-[32px] font-bold leading-none text-cocoa-ink">
                    {e.day}
                  </span>
                  <span className="text-[11px] font-bold tracking-[2px] text-gold-link">
                    {e.month}
                  </span>
                </div>
                <h3 className="mb-1.5 text-[17px] font-bold">{e.name}</h3>
                <p className="text-sm text-bark">{e.place}</p>
                <p className="mt-1 text-sm text-taupe-aa">{e.time}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="footer"
        className="rounded-t-[40px] bg-cocoa-ink px-[6vw] pb-[4vh] pt-[7vh] text-sand"
      >
        <div className="grid gap-10 border-b border-honey/20 pb-[4vh] md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <span className="font-serif text-[28px] font-bold text-white">
              Sweet Essence
            </span>
            <p className="mt-4 max-w-[320px] font-light leading-[1.7]">
              Pure raw honey from our family farm in Edinburg, Texas.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-[13px] uppercase tracking-[2px] text-honey">
              Shop
            </h4>
            <div className="flex flex-col gap-[11px] text-[15px]">
              <a href="#products" className="text-sand hover:text-honey">Honey</a>
              <a href="#products" className="text-sand hover:text-honey">Soaps</a>
              <a href="#products" className="text-sand hover:text-honey">Candles</a>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-[13px] uppercase tracking-[2px] text-honey">
              Contact
            </h4>
            <div className="flex flex-col gap-[11px] text-[15px]">
              <a href={`tel:${site.phone.replace(/[^\d]/g, "")}`} className="text-sand hover:text-honey">
                {site.phone}
              </a>
              <span>{site.location}</span>
            </div>
          </div>
        </div>
        <div className="pt-[26px] text-[13px]">
          © 2026 Sweet Essence · Family Owned &amp; Operated since 2024
        </div>
      </footer>
    </div>
  );
}
