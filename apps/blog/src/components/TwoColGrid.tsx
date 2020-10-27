import * as React from 'react';
import styled from 'styled-components';
import { DESKTOP, SIDEBAR_WIDTH, TABLET } from '../const';
import { Container } from './Container';

interface TwoColGridProps {
  className?: string;
  left: React.ReactNode;
  right: React.ReactNode;
  white?: boolean;
}

const Left = styled.div`
  flex-shrink: 0;
  flex: 1 0 0;
`;

const Right = styled.div`
  flex-grow: 0;
  width: 100%;

  ${TABLET} {
    flex-shrink: 0;
    width: ${SIDEBAR_WIDTH}px;
    padding-left: 50px;
  }
`;

const _TwoColGrid = (props: TwoColGridProps) => {
  const { className, left, right } = props;
  return (
    <Container className={className}>
      <Left>{left}</Left>
      <Right>{right}</Right>
    </Container>
  );
};

export const TwoColGrid = styled(_TwoColGrid)`
  flex-direction: column;
  && {
    display: flex;
  }
  padding-top: 120px;
  background: ${props => (props.white ? 'white' : '#fdfdfd')};

  ${TABLET} {
    flex-direction: row;
  }
`;
