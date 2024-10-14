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
      md: '769px',
    },
    extend: {
      width: {
        web: '1440px',
      },
      colors: {
        primary: '#007de9',
        secondary: '#07bbae',
        teriary: '#7859bf',
        accent: '#ff5900',
        gray: '#71717a',
        lightGray: '#d4d4d8',
        black: '#11181c',
        offWhite: '#eee',
        red: '#ff0000',
        lightPrimary: '#d9e3fa',
        mainBG: '#d6e4f1',
        lightYellow: '#fffff9',
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
