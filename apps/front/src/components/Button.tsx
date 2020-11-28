import React from 'react';
import Color from 'tinycolor2';
import styled, { css } from 'styled-components';
import { Theme } from 'src/Theme';
import { SpinnerBoarder } from './SpinnerBoarder';
import { spacerStyle } from './_spacer';
import { Link } from 'src/components/Link';

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  block?: boolean;
  soft?: boolean;
  outline?: boolean;
  loading?: boolean;
  type: 'primary' | 'secondary' | 'danger' | 'dark' | 'neutral';
  size?: 'extra-small' | 'small' | 'default' | 'large' | 'extra-large';
  href?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
  onClick?: (
    e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement, MouseEvent>
  ) => void;
  testId?: string;
}

const Text = styled.span`
  &:not(:first-child) {
    margin-left: 0.75em;
  }
`;

const _Button = (props: ButtonProps, ref: any) => {
  const {
    className,
    onClick,
    children,
    htmlType,
    loading,
    disabled,
    testId,
    icon,
    href,
  } = props;
  const inner = (
    <>
      {icon}
      {loading && <SpinnerBoarder size="sm" />}
      <Text>{children}</Text>
    </>
  );
  if (href) {
    return (
      <Link
        testId={testId}
        onClick={onClick as any}
        className={className}
        href={href}
        innerRef={ref}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      data-test={testId}
      disabled={loading || disabled}
      onClick={onClick as any}
      className={className}
      type={htmlType || 'button'}
      ref={ref}
    >
      {inner}
    </button>
  );
};

function _darken(color: string, percent: number) {
  return Color(color).darken(percent).toHexString();
}

function _yiq(color: string) {
  return Color(color).isDark() ? 'white' : Theme.gray_900;
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
  ${props => props.block && 'width: 100%;'}
  ${(props: ButtonProps) => {
    if (!props.type) {
      return null;
    }
    switch (props.type) {
      case 'primary':
        return _buttonVariant(Theme.primary, Theme.primary);
      case 'secondary':
        return _buttonVariant(Theme.secondary, Theme.secondary);
      case 'neutral':
        return css`
          border-width: 2px;
          ${_buttonVariant(
            Theme.neutral,
            Theme.gray_300,
            'white',
            Theme.primary,
            'white',
            Theme.primary
          )};
          &:hover {
            border-color: ${Theme.primary_light};
          }
          &:focus {
            border-color: ${Theme.primary_light};
            box-shadow: 0 0 0 0.2rem
              ${Color(Theme.primary).setAlpha(0.25).toRgbString()};
          }
        `;
      default: {
        return _buttonVariant(Theme[props.type], Theme[props.type]);
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
      case 'small': {
        return css`
          padding: 0.5rem 1.25rem;
          font-size: 0.875rem;
          border-radius: 0.375rem;
        `;
      }
      case 'extra-small': {
        return css`
          padding: 0.25rem 0.75rem;
          font-size: 0.875rem;
          border-radius: 0.375rem;
        `;
      }
      default:
        return null;
    }
  }} 

  ${props =>
    (props.disabled || props.loading) &&
    css`
      opacity: 0.65;
      box-shadow: none;
      cursor: default;
    `}
`;

export const Button = styled(React.forwardRef(_Button))`
  outline: none;
  cursor: pointer;
  ${buttonCss}
  ${spacerStyle}
`;
