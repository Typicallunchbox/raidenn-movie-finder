/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend:
    {
      fontFamily: {
        'thunderBoldLC': ['ThunderBoldLC', 'sans-serif'],
        'mediumLC': ['MediumLC', 'sans-serif']

      },
    },
  },
  plugins: [],
}