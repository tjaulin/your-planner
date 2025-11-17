import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', 'Quicksand', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                // Palette Your Planner 🌸
                'mauve': {
                    50: '#FAF5FA',
                    100: '#F5EAF5',
                    200: '#EBD5EB',
                    300: '#E0C0E0',
                    400: '#D4A6D4',
                    500: '#C8A2C8', // Couleur principale
                    600: '#B88CB8',
                    700: '#9F729F',
                    800: '#7A567A',
                    900: '#4D364D',
                },
                'lavande': {
                    50: '#F8F8FF', // Blanc lavande
                    100: '#F0F0FF',
                    200: '#E6E6FA', // Lavande douce
                    300: '#D4D4F5',
                    400: '#C2C2F0',
                    500: '#B0B0EB',
                    600: '#9E9EE6',
                },
                'rosepoudre': {
                    50: '#FDF9FC',
                    100: '#F9F0F7',
                    200: '#F2D7EE', // Rose poudré
                    300: '#ECCFE8',
                    400: '#E5C7E2',
                    500: '#DFBFDC',
                    600: '#D9B7D6',
                    700: '#C99DC9',
                },
                'grisdoux': {
                    50: '#FAFAFA',
                    100: '#F5F5F5', // Gris clair
                    200: '#EEEEEE',
                    300: '#E0E0E0',
                    400: '#BDBDBD',
                    500: '#9E9E9E',
                    600: '#757575',
                },
            },
            borderRadius: {
                '2xl': '1rem',
                '3xl': '1.5rem',
            },
            boxShadow: {
                'pastel': '0 4px 6px -1px rgba(200, 162, 200, 0.1), 0 2px 4px -1px rgba(200, 162, 200, 0.06)',
                'pastel-lg': '0 10px 15px -3px rgba(200, 162, 200, 0.1), 0 4px 6px -2px rgba(200, 162, 200, 0.05)',
            },
        },
    },

    plugins: [forms],
};
