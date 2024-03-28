/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                blue: '#0066FF',
                blueLight: '#E8F1FF',
                black: '#000000',
                secondaryBlack: '#151515',
                red: '#eb001b',
                redLight: '#ffcdcd',
                gray: '#CECECE',
                grayLight: '#E0E0E0',
                grayDark: '#4D5766',
                white: '#ffffff',
                current: 'currentColor'
            },
            borderRadius: {
                5: '5px',
                7: '7px',
            },
        },
    },
    plugins: [],
}
