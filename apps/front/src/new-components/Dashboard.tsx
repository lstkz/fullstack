import * as React from 'react';
import { NewTheme } from 'src/NewTheme';
import styled from 'styled-components';
import { Footer } from './Footer';
import { Header } from './Header';

interface DashboardProps {
  className?: string;
  children: React.ReactNode;
}

const Content = styled.div`
  flex: 1 0 0;
  background-color: ${NewTheme.gray_100};
`;

const _Dashboard = (props: DashboardProps) => {
  const { className, children } = props;

  return (
    <>
      <div className={className}>
        <Header />
        <Content>{children}</Content>
        <Footer />
      </div>
    </>
  );
};

export const Dashboard = styled(_Dashboard)`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;
