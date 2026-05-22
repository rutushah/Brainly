/** @type {import ('tailwindcss').Config ;} */

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                blue:{
                    600: '#043847',
                    500: '#50c6eb',
                    300:'#b4ced6'
                }
            }
        }
    },
    plugins: []
}