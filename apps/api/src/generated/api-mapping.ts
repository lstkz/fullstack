import { createRpcBinding } from '../lib';

type BindingResult = ReturnType<typeof createRpcBinding>;

interface ApiMapping {
  [x: string]: () => Promise<BindingResult>;
}
export const apiMapping: ApiMapping = {
  'example.createFoo': () =>
    import(
      /* webpackChunkName: "example.createFoo"*/ '../contracts/example/createFoo'
    ).then(x => x['createFooRpc']),
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
