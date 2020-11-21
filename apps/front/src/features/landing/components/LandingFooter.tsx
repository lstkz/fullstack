import * as React from 'react';
import { Container } from 'src/components/Container';
import { Heading } from 'src/new-components/Heading';
import { spacerStyle } from 'src/new-components/_spacer';
import { NewTheme } from 'src/NewTheme';
import styled from 'styled-components';
import { SectionShape } from './SectionShape';

interface LandingFooterProps {
  className?: string;
}

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
const Text = styled.div`
  opacity: 0.8;
  color: white;
  a {
    color: white;
    font-weight: 600;
    opacity: 1;
  }
  ${spacerStyle}
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
      <SectionShape position="top" color={NewTheme.section_secondary} inverse />
      <Container>
        <Heading white type={3}>
          Masz Pytania?
        </Heading>
        <Text>
          Napisz do mnie na{' '}
          <a href="mailto:lukasz@sentkiewicz">lukasz@sentkiewicz.pl</a>
        </Text>
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
