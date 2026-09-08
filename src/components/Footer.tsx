import { scrollToSection } from '../lib/smoothScroll';

/**
 * Page footer, shaped like the top edge of a comb.
 *
 * The fourth honey note, and a silhouette rather than a frame, a fill or a
 * rail: the footer's top edge is a row of comb teeth instead of a straight
 * rule, and honey has pooled at the very bottom of the page. Links get a
 * honey underline, and the status marker is a single cell.
 */

/** Pointy-top hexagon, for the status cell. */
const HEX_CLIP =
  '[clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]';

const FOOTER_LINKS = [
  { name: 'Home', target: 'home' },
  { name: 'Services', target: 'services' },
  { name: 'Portfolio', target: 'work' },
  { name: 'Contact', target: 'contact' },
];

const Footer = () => (
  <footer className="relative bg-gray-100 pb-12 pt-16 text-gray-900 transition-colors duration-300 dark:bg-dark-surface dark:text-white">
    {/*
      The comb edge. Teeth are drawn in the footer's own colour so they read as
      its silhouette, with a gold hairline along the crests. The pattern tiles
      in CSS pixels, so it keeps its scale at any width.
    */}
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute -top-5 left-0 h-5 w-full text-gray-100 dark:text-dark-surface"
    >
      <defs>
        <pattern id="comb-teeth" width="28" height="20" patternUnits="userSpaceOnUse">
          <path d="M0 20 L0 7 L14 0 L28 7 L28 20 Z" fill="currentColor" />
          <path
            d="M0 7 L14 0 L28 7"
            fill="none"
            stroke="#D4AF37"
            strokeOpacity="0.55"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#comb-teeth)" />
    </svg>

    {/* Honey settled at the base of the page. */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-400/[0.14] via-brand-400/[0.04] to-transparent"
    />

    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div className="mb-6 text-center md:mb-0 md:text-left">
          <span className="block font-serif text-xl font-bold tracking-[0.1em]">
            JESSIE <span className="text-brand-600 dark:text-brand-400">HINAHON</span>
          </span>
          <p className="mt-2 text-xs uppercase tracking-wide text-gray-500">TECHVA</p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-3 md:gap-8">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              onClick={(event) => scrollToSection(event, link.target)}
              className="group relative pb-1 text-sm uppercase tracking-wider text-gray-500 transition-colors hover:text-brand-600 dark:hover:text-brand-400"
            >
              {link.name}
              {/* A thread of honey under the word. */}
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-brand-500 via-brand-400 to-brand-300/0 transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
              />
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-8 flex flex-col items-center justify-between border-t border-brand-500/15 pt-8 text-xs text-gray-600 dark:border-brand-400/10 md:flex-row">
        <p>© {new Date().getFullYear()} Jessie Hinahon. All rights reserved.</p>
        <p className="mt-2 inline-flex items-center gap-2 md:mt-0">
          System Online
          <span
            aria-hidden="true"
            className={`inline-block h-3 w-[11px] animate-honey-fill bg-brand-400 motion-reduce:animate-none ${HEX_CLIP}`}
          />
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
