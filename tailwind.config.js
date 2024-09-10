/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
    colors: {
      main: '#3D7C98',
      sec: '#73BOCD',
      light: '#A8DFF1',
      white: '#F5F5F5',
      black: '#1f1f1f',
    },
  },
  plugins: [],
};
