import * as React from 'react';
import { Container } from 'src/components/Container';
import { Theme } from 'src/Theme';
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
  background: ${Theme.dark};
  color: ${Theme.gray_600};
`;
