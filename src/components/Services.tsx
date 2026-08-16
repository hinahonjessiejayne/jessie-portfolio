import { motion } from 'framer-motion';
import { SERVICES } from '../constants';

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
  <section id="services" className="py-24 relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-brand-500 dark:text-brand-400 font-mono font-medium tracking-widest text-xs mb-3">
          SYSTEM CAPABILITIES
        </h2>
        <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white">
          Professional Services
        </h3>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent mx-auto mt-6" />
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {SERVICES.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative p-8 bg-white dark:bg-dark-card border border-light-border dark:border-dark-border hover:border-brand-500/50 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-lg dark:shadow-none"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="w-14 h-14 bg-gray-50 dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-sm flex items-center justify-center mb-6 group-hover:border-brand-400 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all duration-300">
                  <Icon className="h-6 w-6 text-gray-400 group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {service.title}
                </h4>
                <p className="text-light-muted dark:text-dark-muted text-sm leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                  {service.description}
                </p>
              </div>

              <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 border-t border-r border-brand-400" />
              </div>
              <div className="absolute bottom-0 left-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 border-b border-l border-brand-400" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </section>
);

export default Services;
