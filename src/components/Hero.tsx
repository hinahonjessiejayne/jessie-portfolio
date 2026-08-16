import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, ScanFace } from 'lucide-react';
import { PERSONAL_INFO, PROFILE_IMAGE } from '../constants';
import { scrollToSection } from '../lib/smoothScroll';

const AVATAR_FALLBACK =
  'https://ui-avatars.com/api/?name=Jessie+Hinahon&background=0F0F0F&color=D4AF37&size=512&font-size=0.3';

const HEADLINE_HOLD_MS = 5000;
const HEADLINE_FADE_MS = 500;

const Hero = () => {
  const [showFirstHeadline, setShowFirstHeadline] = useState(true);
  const [isHeadlineVisible, setIsHeadlineVisible] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    let holdTimer: ReturnType<typeof setTimeout>;
    let fadeTimer: ReturnType<typeof setTimeout>;

    const cycle = () => {
      holdTimer = setTimeout(() => {
        setIsHeadlineVisible(false);
        fadeTimer = setTimeout(() => {
          setShowFirstHeadline((previous) => !previous);
          setIsHeadlineVisible(true);
          cycle();
        }, HEADLINE_FADE_MS);
      }, HEADLINE_HOLD_MS);
    };

    cycle();
    return () => {
      clearTimeout(holdTimer);
      clearTimeout(fadeTimer);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden"
    >
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-400/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-600/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="order-2 lg:order-1 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="relative">
              <motion.p
                className="text-5xl md:text-6xl lg:text-7xl font-serif italic mb-4 leading-tight"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span className="text-gray-900 dark:text-white">I’m</span>{' '}
                <span className="text-brand-500 dark:text-brand-400">
                  Jessie Hinahon
                </span>
              </motion.p>

              <div className="min-h-[80px] md:min-h-[100px] lg:min-h-[120px] flex items-center">
                <h1
                  className={`text-2xl md:text-3xl lg:text-4xl font-sans font-bold text-gray-900 dark:text-white leading-tight tracking-tight transition-opacity duration-500 ${
                    isHeadlineVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {showFirstHeadline ? (
                    <>
                      Operational{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-300">
                        Excellence
                      </span>{' '}
                      <br />
                      Meets{' '}
                      <span className="font-serif italic text-brand-500 dark:text-brand-400">
                        Technical
                      </span>{' '}
                      Skill.
                    </>
                  ) : (
                    <>
                      <span className="text-brand-500 dark:text-brand-400">
                        AI Automation
                      </span>{' '}
                      <span className="text-gray-900 dark:text-white">
                        Specialist
                      </span>{' '}
                      <br />
                      and{' '}
                      <span className="text-brand-500 dark:text-brand-400">
                        GHL
                      </span>{' '}
                      <span className="text-gray-900 dark:text-white">
                        Specialist
                      </span>
                    </>
                  )}
                </h1>
              </div>
            </div>

            <motion.div
              className="flex flex-wrap gap-2 items-center text-sm md:text-base font-mono text-gray-600 dark:text-gray-300 border-l-4 border-brand-400 pl-4 py-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="font-bold text-brand-600 dark:text-brand-400">
                Automations
              </span>
              <span className="text-gray-400">|</span>
              <span className="font-bold text-brand-600 dark:text-brand-400">
                Zapier
              </span>
              <span className="text-gray-400">|</span>
              <span className="font-bold text-brand-600 dark:text-brand-400">
                GHL
              </span>
              <span className="text-gray-400">|</span>
              <span className="font-bold text-brand-600 dark:text-brand-400">
                Technical VA
              </span>
            </motion.div>

            <motion.div
              className="max-w-lg space-y-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <p className="text-lg md:text-xl text-light-muted dark:text-dark-muted leading-relaxed">
                {PERSONAL_INFO.about}
              </p>

              <div>
                <h2 className="text-brand-500 dark:text-brand-400 font-mono font-medium tracking-widest text-xs mb-3">
                  SKILLS
                </h2>
                <ul className="space-y-2">
                  {PERSONAL_INFO.skills.map((skill) => (
                    <li key={skill.label} className="flex items-start">
                      <span className="mr-3 mt-2 w-1 h-1 bg-brand-600 rounded-full flex-shrink-0" />
                      <span className="text-sm md:text-base text-light-muted dark:text-dark-muted leading-relaxed">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {skill.label}:
                        </span>{' '}
                        {skill.items}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <a
                href="#calendar"
                onClick={(event) => scrollToSection(event, 'calendar')}
                className="group relative inline-flex items-center justify-center px-8 py-3.5 bg-brand-400 text-black font-bold text-base tracking-wide rounded-sm hover:bg-brand-300 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Get in Touch{' '}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>

              <a
                href="#work"
                onClick={(event) => scrollToSection(event, 'work')}
                className="group inline-flex items-center justify-center px-8 py-3.5 border border-light-border dark:border-dark-border text-base font-medium rounded-sm text-gray-900 dark:text-white hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 transition-all bg-white/50 dark:bg-dark-surface/50 backdrop-blur-sm"
              >
                My Portfolio
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 group perspective-1000">
              <div className="absolute inset-0 border border-brand-400/30 rounded-full scale-110 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-0 border border-dashed border-brand-400/20 rounded-full scale-125 animate-[spin_15s_linear_infinite_reverse]" />

              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-brand-500/30 shadow-[0_0_50px_rgba(212,175,55,0.2)] z-10 bg-gray-900 group-hover:shadow-[0_0_80px_rgba(212,175,55,0.5)] transition-all duration-500">
                <img
                  src={imageError ? AVATAR_FALLBACK : PROFILE_IMAGE}
                  onError={() => setImageError(true)}
                  referrerPolicy="no-referrer"
                  alt="Jessie Hinahon AI"
                  className="w-full h-full object-cover object-center transition-transform duration-700 filter contrast-110 brightness-110 saturate-125"
                />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,11,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-30 pointer-events-none opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-400/30 to-transparent z-40 animate-scan opacity-60" />
                <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] z-50 rounded-full" />
              </div>

              <div className="absolute -top-4 -right-4 w-12 h-12 bg-brand-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000" />

              <motion.div
                className="absolute top-10 -left-10 md:-left-12 bg-white/90 dark:bg-dark-card/90 backdrop-blur-md p-3 rounded-lg border border-brand-400/30 shadow-xl z-50"
                animate={{ y: [-10, 10, -10], rotate: [-6, -3, -6] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Cpu className="w-6 h-6 text-brand-600 dark:text-brand-400" />
              </motion.div>

              <motion.div
                className="absolute bottom-20 -right-6 md:-right-8 bg-white/90 dark:bg-dark-card/90 backdrop-blur-md p-3 rounded-lg border border-brand-400/30 shadow-xl z-50"
                animate={{ y: [10, -10, 10], rotate: [12, 9, 12] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              >
                <ScanFace className="w-6 h-6 text-brand-600 dark:text-brand-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
