/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#3189F0",
      label : {
        300 : "#2C2C2E",
        200 : "#3D3D3D",
        100 : "#666668",
      },
      background : "#FFF",
      onBackground : "#F2F2F7",
    },
    extend: {},
  },
  plugins: [],
};
