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
  purge: {
    content: ['./src/**/*.ts', './src/**/*.tsx'],
    options: {
      safelist: [
        /^text-/,
        /^bg-/,
        // tasks
        'pl-8',
      ],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Nunito Sans', 'sans-serif'],
      serif: ['serif'],
    },
    container: {
      center: true,
      padding: '1.5rem',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: 'white',
      black: 'black',
      alpha: {
        black30: 'rgba(0, 0, 0, 0.3)',
        black80: 'rgba(0, 0, 0, 0.8)',
        black20: 'rgba(255, 255, 255, 0.2)',
        white90: 'rgba(255, 255, 255, 0.9)',
        white10: 'rgba(255, 255, 255, 0.1)',
        white20: 'rgba(255, 255, 255, 0.2)',
        white60: 'rgba(255, 255, 255, 0.6)',
        white07: 'rgba(255, 255, 255, 0.075)',
      },
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
        100: lighten(BaseThemeColors.primary, 40),
        light: lighten(BaseThemeColors.primary),
        DEFAULT: BaseThemeColors.primary,
        dark: darken(BaseThemeColors.primary),
        600: darken(BaseThemeColors.primary, 7.5),
        700: darken(BaseThemeColors.primary, 10),
        800: darken(BaseThemeColors.primary, 12.5),
      },
      secondary: {
        ring: Color(BaseThemeColors.secondary).setAlpha(0.35).toRgbString(),
        400: lighten(BaseThemeColors.secondary),
        DEFAULT: BaseThemeColors.secondary,
        600: darken(BaseThemeColors.secondary, 7.5),
        700: darken(BaseThemeColors.secondary, 10),
        800: darken(BaseThemeColors.secondary, 12.5),
      },
      dark: {
        400: lighten(BaseThemeColors.dark),
        DEFAULT: BaseThemeColors.dark,
        600: darken(BaseThemeColors.dark, 7.5),
        700: darken(BaseThemeColors.dark, 10),
        800: darken(BaseThemeColors.dark, 12.5),
      },
      warning: {
        250: lighten(BaseThemeColors.warning, 25),
        DEFAULT: BaseThemeColors.warning,
        600: darken(BaseThemeColors.warning, 7.5),
        700: darken(BaseThemeColors.warning, 10),
        800: darken(BaseThemeColors.warning, 12.5),
      },
      danger: {
        250: lighten(BaseThemeColors.danger, 25),
        DEFAULT: BaseThemeColors.danger,
      },
      heading: {
        DEFAULT: '#152c5b',
      },
      success: {
        250: lighten(BaseThemeColors.green, 25),
        350: lighten(BaseColors.green, 35),
        DEFAULT: BaseColors.green,
        600: darken(BaseColors.green, 7.5),
        700: darken(BaseColors.green, 10),
        800: darken(BaseColors.green, 12.5),
      },
      green: {
        250: lighten(BaseThemeColors.green, 25),
        DEFAULT: BaseColors.green,
        600: darken(BaseColors.green, 7.5),
        700: darken(BaseColors.green, 10),
        800: darken(BaseColors.green, 12.5),
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      borderColor: ['active'],
      borderWidth: ['first'],
    },
  },
  plugins: [],
};
