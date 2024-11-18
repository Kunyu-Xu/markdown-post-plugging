import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./public/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      minWidth: {
        'popup': '300px'
      },
      minHeight: {
        'popup': '150px'
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
} 