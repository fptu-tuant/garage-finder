const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  important: true,
  darkMode: 'class',
  content: ['./src/**/*.{jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lavender: {
          500: '#8b5cf6',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        xs: '12px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
