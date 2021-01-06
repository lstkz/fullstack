import * as DateFns from 'date-fns';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Order, SubscriptionStatus } from 'shared';
import { Heading } from 'src/components/Heading';
import { SettingsPageTemplate } from './SettingsPageTemplate';
import { createUrl } from 'src/common/url';
import Link from 'next/link';
import { Button } from 'src/components/Button';
import { cx, formatShortDate } from 'src/common/helper';
import { OrderTable } from './OrderTable';

interface SubscriptionPageProps {
  subscriptionStatus: SubscriptionStatus;
  orders: Order[];
}

interface BannerProps {
  success?: boolean;
  title: React.ReactNode;
  desc: React.ReactNode;
  btnText: string;
}

function Banner(props: BannerProps) {
  const { btnText, desc, success, title } = props;
  return (
    <div className="flex p-6 rounded-lg bg-white border border-gray-200 shadow-lg">
      <div
        className={cx(
          'w-12 h-12 rounded-full text-white flex items-center justify-center mr-6',
          success ? 'bg-success' : 'bg-danger'
        )}
      >
        <FontAwesomeIcon icon={faBell} />
      </div>
      <div>
        <Heading type={5}>{title}</Heading>
        <div className="text-sm mt-1 text-gray-600">{desc}</div>
      </div>
      <div className="ml-auto flex items-center h-auto">
        <Link
          href={createUrl({
            name: 'subscription',
          })}
        >
          <Button type="primary" className="ml-auto">
            {btnText}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export function SubscriptionPage(props: SubscriptionPageProps) {
  const { subscriptionStatus, orders } = props;
  return (
    <SettingsPageTemplate>
      {subscriptionStatus.hasSubscription ? (
        <Banner
          success
          title={'Subskrypcja aktywna'}
          desc={
            <>
              Subskrypcja jest ważna do{' '}
              {formatShortDate(subscriptionStatus.expires!)}
            </>
          }
          btnText="Przedłuż"
        />
      ) : (
        <Banner
          title={'Brak subskrypcji'}
          desc={
            <>Kup subskrypcję, żeby odblokować wszystkie funkcje platformy.</>
          }
          btnText="Kup"
        />
      )}
      <OrderTable orders={orders} />
    </SettingsPageTemplate>
  );
}
