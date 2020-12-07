import * as React from 'react';
import { Theme } from 'src/Theme';
import styled from 'styled-components';
import { Footer } from './Footer';
import { Header } from './Header';

interface DashboardProps {
  className?: string;
  children: React.ReactNode;
  noHeader?: boolean;
}

const Content = styled.div`
  flex: 1 0 0;
  background-color: ${Theme.gray_100};
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
