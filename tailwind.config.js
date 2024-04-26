/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff5f00",
        secondary: "#7B7B7B",
        terciary: "#191919",
        complement1: "#F4F4F4",
      },
    },
  },
  plugins: [],
}

