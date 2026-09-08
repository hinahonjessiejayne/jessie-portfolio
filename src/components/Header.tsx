import { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { HEX_CLIP, NAV_ITEMS, PROFILE_IMAGE } from '../constants';
import { scrollToSection } from '../lib/smoothScroll';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

/**
 * A whisper of comb under the glass. Masked so it lives at the two ends of
 * the pill and clears out behind the links; the blur and tint stay on the
 * container itself, untouched.
 */
const CombVeil = ({ id }: { id: string }) => (
  <svg
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 -z-10 h-full w-full text-brand-500/20 dark:text-brand-400/[0.18] [mask-image:linear-gradient(to_right,#000,transparent_30%,transparent_70%,#000)] [-webkit-mask-image:linear-gradient(to_right,#000,transparent_30%,transparent_70%,#000)]"
  >
    <defs>
      {/* Pointy-top hexes, r=9: tile is √3·r wide by 3r tall, odd rows offset. */}
      <pattern id={id} width="15.59" height="27" patternUnits="userSpaceOnUse">
        <path d="M7.79 0 L15.59 4.5 L15.59 13.5 L7.79 18 L0 13.5 L0 4.5 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <path d="M15.59 13.5 L23.38 18 L23.38 27 L15.59 31.5 L7.79 27 L7.79 18 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <path d="M0 13.5 L7.79 18 L7.79 27 L0 31.5 L-7.79 27 L-7.79 18 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
);

const Header = ({ isDark, toggleTheme }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY + 100;
      let current = 'home';

      NAV_ITEMS.forEach((item) => {
        const id = item.href.substring(1);
        const element = document.getElementById(id);
        if (element && element.offsetTop <= position) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const id = scrollToSection(event, href);
    if (id) {
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto liquid-glass relative isolate overflow-hidden rounded-full px-6 py-3 flex items-center justify-between gap-6 md:gap-12 transition-all duration-300 w-full max-w-5xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] border border-white/20 dark:border-white/10">
        <CombVeil id="nav-comb" />
        <div className="flex-shrink-0 flex items-center">
          <a
            href="#home"
            onClick={(event) => handleNavClick(event, '#home')}
            className="flex items-center gap-2 group"
          >
            {/* The avatar is a comb cell: gold rim, portrait inside. */}
            <span
              className={`relative block h-9 w-8 bg-brand-400 transition-transform group-hover:scale-110 ${HEX_CLIP}`}
            >
              {imageError ? (
                <span
                  className={`absolute inset-[2px] flex items-center justify-center bg-dark-bg text-xs font-bold text-brand-400 ${HEX_CLIP}`}
                >
                  J
                </span>
              ) : (
                <img
                  src={PROFILE_IMAGE}
                  alt="Profile"
                  onError={() => setImageError(true)}
                  referrerPolicy="no-referrer"
                  className={`absolute inset-[2px] h-[calc(100%-4px)] w-[calc(100%-4px)] object-cover ${HEX_CLIP}`}
                />
              )}
            </span>
            <span className="text-lg font-serif font-bold tracking-wider text-gray-900 dark:text-white hidden sm:block">
              Jessie
            </span>
          </a>
        </div>

        <div className="hidden md:flex items-center space-x-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  isActive
                    ? 'text-brand-600 dark:text-brand-400 bg-brand-400/10'
                    : 'text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-black/5 dark:hover:bg-white/10'
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-black/5 dark:bg-white/10 text-gray-600 dark:text-brand-400 hover:text-brand-600 hover:bg-brand-400/20 transition-all focus:outline-none"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:text-brand-600 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="absolute top-24 left-4 right-4 p-4 rounded-2xl liquid-glass isolate overflow-hidden border border-white/20 dark:border-white/10 shadow-2xl pointer-events-auto md:hidden animate-in slide-in-from-top-4 fade-in duration-200">
          <CombVeil id="menu-comb" />
          <div className="flex flex-col space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href)}
                  className={`block px-4 py-3 text-base font-medium rounded-xl transition-all text-center ${
                    isActive
                      ? 'text-brand-600 dark:text-brand-400 bg-brand-400/10'
                      : 'text-gray-800 dark:text-gray-200 hover:bg-brand-400/20 hover:text-brand-600 dark:hover:text-brand-400'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
