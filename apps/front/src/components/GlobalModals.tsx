import React from 'react';
import { SubscriptionModals } from 'src/features/subscription/components/SubscriptionModals';
import { ErrorModal } from './ErrorModal';

export function GlobalModals() {
  return (
    <>
      <SubscriptionModals />
      <ErrorModal />
    </>
  );
}
