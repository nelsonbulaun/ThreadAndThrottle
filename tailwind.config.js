/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./src/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // OriginSansBold:["OriginSansBold"],
        OriginSans:["OriginSans"],
        OriginSansLight:["OriginSansLight"]
      },
    },
  },
  plugins: [require("daisyui")],
}

