import * as React from 'react';
import Color from 'tinycolor2';
import styled, { css } from 'styled-components';
import { NewTheme } from 'src/NewTheme';

interface IconProps {
  className?: string;
  children?: React.ReactNode;
  size?: 'sm' | 'default';
  circle?: boolean;
  type: 'primary' | 'secondary' | 'danger' | 'warning' | 'success';
}

const _Icon = (props: IconProps) => {
  const { className, children } = props;
  return <div className={className}>{children}</div>;
};

function _iconVariant(color: string, lighten: number) {
  return css`
    color: ${color};
    background: ${Color(color).lighten(lighten).toHexString()};
  `;
}

export const Icon = styled(_Icon)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  vertical-align: middle;
  border-radius: 0.375rem;
  width: 3rem;
  height: 3rem;
  ${props => props.circle && `border-radius: 50%;`}
  ${props => {
    switch (props.size) {
      case 'sm':
        return css`
          font-size: 0.875rem;
          width: 2rem;
          height: 2rem;
        `;
      default:
        return null;
    }
  }}
  ${props => {
    switch (props.type) {
      case 'primary':
        return _iconVariant(NewTheme.primary, 40);
      case 'danger':
        return _iconVariant(NewTheme.danger, 25);
      case 'warning':
        return _iconVariant(NewTheme.warning, 25);
      case 'success':
        return _iconVariant(NewTheme.success, 34);
      default:
        return null;
    }
  }}
`;
