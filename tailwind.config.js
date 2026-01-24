/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Figtree", "sans-serif"],
      },
      colors: {
        mute_text: "#6B7280",
        primary: "#00b562",
        surface: "#F9FAFB",
      },

      /* 🔁 Infinite horizontal scroll animation */
      animation: {
        "infinite-scroll": "infinite-scroll 30s linear infinite",
      },
      keyframes: {
        "infinite-scroll": {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
        },
      },
    },
  },
  plugins: [],
};
