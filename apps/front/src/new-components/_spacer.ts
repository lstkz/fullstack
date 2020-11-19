import { css } from 'styled-components';

const spacerBase = 1;
const spacerMap: Record<number, number> = {
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

function _getStyles(
  prefix: string,
  total: number | undefined,
  top: number | undefined,
  bottom: number | undefined,
  left: number | undefined,
  right: number | undefined
) {
  const parts: string[] = [];
  if (total != null) {
    parts.push(`${prefix}: ${spacerMap[total]}rem !important;`);
  }
  if (top != null) {
    parts.push(`${prefix}-top: ${spacerMap[top]}rem !important;`);
  }
  if (bottom != null) {
    parts.push(`${prefix}-bottom: ${spacerMap[bottom]}rem !important;`);
  }
  if (left != null) {
    parts.push(`${prefix}-left: ${spacerMap[left]}rem !important;`);
  }
  if (right != null) {
    parts.push(`${prefix}: ${spacerMap[right]}rem !important;`);
  }
  return parts.join('');
}

export const spacerStyle = css`
  ${(props: SpacerProps) => {
    let margin: number | undefined = undefined;
    let marginLeft: number | undefined = undefined;
    let marginRight: number | undefined = undefined;
    let marginTop: number | undefined = undefined;
    let marginBottom: number | undefined = undefined;
    if (props.m) {
      margin = props.m;
    }
    if (props.my) {
      marginTop = props.my;
      marginBottom = props.my;
    }
    if (props.mx) {
      marginLeft = props.mx;
      marginRight = props.mx;
    }
    if (props.mx) {
      marginLeft = props.mx;
      marginRight = props.mx;
    }
    if (props.mt) {
      marginTop = props.mt;
    }
    if (props.mb) {
      marginBottom = props.mb;
    }
    if (props.ml) {
      marginLeft = props.ml;
    }
    if (props.mr) {
      marginRight = props.mr;
    }
    return _getStyles(
      'margin',
      margin,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight
    );
  }}
  ${(props: SpacerProps) => {
    let padding: number | undefined = undefined;
    let paddingLeft: number | undefined = undefined;
    let paddingRight: number | undefined = undefined;
    let paddingTop: number | undefined = undefined;
    let paddingBottom: number | undefined = undefined;
    if (props.p) {
      padding = props.p;
    }
    if (props.py) {
      paddingTop = props.py;
      paddingBottom = props.py;
    }
    if (props.px) {
      paddingLeft = props.px;
      paddingRight = props.px;
    }
    if (props.px) {
      paddingLeft = props.px;
      paddingRight = props.px;
    }
    if (props.pt) {
      paddingTop = props.pt;
    }
    if (props.pb) {
      paddingBottom = props.pb;
    }
    if (props.pl) {
      paddingLeft = props.pl;
    }
    if (props.pr) {
      paddingRight = props.pr;
    }
    return _getStyles(
      'padding',
      padding,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight
    );
  }}
`;
