/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // 1. الخطوط (Typography)
      fontFamily: {
        sans: ["Montserrat", "sans-serif"], // الخط الأساسي للمشروع
      },

      // 2. الألوان (Colors) - نفس ألوان التصميم القديم بالضبط
      colors: {
        primary: {
          DEFAULT: "#512da8", // اللون البنفسجي الأساسي للأزرار والعناوين
          light: "#5c6bc0", // اللون الفاتح للتدرج (Gradient)
          dark: "#311b92", // لون أغمق عند التحويم (Hover)
        },
        bg: {
          main: "#e2e2e2", // لون خلفية الصفحة الرمادي الفاتح
          secondary: "#c9d6ff", // اللون الثاني في تدرج الخلفية
        },
        surface: "#ffffff", // لون الكروت والخلفيات البيضاء
        text: {
          primary: "#333333", // لون النصوص الأساسي
          secondary: "#666666", // لون النصوص الفرعية
        },
      },

      // 3. التدرجات اللونية (Gradients)
      backgroundImage: {
        "primary-gradient": "linear-gradient(to right, #5c6bc0, #512da8)", // تدرج الـ Toggle Panel
        "body-gradient": "linear-gradient(to right, #e2e2e2, #c9d6ff)", // تدرج خلفية الصفحة
      },

      // 4. الظلال (Shadows)
      boxShadow: {
        card: "0 5px 15px rgba(0, 0, 0, 0.35)", // ظل الكارت القوي
        soft: "0 2px 5px rgba(0, 0, 0, 0.1)", // ظل خفيف للعناصر الأخرى
      },

      // 5. الانحناءات (Border Radius)
      borderRadius: {
        card: "30px", // انحناء الكارت الكبير
        button: "8px", // انحناء الأزرار والحقول
        overlay: "150px", // انحناء الـ Panel المتحرك
      },

      // 6. الحركة (Animations)
      animation: {
        "slide-in": "move 0.6s ease-in-out", // حركة النصوص عند التبديل
      },
      keyframes: {
        move: {
          "0%, 49.99%": { opacity: "0", zIndex: "1" },
          "50%, 100%": { opacity: "1", zIndex: "5" },
        },
      },
    },
  },
  plugins: [],
};
