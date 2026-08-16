import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ExternalLink, Maximize2, X } from 'lucide-react';
import { PROJECTS, PROJECT_CATEGORIES } from '../constants';
import type { Project, ProjectCategory } from '../types';

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('N8N');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const visibleProjects = PROJECTS.filter(
    (project) => project.category === activeCategory,
  );

  const markImageError = (id: string) => {
    setImageErrors((previous) => ({ ...previous, [id]: true }));
  };

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
          <div className="flex space-x-2 bg-gray-100 dark:bg-dark-card p-1 rounded-full border border-light-border dark:border-dark-border">
            {PROJECT_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-6 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
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
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {visibleProjects.length > 0 ? (
              visibleProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  className="group flex flex-col h-full bg-white dark:bg-dark-card border border-light-border dark:border-dark-border hover:border-brand-500/50 rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-lg dark:shadow-none cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative h-56 overflow-hidden bg-gray-900">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-brand-900/20 transition-colors z-10" />

                    {imageErrors[project.id] ? (
                      <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 bg-gray-800">
                        <AlertCircle className="w-8 h-8 text-brand-400 mb-2" />
                        <span className="text-xs text-gray-400">
                          Image missing:
                        </span>
                        <span className="text-xs font-mono text-brand-400 break-all px-2">
                          {project.imageUrl}
                        </span>
                        <span className="text-[10px] text-gray-500 mt-2">
                          Check public folder
                        </span>
                      </div>
                    ) : (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        onError={() => markImageError(project.id)}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                    )}

                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-2 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-md border border-brand-500/30 text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                        {project.category}
                      </span>
                    </div>

                    <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                      <div className="p-2 bg-brand-400 text-black rounded-full shadow-lg">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow relative">
                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-light-border dark:border-dark-border group-hover:border-brand-400 transition-colors" />
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-light-muted dark:text-dark-muted text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                      {project.description}
                    </p>
                    <div className="pt-4 border-t border-light-border dark:border-dark-border group-hover:border-brand-500/20">
                      <span className="text-xs font-mono font-medium text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 flex items-center transition-colors uppercase tracking-wider">
                        View Details{' '}
                        <Maximize2 className="ml-2 h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400">
                <p>No projects found in this category yet.</p>
              </div>
            )}
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
