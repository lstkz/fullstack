import { MEDIA_LG, MEDIA_MD } from 'src/Theme';
import styled, { css } from 'styled-components';

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

interface SpacerParams {
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

export interface SpacerProps extends SpacerParams {
  mdSpacer?: SpacerParams;
  lgSpacer?: SpacerParams;
}

function _getPrefixStyles(
  prefix: string,
  options: {
    s: number | undefined;
    x: number | undefined;
    y: number | undefined;
    t: number | undefined;
    b: number | undefined;
    l: number | undefined;
    r: number | undefined;
  }
) {
  const copy = { ...options };
  const apply = (value: number, to: Array<'t' | 'b' | 'l' | 'r'>) => {
    to.forEach(name => {
      if (copy[name] == null) {
        copy[name] = value;
      }
    });
  };
  if (copy.y != null) {
    apply(copy.y, ['t', 'b']);
  }
  if (copy.x != null) {
    apply(copy.x, ['l', 'r']);
  }

  const parts: string[] = [];
  const add = (suffix: string, value: number | undefined) => {
    if (value != null) {
      parts.push(`${prefix}${suffix}: ${spacerMap[value]}rem !important;`);
    }
  };
  add('', copy.s);
  add('-top', copy.t);
  add('-bottom', copy.b);
  add('-left', copy.l);
  add('-right', copy.r);
  return parts.join('').trim();
}

function _getStyles(params?: SpacerParams, media?: string) {
  if (!params) {
    return '';
  }
  const ret = [
    _getPrefixStyles('margin', {
      s: params.m,
      x: params.mx,
      y: params.my,
      t: params.mt,
      b: params.mb,
      l: params.ml,
      r: params.mr,
    }),
    _getPrefixStyles('padding', {
      s: params.p,
      x: params.px,
      y: params.py,
      t: params.pt,
      b: params.pb,
      l: params.pl,
      r: params.pr,
    }),
  ]
    .filter(Boolean)
    .join('\n');
  if (!ret) {
    return ret;
  }
  if (media) {
    return `${media} {
      ${ret}
    }`;
  }
  return ret;
}

export const spacerStyle = css`
  ${(props: SpacerProps) => {
    return [
      _getStyles(props),
      _getStyles(props.mdSpacer, MEDIA_MD),
      _getStyles(props.lgSpacer, MEDIA_LG),
    ].join('\n');
  }}
`;

export const Spacer = styled.div`
  ${spacerStyle}
`;
