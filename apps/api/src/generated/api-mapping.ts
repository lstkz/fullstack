import { createRpcBinding } from '../lib';

type BindingResult = ReturnType<typeof createRpcBinding>;

interface ApiMapping {
  [x: string]: () => Promise<BindingResult>;
}
export const apiMapping: ApiMapping = {
  'course.updateCourse': () =>
    import(
      /* webpackChunkName: "course.updateCourse"*/ '../contracts/course/updateCourse'
    ).then(x => x['updateCourseRpc']),
  'order.createOrder': () =>
    import(
      /* webpackChunkName: "order.createOrder"*/ '../contracts/order/createOrder'
    ).then(x => x['createOrderRpc']),
  'order.tpayHook': () =>
    import(
      /* webpackChunkName: "order.tpayHook"*/ '../contracts/order/tpayHook'
    ).then(x => x['tpayHookRpc']),
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
