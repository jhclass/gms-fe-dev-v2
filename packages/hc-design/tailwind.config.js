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
      wmd: '768px',
      lg: '960px',
      xl: '1440px',
    },
    extend: {
      width: {
        web: '1440px',
      },
      colors: {
        primary: '#100061',
        secondary: '#0D9488',
        flag1: '#FF5900',
        flag2: '#FFC600',
        flag3: '#4f46e5',
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
