import React from 'react';
import { SubscriptionModals } from 'src/features/email-subscription/components/SubscriptionModals';
import { ErrorModal } from './ErrorModal';

export function GlobalModals() {
  return (
    <>
      <SubscriptionModals />
      <ErrorModal />
    </>
  );
}
