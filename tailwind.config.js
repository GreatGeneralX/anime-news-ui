// tailwind.config.ts or tailwind.config.js
export default {
  darkMode: 'class', // ←ここめっちゃ重要！！
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
