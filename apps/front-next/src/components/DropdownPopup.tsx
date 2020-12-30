import Link from 'next/link';
import { HTMLAttributes } from 'react';
import { VoidLink } from './VoidLink';
import classNames from 'classnames';

interface MenuItemProps extends HTMLAttributes<HTMLAnchorElement> {
  href?: string;
  colorClassName?: string;
}

export function MenuItem(props: MenuItemProps) {
  const { href, children, colorClassName = 'text-gray-700', ...rest } = props;
  const className = classNames(
    'block w-full py-1 px-4 whitespace-nowrap',
    colorClassName
  );
  return (
    <div>
      {href ? (
        <Link href={href} {...rest}>
          <a className={className}>{children}</a>
        </Link>
      ) : (
        <VoidLink className={className} {...rest}>
          {children}
        </VoidLink>
      )}
    </div>
  );
}

export function MenuSeparator(props: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className="my-2 border-t border-gray-200" />;
}

export function DropdownPopup(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      style={{
        minWidth: '12rem',
      }}
      className="text-sm py-2 mt-1 text-gray-600 bg-white border border-gray-200 rounded-lg shadow-sm"
    />
  );
}
