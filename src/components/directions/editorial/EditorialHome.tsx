"use client";

import { AssetImage } from "@/components/ui/AssetImage";
import { MobileMenu } from "@/components/ui/MobileMenu";
import { Reveal } from "@/components/ui/Reveal";
import {
  benefits,
  events,
  honeycomb,
  nav,
  productsFeatured,
  site,
  testimonials,
} from "@/lib/content";

const HEX = "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)";

/**
 * Direction 1 — "Editorial".
 * Light cream palette, split hero, Cormorant Garamond display type.
 */
export function EditorialHome() {
  return (
    <div id="top" className="overflow-hidden bg-cream text-ink">
      {/* NAV */}
      <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-ink/10 bg-cream/90 px-[6vw] py-6 backdrop-blur-md">
        <a href="#top" className="flex items-center gap-3.5">
          <span
            className="flex h-[50px] w-11 items-center justify-center bg-ink"
            style={{ clipPath: HEX }}
          >
            <span className="font-serif text-xl font-semibold tracking-wide text-honey">
              SE
            </span>
          </span>
          <span className="font-serif text-[26px] font-semibold tracking-[3px]">
            SWEET ESSENCE
          </span>
        </a>
        <div className="hidden items-center gap-[34px] text-sm font-medium tracking-[.5px] lg:flex">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-ink transition-colors hover:text-gold-link"
            >
              {item.label}
            </a>
          ))}
        </div>
        <MobileMenu
          items={nav}
          triggerClassName="text-ink hover:bg-ink/5"
          panelClassName="border border-ink/10 bg-cream"
          linkClassName="text-ink hover:bg-ink/5"
        />
      </nav>

      {/* HERO */}
      <section className="grid items-stretch lg:min-h-[84vh] lg:grid-cols-[1.05fr_.95fr]">
        <Reveal className="flex flex-col justify-center px-[6vw] py-[8vh] lg:pr-[5vw]">
          <span className="mb-5 text-[13px] font-semibold uppercase tracking-[4px] text-gold-link">
            {site.tagline}
          </span>
          <h1 className="mb-6 font-serif text-[clamp(46px,6vw,88px)] font-semibold leading-[.98] tracking-[-1px]">
            The pure
            <br />
            <em className="not-italic text-gold">essence</em> of
            <br />
            raw honey.
          </h1>
          <p className="mb-9 max-w-[460px] text-[19px] font-light leading-[1.7] text-cocoa">
            Harvested from our own hives in the Rio Grande Valley. Never heated,
            never filtered. Just one pure ingredient.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#products"
              className="rounded-full bg-ink px-9 py-[17px] text-[15px] font-semibold tracking-[.5px] text-parchment transition-transform hover:-translate-y-0.5"
            >
              Shop Now
            </a>
            <a
              href="#markets"
              className="rounded-full border-[1.5px] border-ink px-9 py-[17px] text-[15px] font-semibold text-ink transition-colors hover:bg-ink hover:text-parchment"
            >
              Find Us at Our Next Market
            </a>
          </div>
        </Reveal>

        <div
          className="relative flex min-h-[440px] items-center justify-center overflow-hidden bg-[linear-gradient(150deg,#2a1c10,#4a3420)]"
        >
          <div
            className="absolute inset-0 opacity-50"
            style={{ backgroundImage: honeycomb(0.16), backgroundSize: "60px 104px" }}
            aria-hidden
          />
          <div className="se-float relative z-[2] h-[460px] w-[320px] max-w-[76vw] overflow-hidden rounded-[18px] border border-honey/30">
            <AssetImage
              src="/assets/gen-hero.png"
              alt="A jar of Sweet Essence raw honey"
              position="center center"
              sizes="(max-width: 1024px) 76vw, 320px"
              priority
            />
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="border-t border-ink/10 px-[6vw] py-[9vh]">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08}>
              <div
                className="mb-5 h-[34px] w-[30px] bg-wheat"
                style={{ clipPath: HEX }}
              />
              <h3 className="mb-3 font-serif text-[25px] font-semibold">
                {b.title}
              </h3>
              <p className="text-[15px] font-light leading-[1.65] text-cocoa">
                {b.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section id="products" className="px-[6vw] pb-[9vh] pt-[4vh]">
        <div className="mb-[46px] flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-serif text-[clamp(34px,4vw,54px)] font-semibold tracking-[-.5px]">
            Featured harvest
          </h2>
          <a
            href="#products"
            className="text-[15px] font-semibold text-gold-link hover:text-ink"
          >
            View all products →
          </a>
        </div>
        <div className="grid gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
          {productsFeatured.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <article className="group overflow-hidden rounded-[20px] border border-ink/[.07] bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_60px_-30px_rgba(42,28,16,.35)]">
                <div className="relative h-[320px]">
                  <AssetImage src={p.img} alt={p.name} position={p.pos} />
                  <span className="absolute left-4 top-4 z-[2] rounded-full bg-ink px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-honey">
                    {p.tag}
                  </span>
                </div>
                <div className="px-6 pb-7 pt-[26px]">
                  <h3 className="mb-1 font-serif text-[27px] font-semibold">
                    {p.name}
                  </h3>
                  <p className="mb-[18px] text-sm text-taupe-aa">{p.variety}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold">{p.price}</span>
                    <a
                      href="#products"
                      className="rounded-full bg-pale px-[22px] py-[11px] text-sm font-semibold text-ink transition-colors hover:bg-wheat"
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

      {/* STORY */}
      <section
        id="story"
        className="relative overflow-hidden bg-[linear-gradient(150deg,#2a1c10,#3a2817)] px-[6vw] py-[12vh] text-center text-parchment"
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{ backgroundImage: honeycomb(0.13), backgroundSize: "60px 104px" }}
          aria-hidden
        />
        <Reveal className="relative z-[2] mx-auto max-w-[760px]">
          <span className="text-[13px] font-semibold uppercase tracking-[4px] text-honey">
            Our Story
          </span>
          <p className="my-7 font-serif text-[clamp(28px,3.4vw,44px)] font-medium leading-[1.3]">
            “We tend every hive on our own family farm in the Valley. From the
            first bloom to the last drop poured, the honey never leaves our
            hands.”
          </p>
          <a
            href="#story"
            className="border-b border-honey pb-[3px] font-semibold text-honey"
          >
            Read our story
          </a>
        </Reveal>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-[6vw] py-[9vh]">
        <h2 className="mb-[46px] text-center font-serif text-[clamp(34px,4vw,54px)] font-semibold">
          Loved across the Valley
        </h2>
        <div className="grid gap-[30px] md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="h-full rounded-[20px] border border-ink/[.07] bg-white px-[30px] py-[34px]">
                <div
                  className="mb-4 text-xl tracking-[3px] text-honey"
                  aria-label="5 out of 5 stars"
                >
                  ★★★★★
                </div>
                <blockquote className="mb-[22px] font-serif text-[22px] italic leading-[1.5]">
                  “{t.quote}”
                </blockquote>
                <figcaption>
                  <div className="text-[15px] font-semibold">{t.name}</div>
                  <div className="text-[13px] text-taupe-aa">{t.role}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MARKETS */}
      <section id="markets" className="px-[6vw] pb-[10vh] pt-[4vh]">
        <div className="rounded-[26px] bg-pale px-[5vw] py-[6vh]">
          <div className="mb-[34px] flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif text-[clamp(30px,3.6vw,48px)] font-semibold">
              Find us at an upcoming market
            </h2>
            <a
              href="#markets"
              className="rounded-full bg-ink px-[30px] py-[15px] text-[15px] font-semibold text-parchment transition-transform hover:-translate-y-0.5"
            >
              See full schedule
            </a>
          </div>
          {events.map((e) => (
            <div
              key={e.name}
              className="grid grid-cols-[64px_1fr] items-center gap-6 border-t border-ink/[.12] py-6 sm:grid-cols-[120px_1fr_auto] sm:gap-7"
            >
              <div className="text-center">
                <div className="font-serif text-[40px] font-semibold leading-none">
                  {e.day}
                </div>
                <div className="text-xs font-semibold uppercase tracking-[2px] text-gold-link">
                  {e.month}
                </div>
              </div>
              <div>
                <h3 className="mb-1 text-[19px] font-semibold">{e.name}</h3>
                <p className="text-sm text-cocoa">
                  {e.place} · {e.time}
                </p>
              </div>
              <a
                href="#markets"
                className="col-span-2 text-sm font-semibold text-gold-link hover:text-ink sm:col-span-1"
              >
                Details →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer id="footer" className="bg-ink px-[6vw] pb-[5vh] pt-[8vh] text-sand-2">
        <div className="grid gap-10 border-b border-honey/20 pb-[5vh] md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <span className="font-serif text-[30px] font-semibold tracking-[3px] text-parchment">
              SWEET ESSENCE
            </span>
            <p className="mt-[18px] max-w-[340px] font-light leading-[1.7]">
              100% pure raw honey, harvested by hand on our family farm in
              Edinburg, Texas.
            </p>
          </div>
          <div>
            <h4 className="mb-[18px] text-[13px] uppercase tracking-[2px] text-honey">
              Explore
            </h4>
            <div className="flex flex-col gap-3 text-[15px]">
              <a href="#products" className="text-sand-2 hover:text-honey">Shop</a>
              <a href="#story" className="text-sand-2 hover:text-honey">About</a>
              <a href="#markets" className="text-sand-2 hover:text-honey">Events</a>
              <a href="#" className="text-sand-2 hover:text-honey">FAQ</a>
            </div>
          </div>
          <div>
            <h4 className="mb-[18px] text-[13px] uppercase tracking-[2px] text-honey">
              Get in touch
            </h4>
            <div className="flex flex-col gap-3 text-[15px]">
              <a href={`tel:${site.phone.replace(/[^\d]/g, "")}`} className="text-sand-2 hover:text-honey">
                {site.phone}
              </a>
              <span>{site.location}</span>
              <a href="#" className="text-sand-2 hover:text-honey">
                {site.facebookLabel}
              </a>
            </div>
          </div>
        </div>
        <div className="pt-[30px] text-[13px]">
          © 2026 Sweet Essence · Family Owned &amp; Operated since 2024
        </div>
      </footer>
    </div>
  );
}
