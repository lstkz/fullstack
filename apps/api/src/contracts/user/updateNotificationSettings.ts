import { S } from 'schema';
import { UserCollection } from '../../collections/User';
import { createContract, createRpcBinding } from '../../lib';

export const updateNotificationSettings = createContract(
  'user.updateNotificationSettings'
)
  .params('user', 'values')
  .schema({
    user: S.object().appUser(),
    values: S.object().keys({
      newsletter: S.boolean(),
      newContent: S.boolean(),
      subscriptionRemainder: S.boolean(),
    }),
  })
  .fn(async (user, values) => {
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
  });

export const updateNotificationSettingsRpc = createRpcBinding({
  injectUser: true,
  signature: 'user.updateNotificationSettings',
  handler: updateNotificationSettings,
});
