import { faBars, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import { cx } from 'src/common/helper';
import { createUrl } from 'src/common/url';
import { useUser } from 'src/features/AuthModule';
import { Logo } from './Logo';
import { MobileSidebar } from './MobileSidebar';
import { VoidLink } from './VoidLink';

function HeaderIcon(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  return (
    <div
      {...rest}
      className={cx(
        'h-full absolute top-0 flex items-center text-xl leading-none ',
        className
      )}
    />
  );
}

export function MobileHeader() {
  const user = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  return (
    <>
      {isSidebarOpen && (
        <MobileSidebar onClose={() => setIsSidebarOpen(false)} />
      )}
      <div className="relative bg-dark flex py-2">
        <HeaderIcon className="left-4">
          <VoidLink
            className="text-white flex p-2"
            data-test="mobile-menu"
            onClick={() => setIsSidebarOpen(true)}
          >
            <FontAwesomeIcon icon={faBars} />
          </VoidLink>
        </HeaderIcon>

        <div className="flex items-center justify-center mx-auto">
          <Logo type="light" />
        </div>
        {!user && (
          <HeaderIcon className="right-4">
            <Link href={createUrl({ name: 'login' })}>
              <a data-test="header-login-link" className="text-white flex p-2">
                <FontAwesomeIcon icon={faSignInAlt} />
              </a>
            </Link>
          </HeaderIcon>
        )}
      </div>
    </>
  );
}
