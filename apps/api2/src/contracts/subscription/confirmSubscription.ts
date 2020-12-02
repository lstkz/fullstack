import { S } from 'schema';
import { SubscriptionCollection } from '../../collections/Subscription';
import { SubscriptionRequestCollection } from '../../collections/SubscriptionRequest';
import { AppError } from '../../common/errors';
import { createContract, createRpcBinding } from '../../lib';

export const confirmSubscription = createContract(
  'subscription.confirmSubscription'
)
  .params('code')
  .schema({
    code: S.string(),
  })
  .fn(async code => {
    const subscriptionRequest = await SubscriptionRequestCollection.findById(
      code
    );
    if (!subscriptionRequest) {
      throw new AppError('Invalid code');
    }
    let subscription = await SubscriptionCollection.findOne({
      email_lowered: subscriptionRequest.email.toLocaleLowerCase(),
    });
    if (subscription) {
      return;
    }
    await SubscriptionCollection.insertOne({
      createdAt: new Date(),
      email: subscriptionRequest.email,
      email_lowered: subscriptionRequest.email.toLowerCase(),
      unsubscribeCode: subscriptionRequest.unsubscribeCode,
    });
  });

export const confirmSubscriptionRpc = createRpcBinding({
  public: true,
  signature: 'subscription.confirmSubscription',
  handler: confirmSubscription,
});
