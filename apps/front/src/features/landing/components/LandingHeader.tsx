import * as React from 'react';
import { Button } from 'src/components/Button';
import { Container } from 'src/components/Container';
import { Logo } from 'src/components/Logo';
import { NewTheme } from 'src/NewTheme';
import styled from 'styled-components';

interface LandingHeaderProps {
  className?: string;
}

const Inner = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const _LandingHeader = (props: LandingHeaderProps) => {
  const { className } = props;
  return (
    <div className={className}>
      <Inner>
        <Logo type="light" landing />
        <Button
          type="primary"
          onClick={() => {
            document.getElementById('subscribe-section')?.scrollIntoView({
              behavior: 'smooth',
            });
          }}
        >
          Zapisz się
        </Button>
      </Inner>
    </div>
  );
};

export const LandingHeader = styled(_LandingHeader)`
  display: block;
  padding: 0.75rem 1rem;
  background: ${NewTheme.section_dark};
`;
