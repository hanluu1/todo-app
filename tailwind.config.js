/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // For Create React App
    "./pages/**/*.{js,ts,jsx,tsx}", // For Next.js pages
    "./components/**/*.{js,ts,jsx,tsx}", // For Next.js components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

