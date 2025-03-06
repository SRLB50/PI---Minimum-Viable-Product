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
    extend: {
      width: {
        inputStandart: '1px'
      },
      colors: {
        bgHeader: '#1C1C1C',
        darkButton: '#2C2C2C',
        darkButtonText: '#F5F5F5',
        inputLabelText: '#1E1E1E',
        inputText: '#B3B3B3',
        inputBorder: '#DBDBDB',
        titleText: '#161616',
        separationLine: '#D3D3D38C',
        text: '#1E1E1E',
        bg: '#FFFFFF',
        lightButtonText: '#2C2C2C',
        clickableText: '#9C9C9C',
      },
      fontFamily: {
        inter: ['Inter' , 'sans-serif']
      }
    },
  },
  plugins: [],
};
