# Sweet Essence

Marketing home page for **Sweet Essence** — a family-run raw-honey business in
the Rio Grande Valley (Edinburg, TX). Built from the `Sweet Essence Home`
Claude Design concept, which explored three home-page directions. All three
ship here behind a live switcher.

## Stack

- **Next.js 15.5** (App Router) · **React 19.1** · **TypeScript 5.7**
- **Tailwind CSS 4** via `@tailwindcss/postcss` (CSS-first `@theme` tokens)
- **Framer Motion** (scroll reveals, switcher crossfade)
- **lucide-react**, **clsx**, **tailwind-merge**
- Fonts self-hosted with `next/font`: Cormorant Garamond, Playfair Display, Manrope

## The three directions

A floating switcher (bottom center) toggles between:

1. **Editorial** — light cream palette, split hero, Cormorant Garamond
2. **Organic** — warm linen, rounded cards, soft shadows, centered hero
3. **Bold** — dark espresso, Playfair Display, dramatic "liquid gold"

The active direction is mirrored to the URL (`/?design=2`) so refreshes and
shared links keep the same look.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Project structure

```
src/
  app/
    layout.tsx            # fonts, metadata, skip-link
    page.tsx             # renders the client HomeExperience
    globals.css          # Tailwind @theme tokens, keyframes, base
  components/
    HomeExperience.tsx    # owns active direction + URL sync
    DesignSwitcher.tsx    # floating direction toggle
    directions/
      editorial/EditorialHome.tsx
      organic/OrganicHome.tsx
      bold/BoldHome.tsx
    ui/
      Reveal.tsx          # scroll fade-up (reduced-motion aware)
      AssetImage.tsx      # next/image on a honey-gradient backing
      MobileMenu.tsx       # accessible hamburger nav (< lg)
  lib/
    content.ts           # all page copy (products, benefits, events…)
    types.ts
    utils.ts             # cn()
public/assets/           # product & hero imagery — see assets/README.md
```

## Notes

- **Imagery** — the design's photos live in the Claude Design project; drop the
  matching PNGs into `public/assets/` (filenames listed in
  `public/assets/README.md`). Frames render on a honey-gradient fallback until
  then.
- **Responsiveness** — the mockup was desktop-only; layouts are made mobile-first
  here, including a hamburger nav the design didn't specify.
- **Accessibility** — semantic landmarks, skip link, focus-visible rings,
  keyboard-operable menu and switcher (`aria-pressed`), and full
  `prefers-reduced-motion` support. A couple of gold/muted text shades were
  nudged for WCAG AA contrast.
- **Links** — nav/CTAs scroll to in-page sections where they exist; `Add to
  cart`, `FAQ`, and social links are placeholders (no commerce backend).
