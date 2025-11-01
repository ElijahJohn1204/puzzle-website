/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",   // All TS/TSX files in app folder
    "./src/components/**/*.{ts,tsx}", // Optional if you have components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
