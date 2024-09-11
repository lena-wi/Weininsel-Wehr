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
            main: '#B0E1A2',
            sec: '#CBF5AF',
            third: '#FAFFD6',
            white: '#F5F5F5',
            black: '#1f1f1f',
        },
    },
    plugins: [],
}
