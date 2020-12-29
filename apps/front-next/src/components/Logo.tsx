import * as React from 'react';
import { createUrl } from 'src/common/url';
import Link from 'next/link';
import classNames from 'classnames';

interface LogoProps {
  landing?: boolean;
  type: 'dark' | 'light';
  titleClassName?: string;
}

export function Logo(props: LogoProps) {
  const { type, landing, titleClassName } = props;
  return (
    <div className="flex items-center">
      <Link
        href={landing ? '/' : createUrl({ name: 'home' })}
        aria-label="logo"
      >
        <a>
          <h1
            className={classNames(
              'font-bold ',
              type === 'dark' ? 'text-heading' : 'text-white',
              titleClassName ?? 'text-3xl'
            )}
          >
            Fullstack
          </h1>
        </a>
      </Link>
    </div>
  );
}
