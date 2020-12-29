import * as React from 'react';
import Color from 'tinycolor2';
import styled, { css } from 'styled-components';
import { Theme } from 'src/Theme';
import classNames from 'classnames';

interface IconProps {
  className?: string;
  children?: React.ReactNode;
  size?: 'sm' | 'default';
  circle?: boolean;
  type: 'primary' | 'secondary' | 'danger' | 'warning' | 'success';
}

const _Icon = (props: IconProps) => {
  const { className, children, circle, size, type } = props;
  return (
    <div
      className={classNames(
        'inline-flex items-center justify-center rounded-md flex-shrink-0',
        circle && 'rounded-full',
        size === 'sm' ? `w-8 h-8 text-sm` : 'w-12 h-12',
        type === 'primary' && 'text-primary bg-primary-100',
        type === 'danger' && 'text-danger bg-danger-250',
        type === 'warning' && 'text-warning bg-warning-250',
        type === 'success' && 'text-success bg-success-350',
        type === 'secondary' && 'text-secondary bg-secondary-400'
      )}
    >
      {children}
    </div>
  );
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
  flex-shrink: 0;
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
        return _iconVariant(Theme.primary, 40);
      case 'danger':
        return _iconVariant(Theme.danger, 25);
      case 'warning':
        return _iconVariant(Theme.warning, 25);
      case 'success':
        return _iconVariant(Theme.success, 34);
      case 'secondary':
        return _iconVariant(Theme.secondary, 10);
      default:
        return null;
    }
  }}
`;
