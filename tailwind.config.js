/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: "#0a0510",
          50: "#f4f2f7",
          100: "#e3ddec",
          200: "#c3b6d6",
          300: "#9c85b8",
          400: "#725c92",
          500: "#4d3c6b",
          600: "#372a4e",
          700: "#261d38",
          800: "#171025",
          900: "#0a0510",
          950: "#05020a",
        },
        wine: {
          DEFAULT: "#5c0d24",
          50: "#fdf2f4",
          100: "#fbe0e5",
          200: "#f6c1cc",
          300: "#ec93a7",
          400: "#df5f7e",
          500: "#c93a5c",
          600: "#a92448",
          700: "#87193a",
          800: "#5c0d24",
          900: "#3f0a1b",
          950: "#280410",
        },
        rose: {
          DEFAULT: "#e8748f",
          light: "#f6b8c6",
          dark: "#b84b64",
        },
        blush: "#f9e4e8",
        cream: "#faf3ea",
        gold: "#d8a857",
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        hand: ["'Great Vibes'", "cursive"],
        body: ["'Inter'", "system-ui", "sans-serif"],
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.08)", opacity: "0.85" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(3deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "pulse-slow": "pulse-slow 2.6s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        twinkle: "twinkle 2.4s ease-in-out infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
