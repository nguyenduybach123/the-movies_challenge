/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'red-main': '#FF0000',
        'black-main': '#0f0f0f',
      },
    },
  },
  plugins: [],
}