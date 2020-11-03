import { createRpcBinding } from '../lib';

type BindingResult = ReturnType<typeof createRpcBinding>;

interface ApiMapping {
  [x: string]: () => Promise<BindingResult>;
}
export const apiMapping: ApiMapping = {
  'subscription.confirmSubscription': () =>
    import(
      /* webpackChunkName: "subscription.confirmSubscription"*/ '../contracts/subscription/confirmSubscription'
    ).then(x => x['confirmSubscriptionRpc']),
  'subscription.subscribe': () =>
    import(
      /* webpackChunkName: "subscription.subscribe"*/ '../contracts/subscription/subscribe'
    ).then(x => x['subscribeRpc']),
  'subscription.unsubscribe': () =>
    import(
      /* webpackChunkName: "subscription.unsubscribe"*/ '../contracts/subscription/unsubscribe'
    ).then(x => x['unsubscribeRpc']),
};
