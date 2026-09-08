import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarCheck } from 'lucide-react';
import { HEX_CLIP, PROFILE_IMAGE } from '../constants';
import { scrollToSection } from '../lib/smoothScroll';

/**
 * Hero: one promise, three checkable numbers, one booking button.
 *
 * The honey note here is a rosette — the portrait is the queen cell, clipped
 * to a hexagon, ringed by comb cells that fill and warm in turn. That is
 * deliberately not the booking section's frame, the service cards' fill, the
 * timeline's rail or the footer's edge.
 *
 * Every figure below is traceable to this site: PROOF counts come from
 * `src/data/projects.json`, and the hours figure is the metric carried on the
 * AI Appointment Setter card. Nothing here is estimated — if the portfolio
 * changes, update PROOF with it.
 */

const AVATAR_FALLBACK =
  'https://ui-avatars.com/api/?name=Jessie+Hinahon&background=0F0F0F&color=D4AF37&size=512&font-size=0.3';

const PROOF = [
  { figure: '22', label: 'builds in the portfolio' },
  { figure: '9', label: 'on GoHighLevel' },
  { figure: '27 hrs', label: 'saved weekly by one booking workflow' },
];

/**
 * Six cells straddling the portrait hexagon's own vertices, so each one
 * overhangs by no more than half its width and can never reach the viewport
 * edge. Positions are literal classes because Tailwind only generates what it
 * can read in source.
 */
const ROSETTE = [
  { position: 'left-1/2 top-0', filled: true, delay: '' },
  { position: 'left-full top-1/4', filled: false, delay: '[animation-delay:0.7s]' },
  { position: 'left-full top-3/4', filled: true, delay: '[animation-delay:1.4s]' },
  { position: 'left-1/2 top-full', filled: false, delay: '[animation-delay:2.1s]' },
  { position: 'left-0 top-3/4', filled: true, delay: '[animation-delay:2.8s]' },
  { position: 'left-0 top-1/4', filled: false, delay: '[animation-delay:3.5s]' },
];

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

          {/* The queen cell, ringed by comb. */}
          <motion.div
            className="order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative h-64 w-56 md:h-[22rem] md:w-80 lg:h-[26rem] lg:w-[22.5rem]">
              {/* Portrait, clipped to the cell it sits in. */}
              <div className={`absolute inset-0 bg-brand-500/50 ${HEX_CLIP}`}>
                <div className={`absolute inset-[3px] bg-dark-bg ${HEX_CLIP}`}>
                  <img
                    src={imageError ? AVATAR_FALLBACK : PROFILE_IMAGE}
                    onError={() => setImageError(true)}
                    referrerPolicy="no-referrer"
                    alt="Jessie Hinahon"
                    className="h-full w-full object-cover object-center"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
                  />
                </div>
              </div>
              {ROSETTE.map((cell) => (
                <span
                  key={cell.position}
                  aria-hidden="true"
                  className={`absolute z-10 h-9 w-8 -translate-x-1/2 -translate-y-1/2 md:h-12 md:w-11 ${cell.position}`}
                >
                  <span className={`absolute inset-0 bg-brand-500/40 ${HEX_CLIP}`} />
                  <span
                    className={`absolute inset-[1.5px] bg-light-bg dark:bg-dark-bg ${HEX_CLIP}`}
                  >
                    {cell.filled && (
                      <span
                        className={`absolute inset-x-0 bottom-0 h-3/5 animate-honey-fill bg-gradient-to-t from-brand-500 to-brand-300 motion-reduce:animate-none ${cell.delay}`}
                      />
                    )}
                  </span>
                </span>
              ))}

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
