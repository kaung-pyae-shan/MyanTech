/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      },
      colors: {
        dark: "#1C1C25",
        light: "#F7F7F7",
        primary: "#703FFE", // Main purple
        secondary: "#2E9D95", // Teal
        accent: "#FE9256", // Orange
        success: "#7ABD3A", // Green
        info: "#52AFF0", // Blue
      },
      backgroundImage: {
        "gradient-purple": "linear-gradient(to bottom, #AC95F8, #703FFE)", 
        "gradient-teal": "linear-gradient(to bottom, #8CC5C3, #2E9D95)",
        "gradient-orange": "linear-gradient(to bottom, #F5C0A6, #FE9256)",     
        "gradient-green": "linear-gradient(to bottom, #B3D694, #7ABD3A)",
        "button": "linear-gradient(to right, #6B39FC, #52AFF0)",     
      },
    },
  },
  plugins: [],
};
