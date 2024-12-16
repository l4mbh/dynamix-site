/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text-primary' : '#FFC000',
        'bg-main': '#FFC000'
      }
    },
  },
  plugins: [],
}