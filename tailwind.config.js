/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        header: '#282c34',
      },
      maxWidth: {
        '960': '960px',
      },
    },
  },
  plugins: [],
}
