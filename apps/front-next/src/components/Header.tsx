import Link from 'next/link';
import * as React from 'react';
import { createUrl } from 'src/common/url';
import { Logo } from 'src/components/Logo';
import { DISABLE_APP } from 'src/config';
import { useAuthActions, useUser } from 'src/features/AuthModule';
import { ButtonNext } from './ButtonNext';
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
          {!DISABLE_APP && (
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
                        <MenuItem>
                          <Link
                            data-test="settings-link"
                            href={createUrl({ name: 'settings' })}
                          >
                            Ustawienia
                          </Link>
                        </MenuItem>
                        <MenuSeparator />
                        <MenuItem red>
                          <VoidLink
                            data-test="logout-btn"
                            onClick={authActions.logout}
                          >
                            Wyloguj się
                          </VoidLink>
                        </MenuItem>
                      </DropdownPopup>
                    }
                  >
                    <VoidLink className="flex items-center cursor-pointer  border border-transparent border-dotted focus:border-gray-200 outline-none text-white ">
                      <div
                        data-test="current-email"
                        className="font-medium ml-2"
                      >
                        {user.email}
                      </div>
                      <div className="caret ml-2" />
                    </VoidLink>
                  </MenuDropdown>
                </div>
              ) : (
                <div className="grid gap-4 grid-flow-col-dense auto-cols-max h-auto my-auto">
                  <ButtonNext
                    testId="header-login-btn"
                    type="secondary"
                    href={createUrl({ name: 'login' })}
                    size="small"
                  >
                    Zaloguj się
                  </ButtonNext>
                  <ButtonNext
                    testId="header-register-btn"
                    type="primary"
                    href={createUrl({ name: 'register' })}
                    size="small"
                  >
                    Załóż konto
                  </ButtonNext>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
