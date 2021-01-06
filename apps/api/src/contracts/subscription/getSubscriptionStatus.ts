import { S } from 'schema';
import { SubscriptionStatus } from 'shared';
import { UserCollection } from '../../collections/User';
import { createContract, createRpcBinding } from '../../lib';

export const getSubscriptionStatus = createContract(
  'subscription.getSubscriptionStatus'
)
  .params('user')
  .schema({
    user: S.object().appUser(),
  })
  .returns<SubscriptionStatus>()
  .fn(async appUser => {
    const user = await UserCollection.findByIdOrThrow(appUser._id);
    return {
      hasSubscription: user.hasSubscription ?? false,
      expires: user.subscriptionExpiration?.toISOString() ?? null,
    };
  });

export const getSubscriptionStatusRpc = createRpcBinding({
  injectUser: true,
  signature: 'subscription.getSubscriptionStatus',
  handler: getSubscriptionStatus,
});
