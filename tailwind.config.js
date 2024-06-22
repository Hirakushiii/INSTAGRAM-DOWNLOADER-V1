/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: ["./index.html"],
  theme: {
    extend: {
      colors: {
        'color-1': '#2D3250',
        'color-2': '#424769',
        'color-navbar': '#7077A1',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

