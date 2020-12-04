import { S } from 'schema';
import { AppError } from '../../common/errors';
import { randomUniqString } from '../../common/helper';
import { SubscriptionEntity } from '../../entities/SubscriptionEntity';
import { SubscriptionRemovedEntity } from '../../entities/SubscriptionRemovedEntity';
import { createContract, createRpcBinding, createTransaction } from '../../lib';

export const unsubscribe = createContract('subscription.unsubscribe')
  .params('email', 'code', 'source')
  .schema({
    email: S.string(),
    code: S.string(),
    source: S.string(),
  })
  .fn(async (email, code, source) => {
    const sub = await SubscriptionEntity.getByKeyOrNull({
      email,
    });
    if (!sub) {
      return;
    }
    if (sub.unsubscribeCode !== code) {
      throw new AppError('Invalid code');
    }
    const t = createTransaction();
    t.delete(sub);
    const subRemoved = new SubscriptionRemovedEntity({
      id: randomUniqString(),
      email,
      source,
      createdAt: Date.now(),
    });
    t.insert(subRemoved);
    await t.commit();
  });

export const unsubscribeRpc = createRpcBinding({
  public: true,
  signature: 'subscription.unsubscribe',
  handler: unsubscribe,
});
