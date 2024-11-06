const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./public/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      width: {
        'popup': '800px'
      },
      height: {
        'popup': '600px'
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
} 