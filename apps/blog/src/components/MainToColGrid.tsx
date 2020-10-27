import * as React from 'react';
import styled from 'styled-components';
import { CategoryBox } from './CategoryBox';
import { EbookBox } from './EbookBox';
import { TwoColGrid } from './TwoColGrid';

interface MainToColGridProps {
  className?: string;
  children: React.ReactNode;
  white?: boolean;
}

const _MainToColGrid = (props: MainToColGridProps) => {
  const { className, children, white } = props;
  return (
    <TwoColGrid
      white={white}
      className={className}
      left={children}
      right={
        <>
          <EbookBox />
          <CategoryBox />
        </>
      }
    ></TwoColGrid>
  );
};

export const MainToColGrid = styled(_MainToColGrid)`
  display: block;
`;
