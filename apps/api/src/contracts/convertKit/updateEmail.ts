import { ObjectID } from 'mongodb';
import { S } from 'schema';
import { ConvertKitSubscriberCollection } from '../../collections/ConvertKitSubscriber';
import { UserCollection } from '../../collections/User';
import { updateSubscriber } from '../../common/convertKit';
import { createContract, createEventBinding } from '../../lib';

export const updateEmail = createContract('convertKit.updateEmail')
  .params('userId')
  .schema({
    userId: S.string().objectId(),
  })
  .fn(async userId => {
    const user = await UserCollection.findByIdOrThrow(userId);
    const sub = await ConvertKitSubscriberCollection.findOne({
      userId,
    });
    if (!sub) {
      return;
    }
    await updateSubscriber(sub._id, {
      email_address: user.email,
    });
  });

export const updateEmailEvent = createEventBinding({
  type: 'UserEmailUpdated',
  handler: async (_, event) => {
    await updateEmail(ObjectID.createFromHexString(event.userId));
  },
});
