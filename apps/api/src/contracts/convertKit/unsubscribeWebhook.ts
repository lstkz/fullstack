import { S } from 'schema';
import { ConvertKitSubscriberCollection } from '../../collections/ConvertKitSubscriber';
import { UserCollection } from '../../collections/User';
import { logger } from '../../common/logger';
import { NEWSLETTER_TYPES } from '../../Const';
import { withTransaction } from '../../db';
import { createContract, createRpcBinding } from '../../lib';

export const unsubscribeWebhook = createContract(
  'convertKit.unsubscribeWebhook'
)
  .params('values')
  .schema({
    values: S.object()
      .keys({
        subscriber: S.object()
          .keys({
            id: S.number(),
          })
          .unknown(),
      })
      .unknown(),
  })
  .fn(async values => {
    const subscriber = await ConvertKitSubscriberCollection.findById(
      values.subscriber.id
    );
    if (!subscriber) {
      logger.info(`Subscriber ${values.subscriber.id} not found. Ignoring.`);
      return;
    }
    await withTransaction(async () => {
      const user = await UserCollection.findByIdOrThrow(subscriber.userId);
      subscriber.isSubscribed = false;
      subscriber.isSynced = false;
      await ConvertKitSubscriberCollection.update(subscriber, [
        'isSubscribed',
        'isSynced',
      ]);
      NEWSLETTER_TYPES.forEach(type => {
        user.notifications[type] = false;
      });
      await UserCollection.update(user, ['notifications']);
    });
  });

export const unsubscribeWebhookRpc = createRpcBinding({
  public: true,
  wrapAsValues: true,
  signature: 'convertKit.unsubscribeWebhook',
  handler: unsubscribeWebhook,
});
