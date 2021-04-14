import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faGithub,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import * as React from 'react';
import { FooterCopyright } from './FooterCopyright';
import { Logo } from './Logo';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Link from 'next/link';
import { createUrl } from 'src/common/url';

function SocialIcon(props: { icon: IconProp; href: string; title: string }) {
  const { icon, href, title } = props;
  return (
    <a
      href={href}
      title={title}
      target="_blank"
      className="text-gray-500 hover:text-white"
    >
      <FontAwesomeIcon icon={icon} />
    </a>
  );
}

function LinkColumn(props: { title: string; children: React.ReactChild }) {
  const { title, children } = props;
  return (
    <div className="pt-2">
      <div className="text-white mb-2">{title}</div>
      {children}
    </div>
  );
}

export function FooterMain() {
  const linkClass = 'text-gray-500 hover:text-white text-sm';

  return (
    <div className="grid grid-cols-4 pt-8">
      <div className="col-span-2">
        <Logo type="light" titleClassName="text-2xl" />
        <div className="grid gap-1  grid-cols-3 w-28 mt-2">
          <SocialIcon
            title="Facebook"
            href="https://www.facebook.com/fullstackpl"
            icon={faFacebook}
          />
          <SocialIcon
            title="GitHub"
            href="https://github.com/fullstackpl"
            icon={faGithub}
          />
          <SocialIcon
            title="YouTube"
            href="https://www.youtube.com/channel/UCufpAal-CcMXxGDQaHRFUGA"
            icon={faYoutube}
          />
        </div>
      </div>
      <LinkColumn title="Funkcje">
        <ul>
          <li>
            <Link href={createUrl({ name: 'modules' })}>
              <a className={linkClass}>Moduły</a>
            </Link>
          </li>
          <li>
            <Link href={createUrl({ name: 'pricing' })}>
              <a className={linkClass}>Cennik</a>
            </Link>
          </li>
          <li>
            <Link href={createUrl({ name: 'settings' })}>
              <a className={linkClass}>Ustawienia</a>
            </Link>
          </li>
        </ul>
      </LinkColumn>
      <LinkColumn title="Firma">
        <ul>
          <li>
            <a
              href="mailto:kontakt@fullstack.pl"
              target="_blank"
              className={linkClass}
            >
              Kontakt
            </a>
          </li>
        </ul>
      </LinkColumn>
    </div>
  );
}

export function Footer() {
  return (
    <div className="bg-dark text-gray-600">
      <div className="container">
        {/* <FooterMain /> */}
        <FooterCopyright />
      </div>
    </div>
  );
}
