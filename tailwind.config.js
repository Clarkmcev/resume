/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx,js}"],
  theme: {
    extend: {
      colors: {
        // Values live in src/App.css so they can switch with the theme
        first: "rgb(var(--color-first) / <alpha-value>)",
        second: "rgb(var(--color-second) / <alpha-value>)",
        third: "rgb(var(--color-third) / <alpha-value>)",
        fourth: "rgb(var(--color-fourth) / <alpha-value>)",
        fifth: "rgb(var(--color-fifth) / <alpha-value>)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        bit: ["bit", "cursive"],
        pixel: ["pixel", "cursive"],
      },
    },
  },
  plugins: [],
};
