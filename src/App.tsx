import { useEffect, useState } from 'react';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import HexGrid from './components/HexGrid';
import Portfolio from './components/Portfolio';
import Scheduler from './components/Scheduler';
import Services from './components/Services';

const RIPPLE_LIFETIME_MS = 800;

function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    if (stored === 'dark' || (!stored && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  // Gold ripple that expands from every click, anywhere on the page.
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const particle = document.createElement('div');
      particle.className = 'click-particle';
      particle.style.left = `${event.clientX}px`;
      particle.style.top = `${event.clientY}px`;
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), RIPPLE_LIFETIME_MS);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="relative min-h-screen bg-light-bg dark:bg-dark-bg font-sans text-light-text dark:text-dark-text selection:bg-brand-400 selection:text-black overflow-x-hidden transition-colors duration-300">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-light-bg dark:bg-dark-bg transition-colors duration-300" />
        <HexGrid />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-light-bg/70 dark:via-dark-bg/70 to-light-bg dark:to-dark-bg" />
      </div>

      <div className="relative z-10">
        <Header isDark={isDark} toggleTheme={toggleTheme} />
        <main className="space-y-0">
          <Hero />
          <Services />
          <Experience />
          <Portfolio />
          <Scheduler />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
