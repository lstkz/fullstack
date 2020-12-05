import { S } from 'schema';
import { EmailSubscriptionCollection } from '../../collections/EmailSubscription';
import { EmailSubscriptionRequestCollection } from '../../collections/EmailSubscriptionRequest';
import { AppError } from '../../common/errors';
import { createContract, createRpcBinding } from '../../lib';

export const confirmSubscription = createContract(
  'emailSubscription.confirmSubscription'
)
  .params('code')
  .schema({
    code: S.string(),
  })
  .fn(async code => {
    const subscriptionRequest = await EmailSubscriptionRequestCollection.findById(
      code
    );
    if (!subscriptionRequest) {
      throw new AppError('Invalid code');
    }
    const subscription = await EmailSubscriptionCollection.findOne({
      email_lowered: subscriptionRequest.email.toLocaleLowerCase(),
    });
    if (subscription) {
      return;
    }
    await EmailSubscriptionCollection.insertOne({
      createdAt: new Date(),
      email: subscriptionRequest.email,
      email_lowered: subscriptionRequest.email.toLowerCase(),
      unsubscribeCode: subscriptionRequest.unsubscribeCode,
    });
  });

export const confirmSubscriptionRpc = createRpcBinding({
  public: true,
  signature: 'emailSubscription.confirmSubscription',
  handler: confirmSubscription,
});
