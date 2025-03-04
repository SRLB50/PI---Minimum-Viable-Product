/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './screens/**/*.{js,ts,tsx}',
    './navigation/**/*.{js,ts,tsx}',
  ],
  corePlugins: {
    backgroundOpacity: true,
  },
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
};
