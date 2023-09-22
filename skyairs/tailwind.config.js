/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        Prompt: ["var(--body-font)", "sans-serif"],
        navbar: ["Bell MT Semi Bold"],
      },
      colors: {
        primary: "#002060",
        secondary: "#3498db",
        tertiary: "#247bb6",
        gray: "#9a9a9a",
      },
      screens: {
        desktop: "1360px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
