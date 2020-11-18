import React from 'react';
import Color from 'tinycolor2';
import styled, { css } from 'styled-components';
import { NewTheme } from 'src/NewTheme';

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  block?: boolean;
  soft?: boolean;
  outline?: boolean;
  loading?: boolean;
  type: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'default' | 'large' | 'extra-large';
  href?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
  onClick?: (
    e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement, MouseEvent>
  ) => void;
  testId?: string;
}

const _Button = (props: ButtonProps, ref: any) => {
  const {
    className,
    onClick,
    children,
    htmlType,
    loading,
    disabled,
    testId,
  } = props;

  return (
    <button
      data-test={testId}
      disabled={loading || disabled}
      onClick={onClick as any}
      className={className}
      type={htmlType || 'button'}
      ref={ref}
    >
      {children}
    </button>
  );
};

function _darken(color: string, percent: number) {
  return Color(color).darken(percent).toHexString();
}

function _yiq(color: string) {
  return Color(color).isDark() ? 'white' : NewTheme.gray_900;
}

function _buttonVariant(
  bg: string,
  border: string,
  hoverBg: string = _darken(bg, 7.5),
  hoverBorder: string = _darken(bg, 10),
  activeBg: string = _darken(bg, 10),
  activeBorder: string = _darken(bg, 12.5)
) {
  return css`
    color: ${_yiq(bg)};
    border-color: ${border};
    background: ${bg};
    &:hover {
      color: ${_yiq(hoverBg)};
      border-color: ${hoverBorder};
      background: ${hoverBg};
    }
    &:focus {
      box-shadow: 0 0 0 0.2rem ${Color(bg).setAlpha(0.25).toRgbString()};
    }
    &.disabled,
    &:disabled {
      color: ${_yiq(bg)};
      background-color: ${bg};
      border-color: ${border};
      box-shadow: none;
    }
    &:not(:disabled):not(.disabled):active,
    &:not(:disabled):not(.disabled).active {
      color: ${_yiq(activeBg)};
      border-color: ${activeBorder};
      background: ${activeBg};
    }
  `;
}

const buttonCss = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  padding: 0.75rem 1.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.375rem;
  margin: 0;
  font-family: inherit;
  ${(props: ButtonProps) => {
    switch (props.type) {
      case 'primary':
        return _buttonVariant(NewTheme.primary, NewTheme.primary);
      default: {
        return null;
      }
    }
  }}

  ${props => {
    switch (props.size) {
      case 'large': {
        return css`
          padding: 1rem 1.875rem;
          font-size: 1rem;
          border-radius: 0.5rem;
        `;
      }
      default:
        return null;
    }
  }}
`;

export const Button = styled(React.forwardRef(_Button))`
  outline: none;
  cursor: pointer;
  ${buttonCss}
`;
