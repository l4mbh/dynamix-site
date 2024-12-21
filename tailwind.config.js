/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'yellow-primary' : '#FFC000',
        'black-text': '#333333',
        'secondary-text': '#949494',
        'dark-bg': '#252525',
        'gray-bg': '#eeeeee'
      }
    },
  },
  plugins: [],
}