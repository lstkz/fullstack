import { S } from 'schema';
import { AppError } from '../../common/errors';
import { SubscriptionEntity } from '../../entities/SubscriptionEntity';
import { SubscriptionRequestEntity } from '../../entities/SubscriptionRequestEntity';
import { createContract, createRpcBinding } from '../../lib';

export const confirmSubscription = createContract(
  'subscription.confirmSubscription'
)
  .params('code')
  .schema({
    code: S.string(),
  })
  .fn(async code => {
    const subscriptionRequest = await SubscriptionRequestEntity.getByKeyOrNull({
      id: code,
    });
    if (!subscriptionRequest) {
      throw new AppError('Invalid code');
    }
    let subscription = await SubscriptionEntity.getByKeyOrNull({
      email: subscriptionRequest.email,
    });
    if (subscription) {
      return;
    }
    subscription = new SubscriptionEntity({
      createdAt: Date.now(),
      email: subscriptionRequest.email,
      name: subscriptionRequest.name,
      unsubscribeCode: subscriptionRequest.unsubscribeCode,
    });
    await subscription.insert();
  });

export const confirmSubscriptionRpc = createRpcBinding({
  public: true,
  signature: 'subscription.confirmSubscription',
  handler: confirmSubscription,
});
