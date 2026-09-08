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
        drip: 'drip 3.6s ease-in-out infinite',
        droplet: 'droplet 3.6s ease-in infinite',
        'honey-fill': 'honey-fill 4s ease-in-out infinite',
        flutter: 'flutter 0.16s ease-in-out infinite',
        bob: 'bob 1.8s ease-in-out infinite',
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
        /* Honey gathering at the lip of a comb cell, never quite falling. */
        drip: {
          '0%, 100%': { transform: 'scaleY(0.55)' },
          '55%': { transform: 'scaleY(1)' },
        },
        /* The bead that does fall, timed to leave as the drip retracts. */
        droplet: {
          '0%, 45%': { transform: 'translateY(0) scale(0.7)', opacity: '0' },
          '60%': { transform: 'translateY(6px) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(54px) scale(0.5)', opacity: '0' },
        },
        /* Cells warming through, as if filling. */
        'honey-fill': {
          '0%, 100%': { opacity: '0.18' },
          '50%': { opacity: '0.6' },
        },
        /* Bee wings, beating from the shoulder. */
        flutter: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(0.45)' },
        },
        /* The bee hovering in place, a couple of pixels either way. */
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
