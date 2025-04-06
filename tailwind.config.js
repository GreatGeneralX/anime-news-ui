/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ガンダム風カラー
        gundam: {
          white: '#ffffff',
          red: '#e53935',
          blue: '#1e88e5',
          yellow: '#fdd835',
        },
        // ミク風カラー（ダークモード向け）
        miku: {
          mint: '#3fe0d0',
          blue: '#28a9e0',
          black: '#1e1e2f',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
