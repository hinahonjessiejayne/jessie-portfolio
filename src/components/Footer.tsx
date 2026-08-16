import { scrollToSection } from '../lib/smoothScroll';

const FOOTER_LINKS = [
  { name: 'Home', target: 'home' },
  { name: 'Services', target: 'services' },
  { name: 'Portfolio', target: 'work' },
  { name: 'Contact', target: 'contact' },
];

const Footer = () => (
  <footer className="bg-gray-100 dark:bg-black text-gray-900 dark:text-white py-12 border-t border-light-border dark:border-dark-border transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <span className="text-xl font-serif font-bold tracking-[0.1em] block">
            JESSIE{' '}
            <span className="text-brand-600 dark:text-brand-400">HINAHON</span>
          </span>
          <p className="text-gray-500 mt-2 text-xs uppercase tracking-wide">
            TECHVA
          </p>
        </div>

        <div className="flex space-x-8">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              onClick={(event) => scrollToSection(event, link.target)}
              className="text-gray-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors text-sm uppercase tracking-wider"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-light-border dark:border-dark-border flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
        <p>© {new Date().getFullYear()} Jessie Hinahon. All rights reserved.</p>
        <p className="mt-2 md:mt-0">
          System Online{' '}
          <span className="text-green-500 inline-block w-2 h-2 rounded-full ml-1 animate-pulse" />
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
