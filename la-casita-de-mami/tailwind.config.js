/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#42d7ca",
        "primary-dark": "#36b2a8",
        "secondary": "#26B8A2",
        "accent-lime": "#d9f99d",
        "accent-lime-dark": "#bef264",
        "accent-coral": "#fda4af",
        "background-light": "#f9f8f6",
        "background-dark": "#12201e",
        "surface-light": "#F8F8F7",
        "text-main": "#121717",
        "text-muted": "#668582",
        "soft-gray": "#668582",
        "charcoal": "#121717",
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "sans-serif"],
        "sans": ["Plus Jakarta Sans", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "2xl": "2rem",
        "full": "9999px"
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(66, 215, 202, 0.15)',
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
      }
    },
  },
  plugins: [],
}
