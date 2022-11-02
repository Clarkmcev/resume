/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx,js}"],
  theme: {
    extend: {
      colors: {
        first: "#1D3E53",
        second: "#254B62",
        third: "#476D7C",
        fourth: "#77ABB7",
        fifth: "#ffffff",
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
