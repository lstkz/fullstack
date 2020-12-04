import { S } from 'schema';
import { EmailSubscriptionCollection } from '../../collections/EmailSubscription';
import { EmailSubscriptionRemovedCollection } from '../../collections/EmailSubscriptionRemoved';
import { AppError } from '../../common/errors';
import { withTransaction } from '../../db';
import { createContract, createRpcBinding } from '../../lib';

export const unsubscribe = createContract('emailSubscription.unsubscribe')
  .params('email', 'code', 'source')
  .schema({
    email: S.string(),
    code: S.string(),
    source: S.string(),
  })
  .fn(async (email, code, source) => {
    const sub = await EmailSubscriptionCollection.findOneByEmail(email);
    if (!sub) {
      return;
    }
    if (sub.unsubscribeCode !== code) {
      throw new AppError('Invalid code');
    }
    await withTransaction(async () => {
      const result = await EmailSubscriptionCollection.deleteById(sub._id);
      if (result.deletedCount) {
        await EmailSubscriptionRemovedCollection.insertOne({
          email,
          source,
          createdAt: new Date(),
        });
      }
    });
  });

export const unsubscribeRpc = createRpcBinding({
  public: true,
  signature: 'emailSubscription.unsubscribe',
  handler: unsubscribe,
});
