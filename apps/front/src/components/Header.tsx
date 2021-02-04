import Link from 'next/link';
import * as React from 'react';
import { createUrl } from 'src/common/url';
import { Logo } from 'src/components/Logo';
import { useAuthActions, useUser } from 'src/features/AuthModule';
import { Button } from './Button';
import { DropdownPopup, MenuItem, MenuSeparator } from './DropdownPopup';
import { MenuDropdown } from './MenuDropdown';
import { VoidLink } from './VoidLink';

export function Header() {
  const authActions = useAuthActions();
  const user = useUser();

  return (
    <div className="block px-4 bg-dark">
      <div className="container">
        <div className="flex h-16">
          <Logo type="light" landing />
          <>
            <div className="flex mx-auto">
              <div className="flex items-center px-1 h-full">
                <Link href={createUrl({ name: 'modules' })}>
                  <a className="text-gray-300 hover:text-white">Moduły</a>
                </Link>
              </div>
            </div>
            {user ? (
              <div className="h-full flex items-center">
                <MenuDropdown
                  testId="header-menu"
                  dropdown={
                    <DropdownPopup>
                      <MenuItem
                        data-test="settings-link"
                        href={createUrl({ name: 'settings' })}
                      >
                        Ustawienia
                      </MenuItem>
                      <MenuSeparator />
                      <MenuItem
                        colorClassName="text-danger"
                        data-test="logout-btn"
                        onClick={authActions.logout}
                      >
                        Wyloguj się
                      </MenuItem>
                    </DropdownPopup>
                  }
                >
                  <VoidLink className="flex items-center cursor-pointer  border border-transparent border-dotted focus:border-gray-200 outline-none text-white ">
                    <div data-test="current-email" className="font-medium ml-2">
                      {user.email}
                    </div>
                    <div className="caret ml-2" />
                  </VoidLink>
                </MenuDropdown>
                {!user.hasSubscription && (
                  <Link href={createUrl({ name: 'subscription' })}>
                    <Button type="primary" size="small" className="ml-4">
                      Kup PRO
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid gap-4 grid-flow-col-dense auto-cols-max h-auto my-auto">
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
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
}
