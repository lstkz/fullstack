import { createGlobalStyle } from 'styled-components';
import { Theme } from '../Theme';

export const GlobalStyles = createGlobalStyle`
  *,
  :after,
  :before {
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    color: ${Theme.textLight};
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${Theme.textDark};
  }

  h2 {
    font-size: 26px;
  }

  a {
    color: ${Theme.primary};
  }
`;
