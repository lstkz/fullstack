import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import { cx } from 'src/common/helper';
import { createUrl } from 'src/common/url';
import { useAuthActions, useUser } from 'src/features/AuthModule';
import { Button } from './Button';
import { Logo } from './Logo';
import { VoidLink } from './VoidLink';

interface MobileSidebarProps {
  onClose(): void;
}

function ListItem(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { className, href, ...rest } = props;
  return (
    <div
      className={cx(
        'text-xl border-b border-gray-600 first:border-t  px-6 py-4',
        className
      )}
    >
      {href ? (
        <Link href={href!}>
          <a className=" text-white" {...rest}></a>
        </Link>
      ) : (
        <span {...rest}></span>
      )}
    </div>
  );
}

export function MobileSidebar(props: MobileSidebarProps) {
  const { onClose } = props;
  const user = useUser();
  const { logout } = useAuthActions();
  return (
    <div
      data-test="mobile-sidebar"
      className="fixed left-0 right-0 bottom-0 top-0 p-8 z-10 bg-dark-700 text-white"
    >
      <div className="flex justify-center mb-6">
        <Logo type="light" />
      </div>
      <VoidLink
        className="absolute top-3 right-4 text-white text-3xl"
        onClick={onClose}
      >
        <FontAwesomeIcon icon={faTimes} />
      </VoidLink>
      {user ? (
        <div className="text-xl text-center">{user.email}</div>
      ) : (
        <div className="flex justify-center">
          <Button
            testId="register"
            type="primary"
            onClick={onClose}
            href={createUrl({ name: 'register' })}
          >
            ZAREJESTRUJ SIĘ
          </Button>
        </div>
      )}
      <ul className="mt-10">
        <ListItem onClick={onClose} href={createUrl({ name: 'modules' })}>
          Moduły
        </ListItem>
        {user && (
          <ListItem onClick={onClose} href={createUrl({ name: 'settings' })}>
            Ustawienia
          </ListItem>
        )}
        {user && (
          <ListItem className="text-danger" onClick={logout}>
            Wyloguj się
          </ListItem>
        )}
      </ul>

      {!user && (
        <div className="mt-8 text-center">
          Masz konto?{' '}
          <Link href={createUrl({ name: 'login' })}>
            <a>Zaloguj się</a>
          </Link>
        </div>
      )}
    </div>
  );
}
