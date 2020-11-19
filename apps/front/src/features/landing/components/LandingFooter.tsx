import * as React from 'react';
import { Container } from 'src/components/Container';
import { NewTheme } from 'src/NewTheme';
import styled from 'styled-components';
import { SvgCut } from './SvgCut';

interface LandingFooterProps {
  className?: string;
}

const Top = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  transform: rotate(180deg);
  width: 100%;
  svg {
    fill: white;
    display: block;
  }
`;

const Divider = styled.hr`
  position: relative;
  width: 100%;
  border-width: 0px;
  margin: 1.5rem 0;
  &::before {
    content: '';
    display: block;
    width: 80%;
    position: relative;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    height: 1px;
    background: radial-gradient(
      at center center,
      rgba(255, 255, 255, 0.2) 0px,
      rgba(31, 45, 61, 0) 75%
    );
  }
`;

const Bottom = styled.div`
  padding-bottom: 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  a {
    color: rgba(255, 255, 255, 0.9);
  }
`;

const _LandingFooter = (props: LandingFooterProps) => {
  const { className } = props;
  return (
    <div className={className}>
      <Top>
        <SvgCut />
      </Top>
      <Container>
        <Divider />
        <Bottom>
          © 2020 <a>Fullstack</a>. Wszelkie prawa zastrzeżone.
        </Bottom>
      </Container>
    </div>
  );
};

export const LandingFooter = styled(_LandingFooter)`
  display: block;
  position: relative;
  background: ${NewTheme.dark};
  padding-top: 6rem;
  color: ${NewTheme.gray_600};
`;
