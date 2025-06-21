/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
    content: [
        "./assets/**/*.js",
        "./templates/**/*.html.twig",
    ],
    darkMode: 'selector',
    theme: {
        extend: {
            screens: {
                'xs': '375px',
                'xl': '1440px',
            },
            fontFamily: {
                primary: 'var(--ff-primary)',
            },
            colors: {
                neutral: {
                    900: 'hsl(var(--clr-neutral-900) / <alpha-value>)',
                    800: 'hsl(var(--clr-neutral-800) / <alpha-value>)',
                    700: 'hsl(var(--clr-neutral-700) / <alpha-value>)',
                    600: 'hsl(var(--clr-neutral-600) / <alpha-value>)',
                    300: 'hsl(var(--clr-neutral-300) / <alpha-value>)',
                    200: 'hsl(var(--clr-neutral-200) / <alpha-value>)',
                    100: 'hsl(var(--clr-neutral-100) / <alpha-value>)',
                    DEFAULT: 'hsl(var(--clr-neutral-0) / <alpha-value>)',
                },
                accent: {
                    'red-400': 'hsl(var(--clr-red-400) / <alpha-value>)',
                    'red-500': 'hsl(var(--clr-red-500) / <alpha-value>)',
                    'red-700': 'hsl(var(--clr-red-700) / <alpha-value>)',
                },
                gradient: {
                    light: 'var(--light-gradient)',
                    dark: 'var(--dark-gradient)',
                }
            },
            fontSize: {
                400: 'var(--fs-400)',
                500: 'var(--fs-500)',
                600: 'var(--fs-600)',
                700: 'var(--fs-700)',
                800: 'var(--fs-800)',
                900: 'var(--fs-900)',
            },
            lineHeight: {
                'wide-1-4': 'var(--leading-1-4)',
            },
            /* Create a fade out with slide out to the top keyframes */
            keyframes: {
                'fade-out': {
                    '0%': {opacity: '1', transform: 'translateY(0)'},
                    '100%': {opacity: '0', transform: 'translateY(-20px)'},
                },
            },
            animation: {
                'fade-out': 'fade-out 0.3s ease-in-out forwards',
            },
        },
    },
    plugins: [],
}
