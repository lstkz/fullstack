import { config } from 'config';
import { ObjectID } from 'mongodb';
import { S } from 'schema';
import { ConvertKitSubscriberCollection } from '../../collections/ConvertKitSubscriber';
import { UserCollection } from '../../collections/User';
import { addSubscriberToForm } from '../../common/convertKit';
import { createContract, createEventBinding } from '../../lib';

export const createSubscriber = createContract('convertKit.createSubscriber')
  .params('userId')
  .schema({
    userId: S.string().objectId(),
  })
  .fn(async userId => {
    const user = await UserCollection.findByIdOrThrow(userId);
    const subscription = await addSubscriberToForm(
      config.convertKit.registerFormId,
      user.email
    );
    await ConvertKitSubscriberCollection.insertOne({
      _id: subscription.subscriber.id,
      userId,
      isSubscribed: true,
      isSynced: false,
    });
  });

export const createSubscriberEvent = createEventBinding({
  type: 'UserEmailVerified',
  handler: async (_, event) => {
    await createSubscriber(ObjectID.createFromHexString(event.userId));
  },
});
