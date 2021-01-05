import classNames from 'classnames';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React from 'react';
import { Dashboard } from 'src/components/Dashboard';
import { Heading } from 'src/components/Heading';

interface SettingsPageTemplateProps {
  children: React.ReactNode;
}

const items = [
  {
    name: 'Konto',
    href: '/settings',
  },
  {
    name: 'Subskrypcja',
    href: '/settings/subscription',
  },
  {
    name: 'Powiadomienia',
    href: '/settings/notifications',
  },
];

export function SettingsPageTemplate(props: SettingsPageTemplateProps) {
  const { children } = props;
  const router = useRouter();
  const activeItem = React.useMemo(() => {
    return items.find(x => x.href === router.pathname);
  }, [router.pathname]);
  return (
    <Dashboard>
      <div className="container mt-12 max-w-3xl">
        <div className="text-xs uppercase text-gray-600">Ustawienia</div>
        <Heading type={3}>{activeItem?.name}</Heading>
        <ul
          className="mt-8 mb-4 flex flex-nowrap overflow-x-auto border-b border-gray-300"
          style={{
            paddingBottom: 1,
          }}
        >
          {items.map(item => {
            const isActive = item == activeItem;
            return (
              <li
                className="mr-6"
                style={{
                  marginBottom: -1,
                }}
                key={item.name}
              >
                <Link href={item.href}>
                  <a
                    className={classNames(
                      'block text-sm py-2 border-b hover:text-gray-700',
                      isActive
                        ? 'border-primary text-gray-600'
                        : 'border-transparent text-gray-700'
                    )}
                  >
                    {item.name}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
        <div>{children}</div>
      </div>
    </Dashboard>
  );
}
