/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",

  theme: {
    extend: {
      // ============================================
      // REDESIGNED COLOR SYSTEM - Calm & Modern
      // ============================================
      colors: {
        // Semantic colors
        border: {
          DEFAULT: "#e5e7eb", // Light mode
          dark: "#374151", // Dark mode
        },
        input: {
          DEFAULT: "#f3f4f6",
          dark: "#1f2937",
        },
        ring: {
          DEFAULT: "#8b5cf6",
          dark: "#a78bfa",
        },
        background: {
          DEFAULT: "#fafbfc", // Softer than pure white
          dark: "#0f1419", // Softer than pure black
        },
        foreground: {
          DEFAULT: "#1f2937",
          dark: "#f9fafb",
        },

        // Brand colors - Soft Purple/Lavender (inspired by references)
        brand: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7", // Primary - softer purple
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
        },

        // Semantic colors - Softer tones
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          500: "#10b981", // Softer green
          600: "#059669",
          700: "#047857",
        },

        danger: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          500: "#ef4444", // Softer red
          600: "#dc2626",
          700: "#b91c1c",
        },

        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          500: "#f59e0b", // Softer amber
          600: "#d97706",
          700: "#b45309",
        },

        // Info color (for stats cards)
        info: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },

        // Neutral grays - Softer contrast
        gray: {
          50: "#fafbfc",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
          950: "#030712",
        },
      },

      // ============================================
      // REDESIGNED TYPOGRAPHY - Clean & Modern
      // ============================================
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },

      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.25", letterSpacing: "0.01em" }],
        sm: ["0.875rem", { lineHeight: "1.5", letterSpacing: "0" }],
        base: ["1rem", { lineHeight: "1.625", letterSpacing: "0" }],
        lg: ["1.125rem", { lineHeight: "1.75", letterSpacing: "-0.01em" }],
        xl: ["1.25rem", { lineHeight: "1.75", letterSpacing: "-0.01em" }],
        "2xl": ["1.5rem", { lineHeight: "2", letterSpacing: "-0.02em" }],
        "3xl": ["1.875rem", { lineHeight: "2.25", letterSpacing: "-0.02em" }],
        "4xl": ["2.25rem", { lineHeight: "2.5", letterSpacing: "-0.03em" }],
      },

      // ============================================
      // SOFTER SHADOWS - Calm & Subtle
      // ============================================
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.03)",
        sm: "0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)",
        DEFAULT:
          "0 2px 4px -1px rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07)",
        lg: "0 8px 16px -4px rgb(0 0 0 / 0.08), 0 4px 8px -4px rgb(0 0 0 / 0.08)",
        xl: "0 16px 24px -6px rgb(0 0 0 / 0.09), 0 8px 12px -6px rgb(0 0 0 / 0.09)",
        "2xl": "0 24px 40px -8px rgb(0 0 0 / 0.1)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.04)",
        none: "none",

        // Custom named shadows
        card: "0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)",
        "card-hover":
          "0 4px 8px -2px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.08)",
        modal: "0 20px 32px -8px rgb(0 0 0 / 0.12)",
        dropdown: "0 8px 16px -4px rgb(0 0 0 / 0.1)",
      },

      // ============================================
      // REFINED SPACING - Consistent Rhythm
      // ============================================
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        88: "22rem",
        120: "30rem",
      },

      // ============================================
      // SOFTER BORDER RADIUS
      // ============================================
      borderRadius: {
        sm: "0.375rem",
        DEFAULT: "0.5rem",
        md: "0.625rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },

      // ============================================
      // SMOOTH ANIMATIONS
      // ============================================
      transitionDuration: {
        fast: "150ms",
        normal: "250ms",
        slow: "400ms",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },

      // ============================================
      // KEYFRAMES - Subtle Animations
      // ============================================
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.96)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },

      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-in-left": "slide-in-left 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        shimmer: "shimmer 2s linear infinite",
        float: "float 3s ease-in-out infinite",
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
    },
  },

  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".text-gradient": {
          background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
        ".bg-gradient-brand": {
          background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
        },
        ".glass": {
          background: "rgba(255, 255, 255, 0.7)",
          "backdrop-filter": "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        },
        ".glass-dark": {
          background: "rgba(15, 20, 25, 0.7)",
          "backdrop-filter": "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    },
  ],
};
