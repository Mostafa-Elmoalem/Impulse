/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#512da8",
        secondary: "#5c6bc0",
        surface: "#ffffff",
        background: "#e0e0e0",
      },
    },
  },
  plugins: [],
};
