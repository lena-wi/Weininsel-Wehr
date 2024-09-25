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
            main: '#7BA9c8',
            sec: '#004b00',
            white: '#ededed',
            grey: '#cdcdcd',
            green: '#B0E1A2',
            lightgreen: '#CBF5AF',
            red: '#fa0001',
        },
    },
    plugins: [],
}
