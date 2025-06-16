/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FFCE1A',
        'secondary': '#0D0842',
        'blackBG': '#F3F3F3',
        'Favorite': '#FF5841',
      },
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
        secondary: ['Nunito Sans', 'sans-serif'],
      },      
    
    },
  },
  plugins: [],
}
