import * as React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Theme } from '../Theme';
import { Container } from './Container';
import { TABLET } from '../const';
import { MenuIcon } from './MenuIcon';
import { MainMenu, MenuItem } from './MainMenu';
import { MobileSidebar } from './MobileSidebar';

interface HeaderProps {
  className?: string;
}

const Title = styled.h1`
  margin: 0;
  font-size: 45px;
  line-height: 65px;
  a {
    color: ${Theme.primary};
    text-decoration: none;
  }
  margin-left: auto;
  margin-right: auto;
  ${TABLET} {
    margin: 0;
  }
`;

const MobileMenu = styled.a`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const _Header = (props: HeaderProps) => {
  const { className } = props;
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  return (
    <>
      {isSidebarOpen && (
        <MobileSidebar onClose={() => setIsSidebarOpen(false)} />
      )}
      <Container>
        <div className={className}>
          <MobileMenu onClick={() => setIsSidebarOpen(true)}>
            <MenuIcon />
          </MobileMenu>
          <Title>
            <Link to="/">Fullstack </Link>
          </Title>
          <MainMenu />
        </div>
      </Container>
    </>
  );
};

export const Header = styled(_Header)`
  display: flex;
  padding: 25px 0;
  align-items: center;

  ${MainMenu} {
    display: none;
  }
  ${TABLET} {
    ${MainMenu} {
      display: flex;
    }
    ${MobileMenu} {
      display: none;
    }
  }
`;
