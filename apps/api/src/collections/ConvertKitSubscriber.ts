import { ObjectID } from 'mongodb';
import { createCollection } from '../db';

export interface ConvertKitSubscriberModel {
  _id: number;
  userId: ObjectID;
  isSynced: boolean;
  isSubscribed: boolean;
}

export const ConvertKitSubscriberCollection = createCollection<ConvertKitSubscriberModel>(
  'convertKitSubscriber',
  [
    {
      key: {
        userId: 1,
      },
    },
    {
      key: {
        isSynced: 1,
      },
    },
  ]
);
