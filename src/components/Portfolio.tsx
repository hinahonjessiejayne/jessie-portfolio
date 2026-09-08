import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import WorkFan from './WorkFan';
import { PROJECTS, PROJECT_CATEGORIES } from '../constants';
import type { Project, ProjectCategory } from '../types';

/**
 * The bee that lands on whichever category is open. It shares a layoutId
 * across the tabs, so switching category sends it flying to the new pill on
 * the same spring the pill itself rides; wings beat and it bobs in place.
 */
const Bee = () => (
  <motion.span
    layoutId="bee"
    aria-hidden="true"
    className="absolute -right-2 -top-5 z-20 block h-7 w-9 drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)]"
    transition={{ type: 'spring', bounce: 0.35, duration: 0.8 }}
  >
    <svg viewBox="0 0 32 24" className="h-full w-full animate-bob motion-reduce:animate-none">
      <defs>
        <clipPath id="bee-body">
          <ellipse cx="16" cy="15" rx="10" ry="6.5" />
        </clipPath>
      </defs>
      <g className="origin-bottom animate-flutter [transform-box:fill-box] motion-reduce:animate-none">
        <ellipse cx="13" cy="7" rx="6" ry="3.6" fill="#FFFFFF" fillOpacity="0.55" stroke="#111111" strokeOpacity="0.45" strokeWidth="0.8" transform="rotate(-28 13 7)" />
        <ellipse cx="19.5" cy="6.5" rx="5.5" ry="3.3" fill="#FFFFFF" fillOpacity="0.55" stroke="#111111" strokeOpacity="0.45" strokeWidth="0.8" transform="rotate(-12 19.5 6.5)" />
      </g>
      <path d="M6.5 15 L2.5 15.9 L6.5 16.8 Z" fill="#111111" />
      <ellipse cx="16" cy="15" rx="10" ry="6.5" fill="#D4AF37" stroke="#111111" strokeWidth="1.2" />
      <g clipPath="url(#bee-body)" fill="#111111">
        <rect x="10.5" y="7" width="2.8" height="16" />
        <rect x="16.2" y="7" width="2.8" height="16" />
      </g>
      <circle cx="26.5" cy="14.5" r="3.6" fill="#111111" />
      <circle cx="27.7" cy="13.5" r="0.8" fill="#FFFFFF" />
      <path d="M27 11 L29 8.2 M28.8 11.6 L31 9.6" stroke="#111111" strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  </motion.span>
);

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('N8N');

  const visibleProjects = PROJECTS.filter(
    (project) => project.category === activeCategory,
  );

  return (
    <section id="work" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-light-border dark:border-dark-border pb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-2xl">
            <h2 className="text-brand-500 dark:text-brand-400 font-mono font-medium tracking-widest text-xs mb-3">
              PORTFOLIO
            </h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white">
              Featured Workflows
            </h3>
          </div>
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-1 bg-gray-100 dark:bg-dark-card p-1 rounded-full border border-light-border dark:border-dark-border">
            {PROJECT_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-3 py-1.5 sm:px-6 sm:py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 ${
                  activeCategory === category
                    ? 'text-black'
                    : 'text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400'
                }`}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-brand-400 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {activeCategory === category && <Bee />}
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <WorkFan projects={visibleProjects} onOpen={setSelectedProject} />
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />

            <motion.div
              className="relative w-full max-w-6xl max-h-[90vh] bg-white dark:bg-dark-card rounded-lg overflow-hidden shadow-2xl flex flex-col"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-light-border dark:border-dark-border bg-white dark:bg-dark-card z-10">
                <div>
                  <span className="text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider block mb-1">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project details"
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-500 hover:text-red-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-0 bg-gray-100 dark:bg-dark-bg">
                <div className="flex flex-col lg:flex-row h-full">
                  <div className="lg:w-3/4 bg-black flex items-center justify-center min-h-[400px]">
                    <img
                      src={selectedProject.imageUrl}
                      alt={selectedProject.title}
                      className="w-full h-auto max-h-[70vh] object-contain"
                    />
                  </div>

                  <div className="lg:w-1/4 p-6 md:p-8 bg-white dark:bg-dark-card border-l border-light-border dark:border-dark-border">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                      Project Overview
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-8">
                      {selectedProject.description}
                    </p>
                    {selectedProject.link && (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full px-4 py-3 bg-brand-400 text-black font-bold text-sm rounded-sm hover:bg-brand-500 transition-colors uppercase tracking-wider"
                      >
                        View Live Project{' '}
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
