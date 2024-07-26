const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '360px',
      md: '640px',
      lg: '769px',
      xl: '1024px',
      xxl: '1440px',
    },
    extend: {
      width: {
        web: '1440px',
      },
      colors: {
        primary: '#007de9',
        secondary: '#07bbae',
        accent: '#ff5900',
        default: '#71717a',
      },
      fontSize: {
        // Title
        t1: [
          '2.4rem;',
          {
            letterSpacing: '-0.01em',
            lineHeight: '1.5',
          },
        ],
        t2: [
          '1.6rem',
          {
            letterSpacing: '-0.01em',
            lineHeight: '1.5',
          },
        ],
        t3: [
          '1.4rem',
          {
            letterSpacing: '-0.01em',
            lineHeight: '20px',
          },
        ],
        // subtitle
        sub1: [
          '1.6rem',
          {
            letterSpacing: '-0.01em',
            lineHeight: '1.5',
          },
        ],
        sub2: [
          '1.2rem',
          {
            letterSpacing: '-0.01em',
            lineHeight: '1.5',
          },
        ],
        // paragraph
        p1: [
          '24px',
          {
            letterSpacing: '-0.01em',
            lineHeight: '20px',
          },
        ],
        p2: [
          '24px',
          {
            letterSpacing: '-0.01em',
            lineHeight: '20px',
          },
        ],
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      addCommonColors: true,
    }),
  ],
}
