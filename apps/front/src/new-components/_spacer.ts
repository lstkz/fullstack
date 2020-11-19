import { css } from 'styled-components';

const spacerBase = 1;
const spacerMap = {
  0: 0,
  1: spacerBase * 0.25,
  2: spacerBase * 0.5,
  3: spacerBase,
  4: spacerBase * 1.5,
  5: spacerBase * 3,
  6: spacerBase * 4.5,
  7: spacerBase * 6,
  8: spacerBase * 7.5,
  9: spacerBase * 9,
  10: spacerBase * 10.5,
  17: spacerBase * 21,
  '-1': -spacerBase * 0.25,
  '-2': -spacerBase * 0.5,
  '-3': -spacerBase,
  '-4': -spacerBase * 1.5,
  '-5': -spacerBase * 3,
  '-6': -spacerBase * 4.5,
  '-7': -spacerBase * 6,
  '-8': -spacerBase * 7.5,
  '-9': -spacerBase * 9,
  '-10': -spacerBase * 10.5,
  '-17': -spacerBase * 21,
};

type Size =
  | 0
  | 1
  | 3
  | 6
  | 9
  | 2
  | 4
  | 5
  | 7
  | 8
  | 10
  | 17
  | -1
  | -3
  | -6
  | -9
  | -2
  | -4
  | -5
  | -7
  | -8
  | -10
  | -17;

export interface SpacerProps {
  m?: Size;
  mb?: Size;
  mt?: Size;
  ml?: Size;
  mr?: Size;
  mx?: Size;
  my?: Size;
  p?: Size;
  pb?: Size;
  pt?: Size;
  pl?: Size;
  pr?: Size;
  px?: Size;
  py?: Size;
}

export const spacerStyle = css`
  ${(props: SpacerProps) => {
    let margin: string | undefined = undefined;
    let marginLeft: string | undefined = undefined;
    let marginRight: string | undefined = undefined;
    let marginTop: string | undefined = undefined;
    let marginBottom: string | undefined = undefined;
    if (props.m) {
      margin = `${spacerMap[props.m]}rem;`;
    }
    if (props.my) {
      marginTop = `${spacerMap[props.my]}rem;`;
      marginBottom = `${spacerMap[props.my]}rem;`;
    }
    if (props.mx) {
      marginLeft = `${spacerMap[props.mx]}rem;`;
      marginRight = `${spacerMap[props.mx]}rem;`;
    }
    if (props.mx) {
      marginLeft = `${spacerMap[props.mx]}rem;`;
      marginRight = `${spacerMap[props.mx]}rem;`;
    }
    if (props.mt) {
      marginTop = `${spacerMap[props.mt]}rem;`;
    }
    if (props.mb) {
      marginBottom = `${spacerMap[props.mb]}rem;`;
    }
    if (props.ml) {
      marginLeft = `${spacerMap[props.ml]}rem;`;
    }
    if (props.mr) {
      marginRight = `${spacerMap[props.mr]}rem;`;
    }
    return `
      margin: ${margin};
      margin-left: ${marginLeft};
      margin-right: ${marginRight};
      margin-top: ${marginTop};
      margin-bottom: ${marginBottom};
    `;
  }}
  ${(props: SpacerProps) => {
    let padding: string | undefined = undefined;
    let paddingLeft: string | undefined = undefined;
    let paddingRight: string | undefined = undefined;
    let paddingTop: string | undefined = undefined;
    let paddingBottom: string | undefined = undefined;
    if (props.p) {
      padding = `${spacerMap[props.p]}rem;`;
    }
    if (props.py) {
      paddingTop = `${spacerMap[props.py]}rem;`;
      paddingBottom = `${spacerMap[props.py]}rem;`;
    }
    if (props.px) {
      paddingLeft = `${spacerMap[props.px]}rem;`;
      paddingRight = `${spacerMap[props.px]}rem;`;
    }
    if (props.px) {
      paddingLeft = `${spacerMap[props.px]}rem;`;
      paddingRight = `${spacerMap[props.px]}rem;`;
    }
    if (props.pt) {
      paddingTop = `${spacerMap[props.pt]}rem;`;
    }
    if (props.pb) {
      paddingBottom = `${spacerMap[props.pb]}rem;`;
    }
    if (props.pl) {
      paddingLeft = `${spacerMap[props.pl]}rem;`;
    }
    if (props.pr) {
      paddingRight = `${spacerMap[props.pr]}rem;`;
    }
    return `
      padding: ${padding};
      padding-left: ${paddingLeft};
      padding-right: ${paddingRight};
      padding-top: ${paddingTop};
      padding-bottom: ${paddingBottom};
    `;
  }}
`;
