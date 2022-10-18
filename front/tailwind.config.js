/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
    screens: {
      'jb': { 'max': '444px' },
      'sp': { 'max': '520px' },
      'sb': { 'max': '640px' },
      'tb': { 'max': '960px' },
    },
  },
  plugins: [],
}
