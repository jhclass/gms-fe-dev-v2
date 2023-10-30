const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      sm: '360px',
      md: '640px',
      lg: '960px',
      xl: '1440px'
    },
    extend: {
      width: {
        'web': '1440px',
      },
      colors: {
        'primary': '#007de9',
        'secondary': '#0D9488',
        'flag1': '#FF5900',
        'flag2': '#FFC600',
        'flag3': '#4f46e5',
      },
      fontSize: {
        // Title 
        't1': ['2.4rem;', {
          letterSpacing: '-0.01em',
          lineHeight: '1.5',
        }],
        't2': ['1.6rem', {
          letterSpacing: '-0.01em',
          lineHeight: '1.5',
        }],
        't3': ['1.4rem', {
          letterSpacing: '-0.01em',
          lineHeight: '20px',
        }],
        // subtitle
        'sub1': ['1.6rem', {
          letterSpacing: '-0.01em',
          lineHeight: '1.5',
        }],
        'sub2': ['1.2rem', {
          letterSpacing: '-0.01em',
          lineHeight: '1.5',
        }],
        // paragraph
        'p1': ['24px', {
          letterSpacing: '-0.01em',
          lineHeight: '20px',
        }],
        'p2': ['24px', {
          letterSpacing: '-0.01em',
          lineHeight: '20px',
        }],
      }
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      addCommonColors: true,
    })
  ],
}

