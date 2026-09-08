import { motion } from 'framer-motion';
import { Globe, Mail, MapPin, Phone } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

/**
 * Contact as a sealed letter. The honey note here is a wax seal — an
 * irregular blob of honey-coloured wax at the tip of an envelope flap,
 * stamped with a comb cell and the initials. It is the one place on the
 * site the honey is set rather than flowing: no drips, no fills, no rails.
 */

const SEAL_SIZE = 96;

/** A wax blob: a circle with three low harmonics so no two edges match. */
const SEAL_PATH = (() => {
  const c = SEAL_SIZE / 2;
  return Array.from({ length: 72 }, (_, i) => {
    const t = (i / 72) * Math.PI * 2;
    const r = 40 + 2.4 * Math.sin(3 * t + 0.4) + 1.5 * Math.sin(7 * t) + 1 * Math.sin(11 * t + 1);
    return `${(c + r * Math.cos(t)).toFixed(1)},${(c + r * Math.sin(t)).toFixed(1)}`;
  }).join(' ');
})();

/** Pointy-top hexagon stamped into the wax. */
const STAMP_POINTS = Array.from({ length: 6 }, (_, k) => {
  const c = SEAL_SIZE / 2;
  const a = (Math.PI / 180) * (60 * k - 30);
  return `${(c + 27 * Math.cos(a)).toFixed(1)},${(c + 27 * Math.sin(a)).toFixed(1)}`;
}).join(' ');

const WaxSeal = () => (
  <motion.div
    aria-hidden="true"
    className="absolute left-1/2 top-0 -ml-12 -mt-12 h-24 w-24 drop-shadow-[0_10px_16px_rgba(0,0,0,0.35)]"
    whileHover={{ rotate: -8, scale: 1.06 }}
    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
  >
    <svg viewBox={`0 0 ${SEAL_SIZE} ${SEAL_SIZE}`} className="h-full w-full">
      <defs>
        <radialGradient id="wax" cx="38%" cy="32%" r="72%">
          <stop offset="0%" stopColor="#E9D98A" />
          <stop offset="45%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8A6F22" />
        </radialGradient>
      </defs>
      <polygon points={SEAL_PATH} fill="url(#wax)" />
      {/* The stamp: a pressed cell, dark on the low side, lit on the high side. */}
      <polygon points={STAMP_POINTS} fill="none" stroke="#6B5518" strokeWidth="2.5" opacity="0.9" />
      <polygon
        points={STAMP_POINTS}
        fill="none"
        stroke="#F3E6A6"
        strokeWidth="1"
        opacity="0.8"
        transform="translate(-0.8 -0.8)"
      />
      <text
        x="50%"
        y="50%"
        dy="0.36em"
        textAnchor="middle"
        className="font-serif text-[22px] font-bold"
        fill="#5E4A14"
      >
        JH
      </text>
      <text
        x="50%"
        y="50%"
        dy="0.36em"
        dx="-0.7"
        textAnchor="middle"
        className="font-serif text-[22px] font-bold"
        fill="#F3E6A6"
        opacity="0.55"
        transform="translate(0 -0.9)"
      >
        JH
      </text>
      {/* Gloss. */}
      <ellipse cx="34" cy="26" rx="14" ry="8" fill="#FFFFFF" opacity="0.16" transform="rotate(-28 34 26)" />
    </svg>
  </motion.div>
);

const CHANNELS = [
  {
    label: 'Phone',
    icon: Phone,
    value: CONTACT_INFO.phone,
    href: `tel:${CONTACT_INFO.phone}`,
  },
  {
    label: 'Email',
    icon: Mail,
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
  },
  { label: 'Location', icon: MapPin, value: CONTACT_INFO.address },
  {
    label: 'Website',
    icon: Globe,
    value: 'ai.jessiecalm.com',
    href: CONTACT_INFO.website,
    external: true,
  },
];

const Contact = () => (
  <section id="contact" className="py-24 bg-gray-50 dark:bg-dark-surface/30">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <h2 className="text-brand-500 dark:text-brand-400 font-mono font-medium tracking-widest text-xs mb-3">
          GET IN TOUCH
        </h2>
        <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6">
          Contact Information
        </h3>
        <p className="text-light-muted dark:text-dark-muted text-lg max-w-2xl mx-auto">
          Whether you have a question about my services, want to discuss a
          potential collaboration, or just want to say hi, my inbox is always
          open.
        </p>
      </motion.div>

      {/* The letter. */}
      <motion.div
        className="relative rounded-sm border border-light-border bg-white shadow-sm dark:border-dark-border dark:bg-dark-card dark:shadow-none"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
      >
        {/* Envelope flap, folded down to the seal. */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-16 w-full text-brand-500/30 dark:text-brand-400/25"
          viewBox="0 0 100 64"
          preserveAspectRatio="none"
        >
          <polyline
            points="0,0 50,64 100,0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <WaxSeal />

        <ul className="grid grid-cols-1 gap-x-8 gap-y-2 px-6 pb-8 pt-20 sm:grid-cols-2 sm:px-10 sm:pb-10">
          {CHANNELS.map((channel) => {
            const Icon = channel.icon;
            const value = channel.href ? (
              <a
                href={channel.href}
                {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="break-all text-lg font-medium text-gray-900 transition-colors hover:text-brand-500 dark:text-white dark:hover:text-brand-400"
              >
                {channel.value}
              </a>
            ) : (
              <p className="text-lg font-medium text-gray-900 dark:text-white">{channel.value}</p>
            );
            return (
              <li key={channel.label} className="group flex items-start gap-4 py-4">
                <span className="rounded-sm bg-gray-50 p-3 text-brand-500 transition-colors group-hover:bg-brand-400 group-hover:text-black dark:bg-dark-surface dark:text-brand-400">
                  <Icon className="h-6 w-6" />
                </span>
                <span>
                  <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-500">
                    {channel.label}
                  </span>
                  {value}
                </span>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </div>
  </section>
);

export default Contact;
