/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },
      colors: {
        brand: {
          50: '#FBF9F0',
          100: '#F5EFD6',
          200: '#EBDDA3',
          300: '#E0CB70',
          400: '#D4AF37', // Gold
          500: '#B5952F',
          600: '#967B27',
          700: '#78621F',
          800: '#5A4917',
          900: '#3C310F',
        },
        dark: {
          bg: '#050505',
          surface: '#0F0F0F',
          card: '#181818',
          border: '#272727',
          text: '#E0E0E0',
          muted: '#A0A0A0',
        },
        light: {
          bg: '#FAFAFA',
          surface: '#F4F4F5',
          card: '#FFFFFF',
          border: '#E4E4E7',
          text: '#18181B',
          muted: '#71717A',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 10s linear infinite',
        scan: 'scan 3s linear infinite',
        marquee: 'marquee 45s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
