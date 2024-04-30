/** @type {import('tailwindcss').Config} */
const glob = require('glob');
module.exports = {
  content: [
    './src/**/*.{html,js,vue,scss,ts}',
    './app/**/*.scss',
    glob('./app/**/*.scss'),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}

