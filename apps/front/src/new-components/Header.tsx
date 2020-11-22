import * as React from 'react';
import { Container } from 'src/components/Container';
import { Logo } from 'src/components/Logo';
import { NewTheme } from 'src/NewTheme';
import styled from 'styled-components';

interface HeaderProps {
  className?: string;
}

const _Header = (props: HeaderProps) => {
  const { className } = props;
  return (
    <div className={className}>
      <Container>
        <Logo type="light" landing />
      </Container>
    </div>
  );
};

export const Header = styled(_Header)`
  display: block;
  padding: 0.75rem 1rem;
  background: ${NewTheme.dark};
`;
