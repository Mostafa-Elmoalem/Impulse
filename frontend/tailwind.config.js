/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      // ============================================
      // COLOR SYSTEM
      // ============================================
      colors: {
        // Brand colors (Purple gradient from your design)
        brand: {
          50: "#f3e5f5",
          100: "#e1bee7",
          200: "#ce93d8",
          300: "#ba68c8",
          400: "#ab47bc",
          500: "#512da8", // Primary
          600: "#5c6bc0", // Secondary/Accent
          700: "#4a148c",
          800: "#38006b",
          900: "#1a0033",
        },

        // Semantic colors
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          500: "#2ecc71", // From your spec
          600: "#16a34a",
          700: "#15803d",
        },

        danger: {
          50: "#fef2f2",
          100: "#fee2e2",
          500: "#e74c3c", // From your spec
          600: "#dc2626",
          700: "#b91c1c",
        },

        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          500: "#f1c40f", // From your spec
          600: "#ea580c",
          700: "#c2410c",
        },

        // Neutral grays (for backgrounds, text)
        gray: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
      },

      // ============================================
      // TYPOGRAPHY SYSTEM
      // ============================================
      fontFamily: {
        sans: ["Montserrat", "system-ui", "sans-serif"],
      },

      fontSize: {
        // Precise scale for Arabic/English bilingual support
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
      },

      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },

      // ============================================
      // SPACING SYSTEM (8px grid)
      // ============================================
      spacing: {
        0: "0",
        1: "0.25rem", // 4px
        2: "0.5rem", // 8px
        3: "0.75rem", // 12px
        4: "1rem", // 16px
        5: "1.25rem", // 20px
        6: "1.5rem", // 24px
        8: "2rem", // 32px
        10: "2.5rem", // 40px
        12: "3rem", // 48px
        16: "4rem", // 64px
        20: "5rem", // 80px
        24: "6rem", // 96px
      },

      // ============================================
      // BORDER RADIUS
      // ============================================
      borderRadius: {
        none: "0",
        sm: "0.25rem", // 4px
        DEFAULT: "0.5rem", // 8px
        md: "0.75rem", // 12px - Card-like
        lg: "1rem", // 16px - Modal-like
        xl: "1.5rem", // 24px - From your spec
        "2xl": "1.875rem", // 30px - From your spec
        full: "9999px",
      },

      // ============================================
      // SHADOWS
      // ============================================
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        DEFAULT: "0 2px 5px rgba(0, 0, 0, 0.1)", // From spec
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        lg: "0 5px 15px rgba(0, 0, 0, 0.35)", // From spec
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        none: "none",

        // Custom shadows for specific elements
        card: "0 2px 8px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 4px 16px rgba(0, 0, 0, 0.12)",
        modal: "0 10px 40px rgba(0, 0, 0, 0.2)",
      },

      // ============================================
      // TRANSITIONS
      // ============================================
      transitionDuration: {
        fast: "150ms",
        normal: "250ms",
        slow: "350ms",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },

      // ============================================
      // LAYOUT
      // ============================================
      maxWidth: {
        xs: "20rem", // 320px
        sm: "24rem", // 384px
        md: "28rem", // 448px
        lg: "32rem", // 512px
        xl: "36rem", // 576px
        "2xl": "42rem", // 672px
        "3xl": "48rem", // 768px
        "4xl": "56rem", // 896px
        "5xl": "64rem", // 1024px
        "6xl": "72rem", // 1152px
        "7xl": "80rem", // 1280px
        full: "100%",
        screen: "100vw",
      },

      // ============================================
      // Z-INDEX SCALE
      // ============================================
      zIndex: {
        dropdown: "1000",
        sticky: "1020",
        fixed: "1030",
        "modal-backdrop": "1040",
        modal: "1050",
        popover: "1060",
        tooltip: "1070",
      },

      // ============================================
      // ANIMATIONS
      // ============================================
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-in-down": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },

      animation: {
        "fade-in": "fade-in 0.25s ease-out",
        "fade-out": "fade-out 0.25s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-in-left": "slide-in-left 0.3s ease-out",
        "slide-in-up": "slide-in-up 0.3s ease-out",
        "slide-in-down": "slide-in-down 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },

  plugins: [
    // Add custom utilities
    function ({ addUtilities }) {
      addUtilities({
        ".text-gradient": {
          background: "linear-gradient(to right, #5c6bc0, #512da8)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
        ".bg-gradient-brand": {
          background: "linear-gradient(to right, #5c6bc0, #512da8)",
        },
        ".glass": {
          background: "rgba(255, 255, 255, 0.1)",
          "backdrop-filter": "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        },
      });
    },
  ],
};
