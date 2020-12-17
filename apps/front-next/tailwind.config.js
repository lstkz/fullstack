/* eslint-disable no-undef */

const Color = require('tinycolor2');

const BaseColors = {
  blue: '#008aff',
  indigo: '#6e00ff',
  purple: '#510FA8',
  pink: '#f074ad',
  red: '#f25767',
  orange: '#FFBE3D',
  yellow: '#ffc431',
  green: '#5cc9a7',
  teal: '#50b5ff',
  cyan: '#4bd6e5',
  white: '#FFF',
  gray_100: '#FAFBFE',
  gray_200: '#eaecf3',
  gray_300: '#E2E8F0',
  gray_400: '#CBD5E0',
  gray_500: '#A0AEC0',
  gray_600: '#718096',
  gray_700: '#4A5568',
  gray_800: '#2D3748',
  gray_900: '#273444',
  black: '#1F2D3D',
};

const BaseThemeColors = {
  primary: BaseColors.blue,
  secondary: BaseColors.gray_200,
  neutral: BaseColors.white,
  success: BaseColors.green,
  info: BaseColors.teal,
  warning: BaseColors.orange,
  danger: BaseColors.red,
  light: BaseColors.gray_200,
  dark: '#171347',
};

function darken(color, n = 10) {
  return Color(color).darken(n).toHexString();
}
function lighten(color, n = 10) {
  return Color(color).lighten(n).toHexString();
}

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
        100: BaseColors.gray_100,
        200: BaseColors.gray_200,
        300: BaseColors.gray_300,
        400: BaseColors.gray_400,
        500: BaseColors.gray_500,
        600: BaseColors.gray_600,
        700: BaseColors.gray_700,
        800: BaseColors.gray_800,
        900: BaseColors.gray_900,
      },
      blue: {
        DEFAULT: BaseColors.blue,
      },
      primary: {
        light: lighten(BaseThemeColors.primary),
        DEFAULT: BaseThemeColors.primary,
        dark: darken(BaseThemeColors.primary),
      },
      secondary: {
        ring: Color(BaseThemeColors.secondary).setAlpha(0.25).toRgbString(),
        400: lighten(BaseThemeColors.secondary),
        DEFAULT: BaseThemeColors.secondary,
        600: darken(BaseThemeColors.secondary, 7.5),
        700: darken(BaseThemeColors.secondary, 10),
        800: darken(BaseThemeColors.secondary, 12.5),
      },
      dark: {
        DEFAULT: BaseThemeColors.dark,
      },
      warning: {
        DEFAULT: BaseThemeColors.warning,
      },
      heading: {
        DEFAULT: '#152c5b',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
};
