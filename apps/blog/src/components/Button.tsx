import { Link } from 'gatsby';
import * as color from 'color2k';
import * as React from 'react';
import styled, { css } from 'styled-components';
import { Theme } from '../Theme';

interface ButtonProps {
  className?: string;
  href?: string;
  hrefExternal?: boolean;
  children?: React.ReactNode;
  block?: boolean;
  size?: 'lg' | 'default';
  type?: 'solid' | 'gray' | 'default';
}

const _Button = (props: ButtonProps) => {
  const { className, href, hrefExternal, children } = props;
  if (href) {
    if (hrefExternal) {
      return (
        <a href={href} className={className}>
          {children}
        </a>
      );
    }
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }
  return <button className={className}>{children}</button>;
};

export const Button = styled(_Button)`
  display: inline-flex;
  align-items: center;
  border-radius: 5px;
  color: white;
  padding: 10px 15px;
  background: rgba(247, 100, 108, 0.07);
  border: 1px solid ${Theme.primary};
  color: ${Theme.primary};
  text-decoration: none;
  font-size: 13px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }

  ${props =>
    props.block &&
    css`
      width: 100%;
      text-align: center;
    `}

  ${props =>
    props.size === 'lg' &&
    css`
      font-size: 18px;
      padding: 14px 25px;
    `}

  svg {
    margin-left: 8px;
    path {
      fill: ${Theme.primary};
    }
  }

  &:focus,
  &:hover {
    color: white;
    background: ${Theme.primary};
    outline: none;
    svg {
      path {
        fill: white;
      }
    }
  }

  &:focus {
    box-shadow: ${Theme.primary50} 0px 0px 0px 3px;
  }

  ${props =>
    props.type === 'solid' &&
    css`
      background: ${Theme.primary};
      svg {
        path {
          fill: white;
        }
      }
      color: white;
      &:focus,
      &:hover {
        background: ${color.darken(Theme.primary, 0.05)};
      }
    `}
`;
