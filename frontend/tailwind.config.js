/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",

  theme: {
    extend: {
      colors: {
        // Base backgrounds - High Contrast Setup
        background: {
          DEFAULT: "#F3F4F6", // Gray-100 (تباين قوي مع البطاقات البيضاء)
          paper: "#FFFFFF", // Pure White
          dark: "#0B0E14",
          "paper-dark": "#151A25",
        },
        // Typography - Sharp & Readable
        foreground: {
          DEFAULT: "#0F172A", // Slate-900 (أسود قوي)
          muted: "#64748B", // Slate-500
          dark: "#E2E8F0",
          "muted-dark": "#94A3B8",
        },
        border: {
          DEFAULT: "#E5E7EB", // Gray-200 (حدود واضحة)
          dark: "#2D3748",
        },

        // Brand
        brand: {
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
          950: "#2E1065",
        },

        // Status Colors (Vibrant)
        status: {
          danger: "#DC2626",
          warning: "#D97706",
          info: "#2563EB",
          success: "#059669",
        },
      },
      fontFamily: {
        sans: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)",

        // Crisp Shadows for Depth
        soft: "0 2px 10px rgba(0,0,0,0.03)",
        card: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        "card-hover":
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        glow: "0 0 20px rgba(139, 92, 246, 0.2)",
      },
      borderRadius: {
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out",
        "slide-in-up": "slide-in-up 0.5s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      zIndex: {
        sticky: "1020",
        fixed: "1030",
        modal: "1050",
        popover: "1060",
        tooltip: "1070",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
        ".glass": {
          background: "rgba(255, 255, 255, 0.8)",
          "backdrop-filter": "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        },
      });
    },
  ],
};
