import { Theme } from 'src/Theme';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
*,
*::before,
*::after
{
    box-sizing: border-box;
}

html
{
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(31, 45, 61, 0);
    height: 100% !important;
}

body {
  font-family: "Nunito Sans", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.7;
  background: white;
  margin: 0;
  text-align: left;
  color: ${Theme.body_color};
  height: 100%;
  display: flex;
  flex-direction: column;
}

input, textarea {
    font-family: inherit;
    font-size: 1rem;
    font-weight: 400;
}


a {
  color: ${Theme.primary};
  text-decoration: none;
  &:hover {
      text-decoration: none;
  }
}
figure {
  max-width: 100%;
  min-height: 1px;
}
figcaption, figure, main {
    display: block;
    margin: 0;
}
#root {
  height: 100% ;
  display: flex;
  flex-direction: column;
  z-index: 1;
}
#portals {
  z-index: 2;
}
`;
