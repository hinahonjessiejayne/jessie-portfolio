import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarCheck, Cpu, ScanFace } from 'lucide-react';
import { HEX_CLIP, PROFILE_IMAGE } from '../constants';
import { scrollToSection } from '../lib/smoothScroll';

/**
 * Hero: one promise, three checkable numbers, one booking button.
 *
 * The portrait keeps the site's original round frame — two counter-spinning
 * rings, a scan line and the two floating badges — untouched from the first
 * build. The honey lives elsewhere on the page.
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

          {/* The original round frame. */}
          <motion.div
            className="order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 group perspective-1000">
              <div className="absolute inset-0 border border-brand-400/30 rounded-full scale-110 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-0 border border-dashed border-brand-400/20 rounded-full scale-125 animate-[spin_15s_linear_infinite_reverse]" />

              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-brand-500/30 shadow-[0_0_50px_rgba(212,175,55,0.2)] z-10 bg-gray-900 group-hover:shadow-[0_0_80px_rgba(212,175,55,0.5)] transition-all duration-500">
                <img
                  src={imageError ? AVATAR_FALLBACK : PROFILE_IMAGE}
                  onError={() => setImageError(true)}
                  referrerPolicy="no-referrer"
                  alt="Jessie Hinahon"
                  className="w-full h-full object-cover object-center transition-transform duration-700 filter contrast-110 brightness-110 saturate-125"
                />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,11,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-30 pointer-events-none opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-400/30 to-transparent z-40 animate-scan opacity-60" />
                <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] z-50 rounded-full" />
              </div>

              <div className="absolute -top-4 -right-4 w-12 h-12 bg-brand-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000" />

              <motion.div
                className="absolute top-10 -left-10 md:-left-12 bg-white/90 dark:bg-dark-card/90 backdrop-blur-md p-3 rounded-lg border border-brand-400/30 shadow-xl z-50"
                animate={{ y: [-10, 10, -10], rotate: [-6, -3, -6] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Cpu className="w-6 h-6 text-brand-600 dark:text-brand-400" />
              </motion.div>

              <motion.div
                className="absolute bottom-20 -right-6 md:-right-8 bg-white/90 dark:bg-dark-card/90 backdrop-blur-md p-3 rounded-lg border border-brand-400/30 shadow-xl z-50"
                animate={{ y: [10, -10, 10], rotate: [12, 9, 12] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              >
                <ScanFace className="w-6 h-6 text-brand-600 dark:text-brand-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
