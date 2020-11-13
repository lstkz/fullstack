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
  'user.authGithub': () =>
    import(
      /* webpackChunkName: "user.authGithub"*/ '../contracts/user/authGithub'
    ).then(x => x['authGithubRpc']),
  'user.authGoogle': () =>
    import(
      /* webpackChunkName: "user.authGoogle"*/ '../contracts/user/authGoogle'
    ).then(x => x['authGoogleRpc']),
  'user.confirmEmail': () =>
    import(
      /* webpackChunkName: "user.confirmEmail"*/ '../contracts/user/confirmEmail'
    ).then(x => x['confirmEmailRpc']),
  'user.confirmResetPassword': () =>
    import(
      /* webpackChunkName: "user.confirmResetPassword"*/ '../contracts/user/confirmResetPassword'
    ).then(x => x['confirmResetPasswordRpc']),
  'user.getMe': () =>
    import(/* webpackChunkName: "user.getMe"*/ '../contracts/user/getMe').then(
      x => x['getMeRpc']
    ),
  'user.login': () =>
    import(/* webpackChunkName: "user.login"*/ '../contracts/user/login').then(
      x => x['loginRpc']
    ),
  'user.register': () =>
    import(
      /* webpackChunkName: "user.register"*/ '../contracts/user/register'
    ).then(x => x['registerRpc']),
  'user.resetPassword': () =>
    import(
      /* webpackChunkName: "user.resetPassword"*/ '../contracts/user/resetPassword'
    ).then(x => x['resetPasswordRpc']),
};
