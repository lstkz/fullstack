import React from 'react';
import { Header } from './Header';
import { Banner } from './Banner';
import styled from 'styled-components';
import { GlobalStyles } from './GlobalStyles';
import { Footer } from './Footer';

const Main = styled.main``;

interface LayoutProps {
  children: React.ReactNode;
  location: any;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <Banner />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
};

export default Layout;
