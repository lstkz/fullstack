import { S } from 'schema';
import { ConvertKitSubscriberCollection } from '../../collections/ConvertKitSubscriber';
import { UserCollection } from '../../collections/User';
import { withTransaction } from '../../db';
import { createContract, createRpcBinding } from '../../lib';

export const updateNotificationSettings = createContract(
  'user.updateNotificationSettings'
)
  .params('user', 'values')
  .schema({
    user: S.object().appUser(),
    values: S.object().keys({
      newsletter: S.boolean(),
      webinars: S.boolean(),
      newContent: S.boolean(),
      subscriptionRemainder: S.boolean(),
    }),
  })
  .fn(async (user, values) => {
    await withTransaction(async () => {
      await UserCollection.findOneAndUpdate(
        {
          _id: user._id,
        },
        {
          $set: {
            notifications: values,
          },
        }
      );
      const subscriber = await ConvertKitSubscriberCollection.findOne({
        userId: user._id,
      });
      if (subscriber) {
        subscriber.isSynced = false;
        await ConvertKitSubscriberCollection.update(subscriber, ['isSynced']);
      }
    });
  });

export const updateNotificationSettingsRpc = createRpcBinding({
  injectUser: true,
  signature: 'user.updateNotificationSettings',
  handler: updateNotificationSettings,
});
