/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",

  theme: {
    extend: {
      // ============================================
      // 1. SCALABLE COLOR SYSTEM (Soft & Calm Palette)
      // ============================================
      colors: {
        // Semantic Tokens (For Scalability & Theming)
        background: {
          DEFAULT: "#F5F7FA", // Soft Blue-Grey (Main App BG)
          paper: "#FFFFFF", // Cards / Modals
          dark: "#0B0E14", // Deep Blue-Black
          "paper-dark": "#151A25", // Lighter element bg for Dark Mode
        },
        foreground: {
          DEFAULT: "#2D3748", // Soft charcoal
          muted: "#718096", // Muted text
          dark: "#E2E8F0", // Light gray for dark mode
          "muted-dark": "#94A3B8",
        },
        border: {
          DEFAULT: "#E2E8F0",
          dark: "#2D3748",
        },

        // Brand Scale - Soft Lavender/Purple (HealDocs Style)
        brand: {
          50: "#F3E8FF",
          100: "#E9D5FF",
          200: "#D8B4FE",
          300: "#C084FC",
          400: "#A855F7",
          500: "#8B5CF6", // Primary
          600: "#7C3AED", // Hover
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
          950: "#2E1065",
        },

        // Status Colors - Pastel for Light, Vibrant for Dark
        status: {
          danger: "#EF4444",
          warning: "#F59E0B",
          info: "#3B82F6",
          success: "#10B981",
        },

        // Full Scales for Micro-Interactions (Scalability)
        success: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          500: "#10B981",
          600: "#059669",
          900: "#064E3B",
        },
        danger: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          500: "#EF4444",
          600: "#DC2626",
          900: "#7F1D1D",
        },
        warning: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          500: "#F59E0B",
          600: "#D97706",
          900: "#78350F",
        },
        info: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          500: "#3B82F6",
          600: "#2563EB",
          900: "#1E3A8A",
        },

        // Neutral Grays (Cool Toned)
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
          950: "#030712",
        },
      },

      // ============================================
      // 2. TYPOGRAPHY SYSTEM
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
      },

      // ============================================
      // 3. SOFT SHADOWS & ELEVATION
      // ============================================
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",

        // Custom Soft Shadows (تم إصلاحها هنا)
        soft: "0 4px 20px 0 rgba(0, 0, 0, 0.05)",
        card: "0 1px 3px rgba(0,0,0,0.05), 0 5px 15px rgba(0,0,0,0.02)",
        "card-hover":
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)", // ✅ تمت الإضافة
        glow: "0 0 15px rgba(139, 92, 246, 0.3)", // Brand glow
        modal: "0 20px 32px -8px rgb(0 0 0 / 0.12)",
      },

      // ============================================
      // 4. SPACING & RADIUS
      // ============================================
      borderRadius: {
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem", // Extra soft corners for cards
        "3xl": "2rem",
        full: "9999px",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        120: "30rem",
      },

      // ============================================
      // 5. ANIMATIONS & KEYFRAMES
      // ============================================
      animation: {
        "fade-in": "fade-in 0.4s ease-out",
        "slide-in-right": "slide-in-right 0.4s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.96)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },

      // ============================================
      // 6. Z-INDEX SYSTEM
      // ============================================
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
          background: "rgba(255, 255, 255, 0.7)",
          "backdrop-filter": "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        },
        ".glass-dark": {
          background: "rgba(15, 20, 25, 0.7)",
          "backdrop-filter": "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      });
    },
  ],
};
