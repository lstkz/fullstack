import * as React from 'react';
import { createUrl } from 'src/common/url';
import { Link } from 'typeless-router';
import styled from 'styled-components';
import { Theme } from 'src/Theme';

interface LogoProps {
  className?: string;
  landing?: boolean;
  type: 'dark' | 'light';
}

const _Logo = (props: LogoProps) => {
  const { className, landing } = props;
  return (
    <div className={className}>
      <Link
        href={landing ? '/' : createUrl({ name: 'home' })}
        aria-label="logo"
      >
        {/* {type === 'dark' ? <LogoDark /> : <LogoLight />} */}
        <h1>Fullstack</h1>
      </Link>
    </div>
  );
};

export const Logo = styled(_Logo)`
  display: flex;
  align-items: center;
  a {
    display: flex;
    &:hover {
      text-decoration: none;
    }
  }
  h1 {
    color: ${props => (props.type === 'dark' ? Theme.textDark : 'white')};
    margin: 0;
    padding: 0;
    font-size: 30px;
  }
`;
