/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.js", "./components/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
