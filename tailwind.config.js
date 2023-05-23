/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        banner_gradient: 'linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0D0B14 98.75%)'
      },
      screens: {
        xs: '310px',
      }
    }
  },
  plugins: []
}
