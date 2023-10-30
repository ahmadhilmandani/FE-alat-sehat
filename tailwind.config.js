/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': {
          50: '#CDF5FD',
          100: '#A0E9FF',
          200: '#89CFF3',
          300: '#00A9FF',
          400: '#192655',
        },
        'brand-white': {
          50: '#F7F7F7'
        }
      }
    },
  },
  plugins: [],
}

