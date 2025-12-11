// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f3e5f5",
          100: "#e1bee7",
          200: "#ce93d8",
          300: "#ba68c8",
          400: "#ab47bc",
          500: "#512da8",
          600: "#311b92",
          700: "#4a148c",
          800: "#38006b",
          900: "#1a0033",
        },
        bg: {
          main: "var(--bg-color)",
          surface: "var(--surface-color)",
        },
        text: {
          main: "var(--text-primary)",
          secondary: "var(--text-secondary)",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        "custom-lg": "var(--shadow-lg)",
        "custom-sm": "var(--shadow-sm)",
      },
      borderRadius: {
        "custom-lg": "var(--border-radius-lg)",
        "custom-md": "var(--border-radius-md)",
      },
    },
  },
  plugins: [],
};
