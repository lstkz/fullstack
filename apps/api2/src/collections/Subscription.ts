import { ObjectID } from 'mongodb';
import { createCollection } from '../db';

export interface SubscriptionModel {
  _id: ObjectID;
  email: string;
  email_lowered: string;
  createdAt: Date;
  unsubscribeCode: string;
}

export const SubscriptionCollection = createCollection<SubscriptionModel>(
  'subscription',
  [
    {
      key: {
        email_lowered: 1,
      },
      unique: true,
    },
  ]
);
