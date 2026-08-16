import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

const Testimonials = () => (
  <section id="testimonials" className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 bg-gray-100/50 dark:bg-dark-surface/50 transition-colors duration-300" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-brand-500 dark:text-brand-400 font-mono font-medium tracking-widest text-xs mb-3">
          TESTIMONIALS
        </h2>
        <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white">
          What Colleagues Say
        </h3>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        {TESTIMONIALS.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            className="relative p-8 bg-white dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-brand-500/30 transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-none"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: 'easeOut' },
              },
            }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <Quote className="h-8 w-8 text-brand-500 dark:text-brand-600 mb-6 opacity-80" />

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 italic text-sm">
              "{testimonial.quote}"
            </p>

            <div className="flex items-center pt-6 border-t border-light-border dark:border-dark-border">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-10 h-10 rounded-full border border-brand-500/50 mr-4 grayscale"
              />
              <div>
                <h5 className="font-bold text-gray-900 dark:text-white text-sm">
                  {testimonial.name}
                </h5>
                <span className="text-[10px] text-brand-600 dark:text-brand-400 uppercase tracking-widest">
                  {testimonial.role}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Testimonials;
