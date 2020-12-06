import * as React from 'react';
import styled, { css, keyframes } from 'styled-components';

interface SpinnerBoarderProps {
  className?: string;
  size?: 'sm';
}

const _SpinnerBoarder = (props: SpinnerBoarderProps) => {
  const { className } = props;
  return <div className={className} />;
};

const rotateAnim = keyframes`
  to {
    transform: rotate(360deg); 
  }  
`;

export const SpinnerBoarder = styled(_SpinnerBoarder)`
  display: inline-block;
  width: 2rem;
  height: 2rem;
  vertical-align: text-bottom;
  border: 0.25em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: ${rotateAnim} 0.75s linear infinite;
  ${props => {
    switch (props.size) {
      case 'sm':
        return css`
          width: 1rem;
          height: 1rem;
          border-width: 0.2em;
        `;
      default:
        return null;
    }
  }}
`;
