// tailwind.config.js
const { createExpoTailwindConfig } = require('nativewind');

module.exports = createExpoTailwindConfig({
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});