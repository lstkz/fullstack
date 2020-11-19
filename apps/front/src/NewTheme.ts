import Color from 'tinycolor2';

function darken(color: string) {
  return Color(color).darken(10).toHexString();
}
function lighten(color: string) {
  return Color(color).lighten(10).toHexString();
}

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

const BodyColors = {
  body_bg: BaseColors.white,
  body_color: BaseColors.gray_600,
};

export const NewTheme = {
  ...BaseColors,
  ...BaseThemeColors,
  ...BodyColors,
  headings_color: '#152c5b',
  text_muted_color: BaseColors.gray_600,

  primary_dark: darken(BaseThemeColors.primary),
  primary_light: lighten(BaseThemeColors.primary),
  secondary_dark: darken(BaseThemeColors.secondary),
  secondary_light: lighten(BaseThemeColors.secondary),
  neutral_dark: darken(BaseThemeColors.neutral),
  neutral_light: lighten(BaseThemeColors.neutral),
  success_dark: darken(BaseThemeColors.success),
  success_light: lighten(BaseThemeColors.success),
  info_dark: darken(BaseThemeColors.info),
  info_light: lighten(BaseThemeColors.info),
  warning_dark: darken(BaseThemeColors.warning),
  warning_light: lighten(BaseThemeColors.warning),
  danger_dark: darken(BaseThemeColors.danger),
  danger_light: lighten(BaseThemeColors.danger),
  light_dark: darken(BaseThemeColors.light),
  light_light: lighten(BaseThemeColors.light),
  dark_dark: darken(BaseThemeColors.dark),
  dark_light: lighten(BaseThemeColors.dark),

  section_primary: BodyColors.body_bg,
  section_secondary: BaseColors.gray_100,
  section_light: BaseColors.gray_400,
  section_dark: Color(BaseThemeColors.dark).darken(7).toHexString(),
};

export const MEDIA_MD = '@media (min-width: 768px)';
export const MEDIA_LG = '@media (min-width: 1200px)';
