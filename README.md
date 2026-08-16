# Jessie Hinahon — Portfolio

A pixel-faithful rebuild of [jessiecalm.com](https://www.jessiecalm.com) as a proper
React + Vite + TypeScript project with a real Tailwind build (the original shipped
the Tailwind CDN + an inline config in `index.html`).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build
npm run typecheck
```

## Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + Vite 6 + TypeScript (strict) |
| Styling | Tailwind CSS 3.4, `darkMode: 'class'` |
| Animation | Framer Motion 11 |
| Icons | lucide-react |

## Design system

Ported verbatim from the live site's inline `tailwind.config`.

### Colors

| Token | Value |
|---|---|
| `brand.400` (gold, primary accent) | `#D4AF37` |
| `brand.300` / `brand.500` / `brand.600` | `#E0CB70` / `#B5952F` / `#967B27` |
| `dark.bg` / `dark.surface` / `dark.card` | `#050505` / `#0F0F0F` / `#181818` |
| `dark.border` / `dark.text` / `dark.muted` | `#272727` / `#E0E0E0` / `#A0A0A0` |
| `light.bg` / `light.surface` / `light.card` | `#FAFAFA` / `#F4F4F5` / `#FFFFFF` |
| `light.border` / `light.text` / `light.muted` | `#E4E4E7` / `#18181B` / `#71717A` |

### Typography

| Role | Family |
|---|---|
| Body / UI | Inter (300–800) |
| Display headings, italic accents | Playfair Display (700) |
| Eyebrows, badges, metadata | Fira Code (400–500) |

Section eyebrows are `font-mono text-xs tracking-widest` in gold; section titles are
`font-serif` at `text-3xl md:text-4xl`.

## Effects

| Effect | Implementation |
|---|---|
| Hexagon cursor field | `HexGrid.tsx` — full-viewport canvas, hex radius 25, spacing `√3·r` × `1.5·r`, odd rows offset by half. Stroke opacity lerps `0.04 → 0.6` by `(1 − dist/350)²`; fills at `intensity × 0.15`. Redrawn every rAF. |
| Click ripple | `App.tsx` — a `div.click-particle` appended at the pointer on every window click, animated by the `ripple` keyframe (0 → 50px, border 4px → 0) and removed after 800ms. |
| Rotating headline | `Hero.tsx` — 5s hold, 500ms opacity fade, then swap between the two taglines. Fixed `min-h` prevents layout shift. |
| Avatar "scanner" | Two counter-rotating rings (`spin` 10s / 15s reverse), a CRT scanline gradient at 40% opacity, a gold `animate-scan` sweep bar, and an inset vignette. |
| Floating badges | Framer Motion infinite `y`/`rotate` keyframes at 6s and 7s with a 1s offset. |
| Portfolio tabs | Framer Motion `layoutId="activeTab"` — the gold pill springs between N8N / Zapier / GHL. |
| Card grid swap | `AnimatePresence mode="wait"` keyed on the active category. |
| Reveal on scroll | Framer Motion `whileInView` with `viewport={{ once: true }}` throughout. |
| Glass nav | `.liquid-glass` — `backdrop-filter: blur(16px)` over `rgba(255,255,255,.05)`, `rgba(0,0,0,.4)` in dark. |
| Theme | Class-based, persisted to `localStorage.theme`, defaults to `prefers-color-scheme`. |

## Structure

```
src/
├─ App.tsx              theme state, click ripple, fixed background layer
├─ constants.ts         all copy, projects, services, experience, testimonials
├─ types.ts
├─ lib/smoothScroll.ts  shared anchor scrolling (80px header offset)
└─ components/
   ├─ Header.tsx        glass pill nav, scrollspy, mobile sheet
   ├─ Hero.tsx          rotating headline, scanner avatar
   ├─ Services.tsx      6 capability cards, staggered spring reveal
   ├─ Experience.tsx    timeline + education node
   ├─ Portfolio.tsx     category tabs, cards, lightbox modal
   ├─ Testimonials.tsx
   ├─ Scheduler.tsx     Fillout booking iframe
   ├─ Contact.tsx
   ├─ Footer.tsx
   └─ HexGrid.tsx       canvas cursor field
```

## Deliberate deviations from the live site

Both are fixes for classes the original references but never loaded, so nothing that
renders today changes:

1. **`tailwindcss-animate` is installed.** The original mobile menu uses
   `animate-in slide-in-from-top-4 fade-in`, which the Tailwind CDN build doesn't
   provide — those classes were inert. The menu now actually slides in.
2. **`animation-delay-2000`** on the hero's blue blur is left in place for parity. It
   was never a real utility on the original either, so both blurs pulse in sync.

Content, colors, spacing, animation timings, and section order are otherwise identical
to production.

## Notes

- Project screenshots and the profile photo are hot-linked (imgur, Google user content),
  same as the original. Consider moving them into `public/` before deploying.
- "Download Full Resume" in the Experience section points at `#` on the live site — still
  a stub here.
