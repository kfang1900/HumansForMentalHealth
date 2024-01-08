/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-georgia)"],
        mono: ["var(--font-inter)"]
      },
      colors: {
        'skin': '#fff9f2'
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
