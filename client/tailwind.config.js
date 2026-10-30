/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#2D6A4F',
          'red-hover': '#24563F',
          'red-subtle': 'rgba(45, 106, 79, 0.08)',
          peach: '#D8E9A8',
          'peach-light': '#E8F2C9',
          dark: '#17251E',
          'dark-surface': '#24352C',
          gray: '#65756B',
          'gray-light': '#DCE4DA',
          surface: '#F4F6F0',
        }
      },
      fontFamily: {
        sans: ['"DM Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '26px',
      },
      boxShadow: {
        'editorial': '0 4px 20px rgba(23, 37, 30, 0.04)',
        'editorial-hover': '0 12px 32px rgba(23, 37, 30, 0.09)',
        'dark-float': '0 12px 36px rgba(15, 29, 21, 0.22)',
      }
    },
  },
  plugins: [],
}
