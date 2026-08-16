import { motion } from 'framer-motion';
import { SCHEDULER_URL } from '../constants';

const Scheduler = () => (
  <section id="calendar" className="py-24 relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-brand-500 dark:text-brand-400 font-mono font-medium tracking-widest text-xs mb-3">
          AVAILABILITY
        </h2>
        <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white">
          Schedule a Meeting
        </h3>
        <p className="mt-4 text-light-muted dark:text-dark-muted max-w-2xl mx-auto">
          Select a time that works best for you to discuss your automation
          needs.
        </p>
      </motion.div>

      <motion.div
        className="w-full h-[800px] bg-white dark:bg-dark-card rounded-sm shadow-xl overflow-hidden border border-light-border dark:border-dark-border"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <iframe
          src={SCHEDULER_URL}
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          title="Schedule Appointment"
        />
      </motion.div>
    </div>
  </section>
);

export default Scheduler;
