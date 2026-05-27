/** @type {import('tailwindcss').Config} */
/**
 * La Casita de Mami — paleta "Multipastel"
 * Todos los colores derivan del logo real (franjas + wordmark + nube).
 *
 *   Violeta wordmark   → primary        #8A4FBD
 *   Rosa franja        → accent-pink    #F4A8C9
 *   Amarillo franja    → accent-butter  #FFE48A
 *   Celeste franja     → accent-sky     #B6D8EE
 *   Crema (fondo nube) → background    #FFFCF7
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
        // ─── Brand anchor (violeta del wordmark) ──────────────────────────
        "primary":          "#8A4FBD",
        "primary-dark":     "#6F3CA0",
        "primary-soft":     "#F1E9FB",  // tinte 8% para chips, hovers, fondos suaves
        "secondary":        "#6F3CA0",

        // ─── Acentos (franjas del logo) ───────────────────────────────────
        "accent-pink":      "#F4A8C9",
        "accent-pink-soft": "#FCEBF2",
        "accent-butter":    "#FFE48A",
        "accent-butter-soft":"#FFF6D1",
        "accent-sky":       "#B6D8EE",
        "accent-sky-soft":  "#E8F2FA",

        // ─── Compatibilidad con tokens del repo actual ────────────────────
        // (mantengo los nombres para no romper Header/Footer/etc.)
        "accent-lime":      "#FFE48A",   // antes lima fluorescente → ahora butter
        "accent-lime-dark": "#F6D34A",
        "accent-coral":     "#F4A8C9",   // alias del rosa de marca

        // ─── Superficies y fondos ─────────────────────────────────────────
        "background-light": "#FFFCF7",   // crema cálida (era #f9f8f6 grisáceo)
        "background-dark":  "#2A1F3A",   // violeta tinta para inversos
        "surface-light":    "#FFFFFF",

        // ─── Texto ────────────────────────────────────────────────────────
        "text-main":   "#2A1F3A",        // tinta violeta — armoniza con primary
        "text-muted":  "#7A6E88",        // gris violáceo
        "soft-gray":   "#7A6E88",
        "charcoal":    "#2A1F3A",
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
        // Sombras teñidas con el violeta de marca (antes eran turquesa)
        "soft":         "0 4px 20px -2px rgba(138, 79, 189, 0.15)",
        "card":         "0 10px 15px -3px rgba(42, 31, 58, 0.05), 0 4px 6px -2px rgba(42, 31, 58, 0.025)",
        "brand":        "0 20px 60px -30px rgba(138, 79, 189, 0.40)",
        // Sombras directas bajo CTAs — copiadas del prototipo
        "button":       "0 10px 28px -10px rgba(138, 79, 189, 0.55)",
        "button-sm":    "0 6px 20px -6px rgba(138, 79, 189, 0.50)",
        "card-hover":   "0 24px 50px -30px rgba(138, 79, 189, 0.45)",
        "card-hover-sm":"0 14px 30px -16px rgba(138, 79, 189, 0.30)",
      },
    },
  },
  plugins: [],
}
