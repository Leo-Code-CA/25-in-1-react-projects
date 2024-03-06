/** @type {import('tailwindcss').Config} */
export default {
  content: {
    relative: true,
    files: [
      "./src/components/recipe-app/**/*.{js,jsx,ts,tsx}",
      "./src/components/shopping-cart-app/**/*.{js,jsx,ts,tsx}"
    ]
  },
  theme: {
    extend: {},
  },
  plugins: [],
};

