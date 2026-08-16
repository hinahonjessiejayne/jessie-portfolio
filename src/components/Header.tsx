import { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { NAV_ITEMS, PROFILE_IMAGE } from '../constants';
import { scrollToSection } from '../lib/smoothScroll';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

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
      <nav className="pointer-events-auto liquid-glass rounded-full px-6 py-3 flex items-center justify-between gap-6 md:gap-12 transition-all duration-300 w-full max-w-5xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] border border-white/20 dark:border-white/10">
        <div className="flex-shrink-0 flex items-center">
          <a
            href="#home"
            onClick={(event) => handleNavClick(event, '#home')}
            className="flex items-center gap-2 group"
          >
            {imageError ? (
              <div className="w-8 h-8 rounded-full bg-brand-400 flex items-center justify-center text-xs font-bold text-black ring-2 ring-brand-400">
                J
              </div>
            ) : (
              <img
                src={PROFILE_IMAGE}
                alt="Profile"
                onError={() => setImageError(true)}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover shadow-lg group-hover:scale-110 transition-transform ring-2 ring-brand-400"
              />
            )}
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
        <div className="absolute top-24 left-4 right-4 p-4 rounded-2xl liquid-glass border border-white/20 dark:border-white/10 shadow-2xl pointer-events-auto md:hidden animate-in slide-in-from-top-4 fade-in duration-200">
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
