/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#081120",
        navy: "#0e1a2f",
        mist: "#eef4ff",
        canvas: "#f5f7fb",
        accent: {
          DEFAULT: "#0f7bff",
          deep: "#085ed6",
          soft: "#dbeafe",
        },
        success: "#16a34a",
        warning: "#d97706",
        danger: "#dc2626",
      },
      fontFamily: {
        display: ["Sora", "ui-sans-serif", "system-ui"],
        body: ["Manrope", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        panel: "0 24px 60px rgba(8, 17, 32, 0.12)",
        glow: "0 20px 50px rgba(15, 123, 255, 0.25)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(rgba(15,123,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,123,255,0.05) 1px, transparent 1px)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.7" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        rise: "rise 0.7s ease-out both",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
