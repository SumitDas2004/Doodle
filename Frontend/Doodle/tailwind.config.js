/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens:{
        phone: '0px',
        tablet: '426px'
      },
      colors:{
        'backBlue': '#4a53b5',
        'frontBlue':'#9da8f1',
        'pink':'#ee7ab1'
      },
    },
  },
  plugins: [],
}

