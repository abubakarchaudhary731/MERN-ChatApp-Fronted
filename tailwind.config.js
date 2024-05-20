/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D75D3",
        secondary: "#1D1D1D",
        secondaryGray: "#9C9C9C",
        success: "#3E8415",
        danger: "#D94F00",
        link: "#4D4D4D",
        backgroundColor: "#000000",
        textColor: "#FFFFFF",
        lightGray: "#757575",
        darkGray: "#1D1D1D",
        // Chat Colors
        chatheader: "#202c33",
        chatsBg: "#111b21",
        iconHover: "rgb(55,66,72)",
        chatMsg: "#285d4b",
      },
    },
  },
  plugins: [],
}