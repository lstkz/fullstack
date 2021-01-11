import { S } from 'schema';
import { NotificationSettings } from 'shared';
import { UserCollection } from '../../collections/User';
import { getUserNotificationSettings } from '../../common/db-helper';
import { createContract, createRpcBinding } from '../../lib';

export const getNotificationSettings = createContract(
  'user.getNotificationSettings'
)
  .params('user')
  .schema({
    user: S.object().appUser(),
  })
  .returns<NotificationSettings>()
  .fn(async appUser => {
    const user = await UserCollection.findByIdOrThrow(appUser._id);
    return getUserNotificationSettings(user);
  });

export const getNotificationSettingsRpc = createRpcBinding({
  injectUser: true,
  signature: 'user.getNotificationSettings',
  handler: getNotificationSettings,
});
