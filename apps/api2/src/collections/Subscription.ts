import { ObjectID } from 'mongodb';
import { safeExtend } from '../common/helper';
import { createCollection } from '../db';

export interface SubscriptionModel {
  _id: ObjectID;
  email: string;
  email_lowered: string;
  createdAt: Date;
  unsubscribeCode: string;
}

export const SubscriptionCollection = safeExtend(
  createCollection<SubscriptionModel>('subscription', [
    {
      key: {
        email_lowered: 1,
      },
      unique: true,
    },
  ]),
  {
    findOneByEmail(email: string) {
      return SubscriptionCollection.findOne({
        email_lowered: email.toLowerCase(),
      });
    },
  }
);
