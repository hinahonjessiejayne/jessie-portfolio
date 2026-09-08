import { motion } from 'framer-motion';
import { SERVICES } from '../constants';

/**
 * Capability cards, styled as comb cells being filled.
 *
 * A different honey note from the booking section: no frame or drips here.
 * Each card's icon sits in a real hexagon cell with a gold rim, honey rises
 * through the cell and then the card on hover, and a thread of honey runs out
 * along the bottom edge. On wide screens the middle column drops half a cell
 * so the grid interlocks the way comb rows do.
 */

/** Pointy-top hexagon, the shape of a single comb cell. */
const HEX_CLIP =
  '[clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 100, damping: 10 },
  },
};

const Services = () => (
  <section id="services" className="relative py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="mb-3 font-mono text-xs font-medium tracking-widest text-brand-500 dark:text-brand-400">
          SYSTEM CAPABILITIES
        </h2>
        <h3 className="font-serif text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          Professional Services
        </h3>
        <div className="mx-auto mt-6 h-1 w-24 bg-gradient-to-r from-transparent via-brand-500 to-transparent" />
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {SERVICES.map((service, index) => {
          const Icon = service.icon;
          /* Comb rows interlock: the middle column sits half a cell lower. */
          const combOffset = index % 3 === 1 ? 'lg:mt-10' : '';

          return (
            <motion.article
              key={service.title}
              variants={cardVariants}
              className={`group relative overflow-hidden border border-light-border bg-white p-8 shadow-sm transition-colors duration-300 hover:border-brand-500/50 dark:border-dark-border dark:bg-dark-card dark:shadow-none ${combOffset}`}
            >
              {/* Honey rising through the card. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 translate-y-full bg-gradient-to-t from-brand-400/25 via-brand-400/[0.08] to-transparent transition-transform duration-700 ease-out group-hover:translate-y-0 motion-reduce:transition-none"
              />

              <div className="relative z-10">
                {/* The comb cell. Honey rises inside it and settles part-filled. */}
                <div className="relative mb-6 h-16 w-14">
                  <span
                    aria-hidden="true"
                    className={`absolute inset-0 bg-brand-500/35 transition-colors duration-300 group-hover:bg-brand-400 ${HEX_CLIP}`}
                  />
                  <span
                    aria-hidden="true"
                    className={`absolute inset-[1.5px] bg-gray-50 dark:bg-dark-surface ${HEX_CLIP}`}
                  >
                    <span className="absolute inset-x-0 bottom-0 top-0 translate-y-full bg-gradient-to-t from-brand-500 via-brand-400 to-brand-300 transition-transform duration-500 ease-out group-hover:translate-y-[38%] motion-reduce:transition-none" />
                  </span>
                  <Icon className="absolute left-1/2 top-1/2 z-10 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 group-hover:text-brand-900" />
                </div>

                <h4 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
                  {service.title}
                </h4>
                <p className="text-sm leading-relaxed text-light-muted transition-colors group-hover:text-gray-700 dark:text-dark-muted dark:group-hover:text-gray-300">
                  {service.description}
                </p>
              </div>

              {/* A thread of honey running out along the lip. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-brand-500 via-brand-400 to-brand-300/0 transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
              />
            </motion.article>
          );
        })}
      </motion.div>
    </div>
  </section>
);

export default Services;
