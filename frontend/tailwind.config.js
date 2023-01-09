/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {},
    },
    plugins: [require("daisyui")],
    daisyui:{
      themes:[
        {
          mytheme:{
            "base-100": "#F9F9F9",
          }
        }
      ]
    }
  }
  