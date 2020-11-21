import * as React from 'react';
import styled from 'styled-components';
import { SvgCut } from './SvgCut';

interface SectionShapeProps {
  className?: string;
  inverse?: boolean;
  flip?: boolean;
  position: 'top' | 'bottom';
  color: string;
}

const _SectionShape = (props: SectionShapeProps) => {
  const { className } = props;
  return (
    <div className={className}>
      <SvgCut />
    </div>
  );
};

export const SectionShape = styled(_SectionShape)`
  position: absolute;
  ${props => `${props.position}: 0;`}
  left: 0;
  overflow: hidden;
  ${props => props.inverse && `transform: rotate(180deg);`}
  ${props => props.flip && `transform: scaleX(-1);`}
  width: 100%;
  z-index: 3;
  svg {
    fill: ${props => props.color};
    display: block;
  }
`;
