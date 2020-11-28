import * as React from 'react';
import { isMenuHighlighted } from 'src/common/helper';
import { createUrl } from 'src/common/url';
import { Container } from 'src/components/Container';
import { Link } from 'src/components/Link';
import { Logo } from 'src/components/Logo';
import { IS_REAL_PROD } from 'src/config';
import { GlobalActions } from 'src/features/global/interface';
import { useUser } from 'src/hooks/useUser';
import { Theme } from 'src/Theme';
import styled from 'styled-components';
import { useActions } from 'typeless';
import { getRouterState } from 'typeless-router';
import { Button } from './Button';
import { DropdownPopup, MenuItem, MenuSeparator } from './DropdownPopup';
import { MenuDropdown } from './MenuDropdown';
import { VoidLink } from './VoidLink';

interface HeaderProps {
  className?: string;
}

const Inner = styled.div`
  display: flex;
  height: 70px;
`;

const Nav = styled.div`
  margin-right: auto;
  margin-left: auto;
  display: flex;
`;

const NavItem = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0 25px;
  height: 100%;
  border-bottom: 4px solid
    ${props => (props.active ? Theme.primary : 'transparent')};
  a {
    text-decoration: none;
    font-weight: ${props => (props.active ? 500 : null)};
    color: ${props => (props.active ? 'white' : Theme.gray_300)};
    &:hover {
      color: white;
    }
  }
`;

const Username = styled.div`
  font-weight: 500;
  margin-left: 10px;
  color: white;
`;

const Caret = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid ${Theme.gray_200};
  margin-left: 5px;
`;

const UserInfoWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const UserInfo = styled(VoidLink)`
  display: flex;
  align-items: center;
  &:hover {
    text-decoration: none;
    cursor: pointer;
    ${Caret} {
      border-top-color: white;
    }
  }
  border: 1px dotted transparent;

  &:focus {
    outline: none;
    border-color: ${Theme.gray_200};
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  ${Button} + ${Button} {
    margin-left: 1rem;
  }
`;

const _Header = (props: HeaderProps) => {
  const { className } = props;
  const { logout } = useActions(GlobalActions);
  const user = useUser();
  const pathname = getRouterState().location!.pathname;

  return (
    <div className={className}>
      <Container>
        <Inner>
          <Logo type="light" landing />
          {!IS_REAL_PROD && (
            <>
              <Nav>
                <NavItem active={isMenuHighlighted(pathname, 'courses')}>
                  <Link href={createUrl({ name: 'courses' })}>Kursy</Link>
                </NavItem>
              </Nav>
              {user ? (
                <UserInfoWrapper>
                  <MenuDropdown
                    testId="header-menu"
                    dropdown={
                      <DropdownPopup>
                        <MenuItem>
                          <Link
                            testId="settings-link"
                            href={createUrl({ name: 'settings' })}
                          >
                            Ustawienia
                          </Link>
                        </MenuItem>
                        <MenuSeparator />
                        <MenuItem red>
                          <VoidLink data-test="logout-btn" onClick={logout}>
                            Wyloguj się
                          </VoidLink>
                        </MenuItem>
                      </DropdownPopup>
                    }
                  >
                    <UserInfo>
                      <Username data-test="current-email">
                        {user.email}
                      </Username>
                      <Caret />
                    </UserInfo>
                  </MenuDropdown>
                </UserInfoWrapper>
              ) : (
                <Buttons>
                  <Button
                    testId="header-login-btn"
                    type="secondary"
                    href={createUrl({ name: 'login' })}
                    size="small"
                  >
                    Zaloguj się
                  </Button>
                  <Button
                    testId="header-register-btn"
                    type="primary"
                    href={createUrl({ name: 'register' })}
                    size="small"
                  >
                    Załóż konto
                  </Button>
                </Buttons>
              )}
            </>
          )}
        </Inner>
      </Container>
    </div>
  );
};

export const Header = styled(_Header)`
  display: block;
  padding: 0 1rem;
  background: ${Theme.dark};
`;
