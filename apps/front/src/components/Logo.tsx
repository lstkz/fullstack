import * as React from 'react';
import { createUrl } from 'src/common/url';
import { Link } from 'typeless-router';
import styled from 'styled-components';

interface LogoProps {
  className?: string;
  type: 'dark' | 'light';
}

const _Logo = (props: LogoProps) => {
  const { className } = props;
  return (
    <div className={className}>
      <Link href={createUrl({ name: 'home' })} aria-label="logo">
        {/* {type === 'dark' ? <LogoDark /> : <LogoLight />} */}
        <h1>Fullstack</h1>
      </Link>
    </div>
  );
};

export const Logo = styled(_Logo)`
  a {
    display: flex;
  }
  h1 {
    color: white;
    margin: 0;
    padding: 0;
    font-size: 30px;
  }
`;
