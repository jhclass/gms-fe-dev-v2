const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      // lg: '976px',
      lg: '1440px'
    },
    extend: {
      width: {
        'web': '1440px',
      },
      colors: {
        'primary': '#4f46e5',
        'secondary': '#0284c7',
        // 'success': '#ff7849',
        // 'warning': '#273444',
        // 'danger': '#8492a6',
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

