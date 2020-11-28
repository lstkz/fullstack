import * as React from 'react';
import { Container } from 'src/new-components/Container';
import { FooterCopyright } from 'src/new-components/FooterCopyright';
import { Heading } from 'src/new-components/Heading';
import { spacerStyle } from 'src/new-components/_spacer';
import { NewTheme } from 'src/NewTheme';
import styled from 'styled-components';
import { SectionShape } from './SectionShape';

interface LandingFooterProps {
  className?: string;
}

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
        <FooterCopyright />
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
