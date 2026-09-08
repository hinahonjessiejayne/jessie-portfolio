import { motion } from 'framer-motion';
import { SCHEDULER_URL } from '../constants';

/**
 * Booking section, framed as a honeycomb cell.
 *
 * Two shapes, because the embed decides its own layout from its width: at
 * roughly 1190px and up it puts the details beside the calendar and needs only
 * ~520px of height, and below that it stacks them and needs ~700px. Splitting
 * at `xl` keeps it from scrolling inside its own frame either way.
 *
 * The calendar itself is a third-party embed, so the styling here works on the
 * frame around it: a gold comb ring, cells that warm through as if filling,
 * and honey gathering at the lower lip. Decoration is aria-hidden and drops to
 * static under `prefers-reduced-motion`. The embed's own background colour is
 * set in Fillout, not here.
 */

/** Pointy-top hexagon, for the corner cells. */
const HEX_CLIP =
  '[clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]';

/** Where honey gathers along the bottom lip, and how far each lags. */
const DRIPS = [
  { position: 'left-[18%]', delay: '' },
  { position: 'left-[47%]', delay: '[animation-delay:1.2s]' },
  { position: 'left-[78%]', delay: '[animation-delay:2.4s]' },
];

/** Corner cells that pulse, each a beat behind the last. */
const CELLS = [
  { position: '-left-5 top-10 h-10 w-9', delay: '' },
  { position: '-right-4 top-24 h-8 w-7', delay: '[animation-delay:1s]' },
  { position: '-left-3 bottom-16 h-8 w-7', delay: '[animation-delay:2s]' },
  { position: '-right-6 bottom-24 h-11 w-10', delay: '[animation-delay:3s]' },
];

const Scheduler = () => (
  <section id="calendar" className="relative py-20 md:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="mb-3 font-mono text-xs font-medium tracking-widest text-brand-500 dark:text-brand-400">
          AVAILABILITY
        </h2>
        <h3 className="font-serif text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          Schedule a Meeting
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-sm text-light-muted dark:text-dark-muted md:text-base">
          Pick a slot that suits you. Thirty minutes, no charge, no pitch deck.
        </p>
      </motion.div>

      <motion.div
        className="relative mx-auto max-w-2xl xl:max-w-none"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Warm bloom behind the cell. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-brand-400/10 blur-2xl dark:bg-brand-400/[0.07]"
        />

        {/* Corner cells, warming through. */}
        {CELLS.map((cell) => (
          <span
            key={cell.position}
            aria-hidden="true"
            className={`pointer-events-none absolute hidden animate-honey-fill bg-brand-400 motion-reduce:animate-none md:block ${cell.position} ${HEX_CLIP} ${cell.delay}`}
          />
        ))}

        {/* The comb ring: hex mesh in the padding, gold keyline, warm glow. */}
        <div className="relative overflow-hidden rounded-2xl border border-brand-500/30 bg-brand-400/[0.06] p-2 shadow-[0_24px_70px_-30px_rgba(212,175,55,0.45)] dark:border-brand-400/25 md:p-3">
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full text-brand-500/25 dark:text-brand-400/20"
          >
            <defs>
              {/* Pointy-top hexes, r=10: tile is √3·r wide by 3r tall, odd rows offset. */}
              <pattern id="comb" width="17.32" height="30" patternUnits="userSpaceOnUse">
                <path
                  d="M8.66 0 L17.32 5 L17.32 15 L8.66 20 L0 15 L0 5 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <path
                  d="M17.32 15 L25.98 20 L25.98 30 L17.32 35 L8.66 30 L8.66 20 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <path
                  d="M0 15 L8.66 20 L8.66 30 L0 35 L-8.66 30 L-8.66 20 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#comb)" />
          </svg>

          <iframe
            src={SCHEDULER_URL}
            title="Schedule a meeting with Jessie"
            loading="lazy"
            className="relative block h-[700px] w-full rounded-xl border-0 bg-white dark:bg-dark-card xl:h-[520px]"
          />
        </div>

        {/* Honey at the lower lip, and the bead that leaves. */}
        {DRIPS.map((drip) => (
          <span
            key={drip.position}
            aria-hidden="true"
            className={`pointer-events-none absolute top-full hidden -translate-y-1 md:block ${drip.position}`}
          >
            <span
              className={`block h-6 w-2 origin-top rounded-b-full bg-gradient-to-b from-brand-500/70 to-brand-300 animate-drip motion-reduce:animate-none ${drip.delay}`}
            />
            <span
              className={`mx-auto mt-1 block h-2 w-2 rounded-full bg-brand-300 shadow-[0_0_10px_rgba(212,175,55,0.7)] animate-droplet motion-reduce:hidden ${drip.delay}`}
            />
          </span>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Scheduler;
