/** @type {import('tailwindcss').Config} */
/**
 * La Casita de Mami — paleta "Turquesa + Verde"
 *
 *   Turquesa   → primary        #25c1e9
 *   Verde      → accent-lime    #e8ff52
 */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ─── Brand anchor (turquesa) ──────────────────────────────────────
        "primary":          "#25c1e9",
        "primary-dark":     "#1a9dc0",
        "primary-soft":     "#e0f6fc",
        "secondary":        "#1a9dc0",

        // ─── Acentos ─────────────────────────────────────────────────────
        "accent-pink":      "#7ee8d0",
        "accent-pink-soft": "#d9f7f0",
        "accent-butter":    "#e8ff52",
        "accent-butter-soft":"#f5ffb8",
        "accent-sky":       "#7dcfeb",
        "accent-sky-soft":  "#d6f0fa",

        // ─── Compatibilidad con tokens del repo actual ────────────────────
        "accent-lime":      "#e8ff52",
        "accent-lime-dark": "#c8e030",
        "accent-coral":     "#7ee8d0",

        // ─── Superficies y fondos ─────────────────────────────────────────
        "background-light": "#f5fdff",
        "background-dark":  "#0d2d3a",
        "surface-light":    "#FFFFFF",

        // ─── Texto ────────────────────────────────────────────────────────
        "text-main":   "#0d2d3a",
        "text-muted":  "#5a7a85",
        "soft-gray":   "#5a7a85",
        "charcoal":    "#0d2d3a",
      },
      fontFamily: {
        "display": ["Fraunces", "Plus Jakarta Sans", "serif"],
        "sans":    ["Plus Jakarta Sans", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg":  "1rem",
        "xl":  "1.5rem",
        "2xl": "2rem",
        "3xl": "2.5rem",
        "full":"9999px",
      },
      boxShadow: {
        "soft":         "0 4px 20px -2px rgba(37, 193, 233, 0.15)",
        "card":         "0 10px 15px -3px rgba(13, 45, 58, 0.05), 0 4px 6px -2px rgba(13, 45, 58, 0.025)",
        "brand":        "0 20px 60px -30px rgba(37, 193, 233, 0.40)",
        "button":       "0 10px 28px -10px rgba(37, 193, 233, 0.55)",
        "button-sm":    "0 6px 20px -6px rgba(37, 193, 233, 0.50)",
        "card-hover":   "0 24px 50px -30px rgba(37, 193, 233, 0.45)",
        "card-hover-sm":"0 14px 30px -16px rgba(37, 193, 233, 0.30)",
      },
    },
  },
  plugins: [],
}
