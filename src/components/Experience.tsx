import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { EDUCATION, EXPERIENCE } from '../constants';

/**
 * Career timeline, where the honey runs down the rail.
 *
 * The third honey note on the site, and scroll-driven rather than hover: the
 * rail is a dry channel that fills with honey as you read down it, and each
 * comb cell on the rail fills as its role arrives. The fill is bound to a
 * scroll MotionValue through `style` on purpose — that keeps a 60fps value out
 * of React state, which re-rendering the tree on scroll would not.
 */

/** Pointy-top hexagon: the rail's cells and the list bullets. */
const HEX_CLIP =
  '[clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]';

/** Parent entry and the cell fill inside it, keyed to the same states. */
const entryVariants = {
  hidden: { opacity: 0, y: 30 },
  shown: { opacity: 1, y: 0 },
};

const fillVariants = {
  hidden: { scaleY: 0 },
  shown: { scaleY: 1 },
};

type CellProps = { muted?: boolean };

/** A comb cell sitting on the rail, filling with honey when its role arrives. */
const RailCell = ({ muted = false }: CellProps) => (
  <span aria-hidden="true" className="absolute -left-[9px] top-1.5 h-5 w-[18px]">
    <span
      className={`absolute inset-0 ${muted ? 'bg-brand-500/25' : 'bg-brand-500/45'} ${HEX_CLIP}`}
    />
    <span className={`absolute inset-[1.5px] bg-gray-50 dark:bg-dark-bg ${HEX_CLIP}`}>
      <motion.span
        variants={fillVariants}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
        className={`absolute inset-0 origin-bottom bg-gradient-to-t ${
          muted ? 'from-brand-600/60 to-brand-400/50' : 'from-brand-500 via-brand-400 to-brand-300'
        }`}
      />
    </span>
  </span>
);

const Experience = () => {
  const railRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  /* Honey level: 0 where the rail meets the fold, 1 once its end passes it. */
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 72%', 'end 62%'],
  });
  const level = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      className="bg-gray-50 py-24 transition-colors duration-300 dark:bg-dark-surface/30"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-3 font-mono text-xs font-medium tracking-widest text-brand-500 dark:text-brand-400">
              CAREER TIMELINE
            </h2>
            <h3 className="mb-6 font-serif text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Work Experience
            </h3>
            <p className="border-l border-light-border pl-4 leading-relaxed text-light-muted dark:border-dark-border dark:text-dark-muted">
              A timeline of my professional journey, highlighting key roles in
              management, engineering, and quality assurance.
            </p>
          </motion.div>

          <div className="lg:col-span-2">
            <div ref={railRef} className="relative ml-3 space-y-12 md:ml-6">
              {/* The dry channel. */}
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-[2px] bg-gray-300 dark:bg-dark-border"
              />
              {/* The honey in it, rising with the scroll. */}
              <motion.span
                aria-hidden="true"
                style={{ scaleY: reduced ? 1 : level }}
                className="absolute inset-y-0 left-0 w-[2px] origin-top bg-gradient-to-b from-brand-300 via-brand-400 to-brand-500 shadow-[0_0_12px_rgba(212,175,55,0.55)]"
              />

              {EXPERIENCE.map((item, index) => (
                <motion.article
                  key={item.id}
                  className="group relative pl-8 md:pl-12"
                  variants={entryVariants}
                  initial="hidden"
                  whileInView="shown"
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <RailCell />

                  <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
                        {item.role}
                      </h4>
                      <p className="font-medium text-gray-500">{item.company}</p>
                    </div>
                    <span className="mt-2 self-start whitespace-nowrap rounded-sm border border-brand-500/25 bg-white px-3 py-1 font-mono text-xs text-brand-600 shadow-sm transition-colors group-hover:border-brand-400/60 dark:bg-dark-card dark:text-brand-400 dark:shadow-none sm:mt-0">
                      {item.period}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {item.description.map((line, lineIndex) => (
                      <li key={lineIndex} className="flex items-start">
                        <span
                          aria-hidden="true"
                          className={`mr-3 mt-[9px] h-2 w-[7px] flex-shrink-0 bg-brand-500 ${HEX_CLIP}`}
                        />
                        <span className="text-sm leading-relaxed text-light-muted dark:text-dark-muted">
                          {line}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}

              <motion.article
                className="group relative pl-8 md:pl-12"
                variants={entryVariants}
                initial="hidden"
                whileInView="shown"
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: EXPERIENCE.length * 0.1 }}
              >
                <RailCell muted />

                <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                      {EDUCATION.school}
                    </h4>
                    <p className="font-medium text-gray-500">{EDUCATION.campus}</p>
                  </div>
                  <span className="mt-2 self-start whitespace-nowrap rounded-sm border border-light-border bg-white px-3 py-1 font-mono text-xs text-gray-500 shadow-sm dark:border-dark-border dark:bg-dark-card dark:shadow-none sm:mt-0">
                    {EDUCATION.period}
                  </span>
                </div>

                <p className="text-sm text-light-muted dark:text-dark-muted">
                  {EDUCATION.degree}
                </p>
              </motion.article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
