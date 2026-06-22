import root from '../tailwind.config.js'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [root],
  content: [
    './galeria/index.html',
    './galeria/src/**/*.{js,jsx}',
  ],
}
