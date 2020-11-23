import * as React from 'react';
import { NewTheme } from 'src/NewTheme';
import styled, { css } from 'styled-components';

interface BadgeProps {
  className?: string;
  type:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'success'
    | 'warning'
    | 'info'
    | 'dark';
  children?: React.ReactNode;
  dot?: boolean;
}

const _Badge = (props: BadgeProps) => {
  const { className, children } = props;
  return <div className={className}>{children}</div>;
};

export const Badge = styled(_Badge)`
  display: inline-block;
  text-transform: none;
  padding: 0.35rem 0.5rem;
  font-size: 80%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.375rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  flex-shrink: 0;

  ${props =>
    props.dot &&
    css`
      display: inline-block;
      vertical-align: middle;
      padding: 0;
      background: transparent;
      width: 0.625rem;
      height: 0.625rem;
      border-radius: 50%;
      font-size: 0.875rem;
      margin-right: 0.375rem;
    `}

  ${props => {
    switch (props.type) {
      case 'secondary':
        return css`
          background: ${NewTheme.secondary};
        `;
      default: {
        return css`
          background: ${NewTheme[props.type]};
          color: white;
        `;
      }
    }
  }}
`;
