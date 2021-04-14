import Link from 'next/link';
import * as React from 'react';

function StyledLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link href={href}>
      <a className="block text-gray-500 py-1 px-4 hover:text-white">
        {children}
      </a>
    </Link>
  );
}

export function FooterCopyright() {
  return (
    <div className="text-sm font-semibold text-center pb-6 md:text-left">
      <div className="sep sep-light mt-6 pb-6" />
      <div className="grid md:grid-cols-2">
        <div>
          © {new Date().getFullYear()}{' '}
          <Link href="/">
            <a className="text-alpha-white90">Fullstack</a>
          </Link>
          . Wszelkie prawa zastrzeżone.
        </div>
        <div className="flex flex-wrap justify-center list-none">
          <li>{/* <StyledLink href="/terms">Regulamin</StyledLink> */}</li>
          <li>
            <StyledLink href="/privacy">Polityka Prywatności</StyledLink>
          </li>
        </div>
      </div>
    </div>
  );
}
