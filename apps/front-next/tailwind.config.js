module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Nunito Sans', 'sans-serif'],
      serif: ['serif'],
    },
    colors: {
      transparent: 'transparent',
      white: 'white',
      black: 'black',
      gray: {
        100: '#FAFBFE',
        200: '#eaecf3',
        300: '#E2E8F0',
        400: '#CBD5E0',
        500: '#A0AEC0',
        600: '#718096',
        700: '#4A5568',
        800: '#2D3748',
        900: '#273444',
      },
      blue: {
        DEFAULT: '#008aff',
      },
      heading: {
        DEFAULT: '#152c5b',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
