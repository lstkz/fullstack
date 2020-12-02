import { S } from 'schema';
import { SubscriptionCollection } from '../../collections/Subscription';
import { SubscriptionRemovedCollection } from '../../collections/SubscriptionRemoved';
import { AppError } from '../../common/errors';
import { withTransaction } from '../../db';
import { createContract, createRpcBinding } from '../../lib';

export const unsubscribe = createContract('subscription.unsubscribe')
  .params('email', 'code', 'source')
  .schema({
    email: S.string(),
    code: S.string(),
    source: S.string(),
  })
  .fn(async (email, code, source) => {
    const sub = await SubscriptionCollection.findOneByEmail(email);
    if (!sub) {
      return;
    }
    if (sub.unsubscribeCode !== code) {
      throw new AppError('Invalid code');
    }
    await withTransaction(async () => {
      const result = await SubscriptionCollection.deleteById(sub._id);
      if (result.deletedCount) {
        await SubscriptionRemovedCollection.insertOne({
          email,
          source,
          createdAt: new Date(),
        });
      }
    });
  });

export const unsubscribeRpc = createRpcBinding({
  public: true,
  signature: 'subscription.unsubscribe',
  handler: unsubscribe,
});
