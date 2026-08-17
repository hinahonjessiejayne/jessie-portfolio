import { motion } from 'framer-motion';
import { Globe, Mail, MapPin, Phone } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const cardClass =
  'bg-white dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-sm hover:border-brand-400 transition-all duration-300 shadow-sm dark:shadow-none group flex items-start';
const iconWrapClass =
  'bg-gray-50 dark:bg-dark-surface p-3 rounded-sm mr-4 group-hover:bg-brand-400 group-hover:text-black transition-colors';
const iconClass =
  'h-6 w-6 text-brand-500 dark:text-brand-400 group-hover:text-black transition-colors';
const labelClass =
  'text-xs font-bold text-gray-500 uppercase tracking-wide mb-1';
const valueClass =
  'text-lg font-medium text-gray-900 dark:text-white hover:text-brand-500 dark:hover:text-brand-400 transition-colors';

const Contact = () => (
  <section id="contact" className="py-24 bg-gray-50 dark:bg-dark-surface/30">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-16"
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

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
      >
        <div className={cardClass}>
          <div className={iconWrapClass}>
            <Phone className={iconClass} />
          </div>
          <div>
            <p className={labelClass}>Phone</p>
            <a href={`tel:${CONTACT_INFO.phone}`} className={valueClass}>
              {CONTACT_INFO.phone}
            </a>
          </div>
        </div>

        <div className={cardClass}>
          <div className={iconWrapClass}>
            <Mail className={iconClass} />
          </div>
          <div>
            <p className={labelClass}>Email</p>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className={`${valueClass} break-all`}
            >
              {CONTACT_INFO.email}
            </a>
          </div>
        </div>

        <div className={cardClass}>
          <div className={iconWrapClass}>
            <MapPin className={iconClass} />
          </div>
          <div>
            <p className={labelClass}>Location</p>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {CONTACT_INFO.address}
            </p>
          </div>
        </div>

        <div className={cardClass}>
          <div className={iconWrapClass}>
            <Globe className={iconClass} />
          </div>
          <div>
            <p className={labelClass}>Website</p>
            <a
              href={CONTACT_INFO.website}
              target="_blank"
              rel="noopener noreferrer"
              className={`${valueClass} break-all`}
            >
              ai.jessiecalm.com
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Contact;
