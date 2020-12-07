import * as R from 'remeda';
import React from 'react';
import { useRouter } from 'next/dist/client/router';
import { useErrorModalActions } from './ErrorModalModule';
import { useSubscriptionModalsActions } from './SubscriptionModalsModule';
import { api } from '../services/api';

export function ConfirmEmailChecker() {
  const router = useRouter();
  const errorModalActions = useErrorModalActions();
  const subscriptionModals = useSubscriptionModalsActions();
  React.useEffect(() => {
    const getQuery = (name: string) =>
      Array.isArray(router.query[name]) ? null : (router.query[name] as string);
    const code = getQuery('confirm-email');
    const unsubscribe = getQuery('unsubscribe');
    const email = getQuery('email');
    const source = getQuery('source');
    if (code) {
      void router.replace({
        pathname: router.pathname,
        query: R.omit(router.query, ['confirm-email']),
      });
      api
        .emailSubscription_confirmSubscription(code)
        .then(() => subscriptionModals.show('confirmed'))
        .catch(errorModalActions.show);
    }
    if (unsubscribe && email && source) {
      void router.replace({
        pathname: router.pathname,
        query: R.omit(router.query, ['unsubscribe', 'email', 'source']),
      });
      api
        .emailSubscription_unsubscribe(email, unsubscribe, source)
        .then(() => subscriptionModals.show('unsubscribed'))
        .catch(errorModalActions.show);
    }
  }, [router.query]);

  return null;
}
