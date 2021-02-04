import * as React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

interface LogoProps {
  landing?: boolean;
  type: 'dark' | 'light';
  titleClassName?: string;
}

export function Logo(props: LogoProps) {
  const { type, titleClassName } = props;
  return (
    <div className="flex items-center">
      <Link href="/" aria-label="logo">
        <a>
          <h1
            className={classNames(
              'font-bold',
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
