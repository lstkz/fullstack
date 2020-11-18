import * as React from 'react';
import { Container } from 'src/components/Container';
import { Logo } from 'src/components/Logo';
import { NewTheme } from 'src/NewTheme';
import styled from 'styled-components';

interface LandingHeaderProps {
  className?: string;
}

const _LandingHeader = (props: LandingHeaderProps) => {
  const { className } = props;
  return (
    <div className={className}>
      <Container>
        <Logo type="light" />
      </Container>
    </div>
  );
};

export const LandingHeader = styled(_LandingHeader)`
  display: block;
  padding: 0.75rem 1rem;
  background: ${NewTheme.section_dark};
`;
