import * as React from 'react';
import { Container } from 'src/new-components/Container';
import { NewTheme } from 'src/NewTheme';
import styled from 'styled-components';
import { FooterCopyright } from './FooterCopyright';

interface FooterProps {
  className?: string;
}

const _Footer = (props: FooterProps) => {
  const { className } = props;
  return (
    <div className={className}>
      <Container>
        <FooterCopyright />
      </Container>
    </div>
  );
};

export const Footer = styled(_Footer)`
  display: block;
  position: relative;
  background: ${NewTheme.dark};
  color: ${NewTheme.gray_600};
`;
