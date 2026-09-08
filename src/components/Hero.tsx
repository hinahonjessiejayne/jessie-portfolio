import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarCheck } from 'lucide-react';
import { scrollToSection } from '../lib/smoothScroll';

/**
 * Hero: one promise, three checkable numbers, one booking button.
 *
 * No frame around the portrait. The studio background is keyed out of the
 * photo (`public/profile-cutout.png`, alpha) so Jessie stands in front of a
 * comb medallion instead of inside a shape — the shoulders dissolve into the
 * page and a few cells behind him warm through with honey. That is
 * deliberately not the booking section's ring, the service cards' fill, the
 * timeline's rail or the footer's edge.
 *
 * Every figure below is traceable to this site: PROOF counts come from
 * `src/data/projects.json`, and the hours figure is the metric carried on the
 * AI Appointment Setter card. Nothing here is estimated — if the portfolio
 * changes, update PROOF with it.
 */

const PORTRAIT = '/profile-cutout.png';
const AVATAR_FALLBACK =
  'https://ui-avatars.com/api/?name=Jessie+Hinahon&background=0F0F0F&color=D4AF37&size=512&font-size=0.3';

/** Pointy-top hexagon, used for the location bullet. */
const HEX_CLIP =
  '[clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]';

const PROOF = [
  { figure: '22', label: 'builds in the portfolio' },
  { figure: '9', label: 'on GoHighLevel' },
  { figure: '27 hrs', label: 'saved weekly by one booking workflow' },
];

/*
 * The medallion: a 400×400 comb, three full rings around a centre cell plus
 * the six corner cells of a fourth, so the edge reads grown rather than cut.
 * Axial coordinates (q, r) → pixels; the cells listed in FILLED carry honey.
 */
const VIEW = 400;
const CELL = 34;
const ORIGIN = { x: VIEW / 2, y: 212 };
const SQRT3 = Math.sqrt(3);

const hexPoints = (cx: number, cy: number, radius: number) =>
  Array.from({ length: 6 }, (_, k) => {
    const angle = (Math.PI / 180) * (60 * k - 30);
    return `${(cx + radius * Math.cos(angle)).toFixed(1)},${(cy + radius * Math.sin(angle)).toFixed(1)}`;
  }).join(' ');

/** Delay classes are literal so Tailwind can generate them. */
const FILLED = new Map<string, string>([
  ['2,-2', ''],
  ['-2,1', '[animation-delay:0.7s]'],
  ['0,2', '[animation-delay:1.4s]'],
  ['2,0', '[animation-delay:2.1s]'],
  ['-3,3', '[animation-delay:2.8s]'],
  ['0,-3', '[animation-delay:3.5s]'],
]);

const COMB = (() => {
  const cells: { key: string; points: string; delay?: string }[] = [];
  for (let q = -3; q <= 3; q += 1) {
    for (let r = -3; r <= 3; r += 1) {
      const s = -q - r;
      const ring = Math.max(Math.abs(q), Math.abs(r), Math.abs(s));
      if (ring > 3) continue;
      if (ring === 3 && q !== 0 && r !== 0 && s !== 0) continue;
      const cx = ORIGIN.x + SQRT3 * CELL * (q + r / 2);
      const cy = ORIGIN.y + 1.5 * CELL * r;
      const key = `${q},${r}`;
      cells.push({ key, points: hexPoints(cx, cy, CELL - 2.5), delay: FILLED.get(key) });
    }
  }
  return cells;
})();

const CombMedallion = () => (
  <svg
    aria-hidden="true"
    viewBox={`0 0 ${VIEW} ${VIEW}`}
    className="absolute -inset-[10%] h-[120%] w-[120%] text-brand-500/40 dark:text-brand-400/35"
  >
    <defs>
      <radialGradient id="hero-bloom">
        <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
        <stop offset="55%" stopColor="#D4AF37" stopOpacity="0.08" />
        <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="hero-honey" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#B5952F" />
        <stop offset="100%" stopColor="#E0CB70" />
      </linearGradient>
    </defs>
    <circle cx={ORIGIN.x} cy={ORIGIN.y} r={190} fill="url(#hero-bloom)" />
    {COMB.map((cell) => (
      <polygon
        key={cell.key}
        points={cell.points}
        fill={cell.delay === undefined ? 'none' : 'url(#hero-honey)'}
        stroke="currentColor"
        strokeWidth={1.25}
        className={
          cell.delay === undefined
            ? undefined
            : `animate-honey-fill motion-reduce:animate-none ${cell.delay}`
        }
      />
    ))}
  </svg>
);

const Hero = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pb-14 pt-28"
    >
      {/* One warm bloom, brand-only. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/4 -z-10 h-[520px] w-[520px] rounded-full bg-brand-400/10 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[380px] w-[380px] rounded-full bg-brand-600/[0.07] blur-[110px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <motion.div
            className="order-1"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-brand-600 dark:text-brand-400 md:text-xs">
              Jessie Hinahon · AI Automation Specialist
            </p>

            <h1 className="max-w-[19ch] text-balance font-serif text-4xl font-bold leading-[1.08] tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              Your business shouldn’t stop{' '}
              <span className="bg-gradient-to-r from-brand-500 to-brand-300 bg-clip-text italic text-transparent">
                when you log off.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-light-muted dark:text-dark-muted md:text-lg">
              I build the machinery behind it — GoHighLevel, n8n and Zapier — so every
              enquiry gets answered, booked and followed up while you are doing
              something else.
            </p>

            {/* Proof. Three numbers, each checkable further down this page. */}
            <dl className="mt-9 grid max-w-xl grid-cols-3 divide-x divide-brand-500/20 border-y border-brand-500/20 dark:divide-brand-400/15 dark:border-brand-400/15">
              {PROOF.map((item) => (
                <div key={item.label} className="px-3 py-4 first:pl-0">
                  <dt className="font-serif text-2xl font-bold text-brand-600 dark:text-brand-400 md:text-3xl">
                    {item.figure}
                  </dt>
                  <dd className="mt-1 text-[11px] leading-snug text-light-muted dark:text-dark-muted md:text-xs">
                    {item.label}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#calendar"
                onClick={(event) => scrollToSection(event, 'calendar')}
                className="group inline-flex items-center justify-center gap-2 rounded-sm bg-brand-400 px-7 py-3.5 text-base font-bold tracking-wide text-black shadow-[0_0_24px_rgba(212,175,55,0.32)] transition-all hover:bg-brand-300 hover:shadow-[0_0_34px_rgba(212,175,55,0.5)]"
              >
                <CalendarCheck className="h-5 w-5" strokeWidth={2} />
                Book a free 30-min call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#work"
                onClick={(event) => scrollToSection(event, 'work')}
                className="inline-flex items-center justify-center rounded-sm border border-light-border bg-white/50 px-7 py-3.5 text-base font-medium text-gray-900 backdrop-blur-sm transition-all hover:border-brand-400 hover:text-brand-600 dark:border-dark-border dark:bg-dark-surface/50 dark:text-white dark:hover:text-brand-400"
              >
                See the work
              </a>
            </div>

            <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-gray-500">
              <span
                aria-hidden="true"
                className={`h-2.5 w-2 bg-brand-400 ${HEX_CLIP}`}
              />
              Philippines · GMT+8
              <span aria-hidden="true" className="text-brand-500/40">
                /
              </span>
              Open to freelance, contract or full-time
            </p>
          </motion.div>

          {/* Standing in front of the comb, not inside a cell. */}
          <motion.div
            className="order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-square w-64 md:w-80 lg:w-[24rem]">
              <CombMedallion />
              <img
                src={imageError ? AVATAR_FALLBACK : PORTRAIT}
                onError={() => setImageError(true)}
                alt="Jessie Hinahon"
                width={640}
                height={637}
                className={`relative h-full w-full object-contain object-bottom drop-shadow-[0_18px_28px_rgba(0,0,0,0.45)] ${
                  imageError
                    ? 'rounded-full'
                    : 'animate-float motion-reduce:animate-none [mask-image:linear-gradient(to_bottom,#000_70%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_70%,transparent_100%)]'
                }`}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
