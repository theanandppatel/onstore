/** @type {import('tailwindcss').Config} */ 
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            custom: {
                DEFAULT: '#000000',
                light: '#ffffff'
            }
        },
        fontFamily: {
          sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        },
  }
},
  plugins: [
    require('@tailwindcss/line-clamp'),
    require("tw-elements/dist/plugin"),
    require('tailwind-scrollbar')
  ],
}