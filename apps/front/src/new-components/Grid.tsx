import React from 'react';
import styled, { css } from 'styled-components';
import { MOBILE } from 'src/Theme';
import { SpacerProps, spacerStyle } from './_spacer';
import { MEDIA_LG, MEDIA_MD } from 'src/NewTheme';

interface RowProps extends SpacerProps {
  children?: React.ReactNode;
  className?: string;
  gutter?: number;
}

interface ColProps extends SpacerProps {
  children?: React.ReactNode;
  className?: string;
  sm?: number;
  md?: number;
  lg?: number;
}

function _getWidth(size: number) {
  return css`
    max-width: ${(size / 12) * 100}%;
    flex: 0 0 ${(size / 12) * 100}%;
  `;
}

export const Col = styled.div<ColProps>`
  position: relative;
  width: 100%;

  ${props => props.sm && _getWidth(props.sm)}
  ${props =>
    props.md &&
    css`
      ${MEDIA_MD} {
        ${_getWidth(props.md)}
      }
    `};
  ${props =>
    props.lg &&
    css`
      ${MEDIA_LG} {
        ${_getWidth(props.lg)}
      }
    `};

  ${spacerStyle}
`;

const DEFAULT_GUTTER = 30;

export const Row = styled.div<RowProps>`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  ${MOBILE} {
    margin-left: 0;
    margin-right: 0;
    ${Col} + ${Col} {
      margin-top: ${DEFAULT_GUTTER / 2}px;
    }
  }
  ${MEDIA_MD} {
    margin-right: -${props => (props.gutter || DEFAULT_GUTTER) / 2}px;
    margin-left: -${props => (props.gutter || DEFAULT_GUTTER) / 2}px;

    ${Col} {
      padding-right: ${props => (props.gutter || DEFAULT_GUTTER) / 2}px;
      padding-left: ${props => (props.gutter || DEFAULT_GUTTER) / 2}px;
    }
  }
`;
