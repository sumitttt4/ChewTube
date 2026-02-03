import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        chew: {
          50: "#f9f6ff",
          100: "#efe8ff",
          200: "#dbcaff",
          300: "#c3a3ff",
          400: "#a675ff",
          500: "#8a4dff",
          600: "#7334f0",
          700: "#5f28c4",
          800: "#4d2398",
          900: "#3b1c6e"
        }
      }
    }
  },
  plugins: []
};

export default config;
