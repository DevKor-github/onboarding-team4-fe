/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3189F0",
        label: {
          300: "#2C2C2E",
          200: "#3D3D3D",
          100: "#666668",
        },
        background: "#FFF",
        onBackground: "#F2F2F7",
      },
      boxShadow: {
        'top-xs': '0px -1px 0px #E5E5EA',
        'bottom-xs': '0px 1px 0px #E5E5EA',
      }
    },
  },
  plugins: [],
};
