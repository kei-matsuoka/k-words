/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
    screens: {
      'sp': { 'max': '520px' },
      // JColumnBarの長さ
      'jb': { 'max': '603px' },
      'sb': { 'max': '640px' },
      'tb': { 'max': '960px' },
    },
  },
  plugins: [],
}
