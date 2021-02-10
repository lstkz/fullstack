import { config } from 'config';
import { ConvertKitSubscriberCollection } from '../../collections/ConvertKitSubscriber';
import { UserCollection } from '../../collections/User';
import { reportError } from '../../common/bugsnag';
import {
  addSubscriberToForm,
  getSubscriber,
  tagSubscriber,
  untagSubscriber,
} from '../../common/convertKit';
import { NEWSLETTER_TYPES } from '../../Const';
import { withTransaction } from '../../db';
import { createContract, createTaskBinding } from '../../lib';

async function _sync(subscriberId: number) {
  await withTransaction(async () => {
    const subscriber = await ConvertKitSubscriberCollection.findByIdOrThrow(
      subscriberId
    );
    const user = await UserCollection.findByIdOrThrow(subscriber.userId);
    if (!subscriber.isSubscribed) {
      await addSubscriberToForm(config.convertKit.registerFormId, user.email);
      const convertKitSubscriber = await getSubscriber(subscriber._id);
      if (convertKitSubscriber.state != 'active') {
        // Sometimes not working user unsubscribe and we resubscribe
        return;
      }
      subscriber.isSubscribed = true;
      await ConvertKitSubscriberCollection.update(subscriber, ['isSubscribed']);
    }
    for (const type of NEWSLETTER_TYPES) {
      const tagId = config.convertKit.tagMapping[type];
      if (user.notifications[type]) {
        await tagSubscriber(tagId, user.email);
      } else {
        await untagSubscriber(tagId, user.email);
      }
    }
    subscriber.isSynced = true;
    await ConvertKitSubscriberCollection.update(subscriber, ['isSynced']);
  });
}

export const syncSubscribers = createContract('convertKit.syncSubscribers')
  .params()
  .schema({})
  .fn(async () => {
    const items = await (
      await ConvertKitSubscriberCollection.find({
        isSynced: false,
      })
    )
      .limit(100)
      .toArray();
    for (const item of items) {
      try {
        await _sync(item._id);
      } catch (e) {
        reportError({
          source: 'worker',
          error: e,
          data: {
            subscriberId: item._id,
          },
        });
      }
    }
  });

export const syncSubscribersRpc = createTaskBinding({
  type: 'SyncConvertKitSubscribers',
  handler: async () => {
    await syncSubscribers();
  },
});
