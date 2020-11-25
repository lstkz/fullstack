import React from 'react';
import styled, { css } from 'styled-components';
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
  flexOrder?: number;
  mdFlexOrder?: number;
  lgFlexOrder?: number;
}

function _getWidth(size: number) {
  return css`
    max-width: ${(size / 12) * 100}%;
    flex: 0 0 ${(size / 12) * 100}%;
  `;
}

const DEFAULT_GUTTER = 30;

export const Col = styled.div<ColProps>`
  position: relative;
  width: 100%;
  ${props =>
    props.sm !== 12 &&
    props.sm &&
    css`
      margin-top: 0 !important;
    `}

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

  order: ${props => props.flexOrder};

  ${props =>
    props.mdFlexOrder &&
    css`
      ${MEDIA_MD} {
        order: ${props.mdFlexOrder};
      }
    `};

  ${props =>
    props.lgFlexOrder &&
    css`
      ${MEDIA_LG} {
        order: ${props.lgFlexOrder};
      }
    `};

  ${spacerStyle}
`;

export const Row = styled.div<RowProps>`
  display: flex;
  flex-wrap: wrap;
  /* width: 100%; */
  margin-left: 0;
  margin-right: 0;
  ${Col} + ${Col} {
    margin-top: ${DEFAULT_GUTTER / 2}px;
  }

  ${MEDIA_MD} {
    margin-right: -${props => (props.gutter || DEFAULT_GUTTER) / 2}px;
    margin-left: -${props => (props.gutter || DEFAULT_GUTTER) / 2}px;

    ${Col} + ${Col} {
      margin-top: 0;
    }
    ${Col} {
      padding-right: ${props => (props.gutter || DEFAULT_GUTTER) / 2}px;
      padding-left: ${props => (props.gutter || DEFAULT_GUTTER) / 2}px;
    }
  }
  ${spacerStyle}
`;
