import { ObjectID } from 'mongodb';
import { safeExtend } from '../common/helper';
import { createCollection } from '../db';

export interface EmailSubscriptionModel {
  _id: ObjectID;
  email: string;
  email_lowered: string;
  createdAt: Date;
  unsubscribeCode: string;
}

export const EmailSubscriptionCollection = safeExtend(
  createCollection<EmailSubscriptionModel>('emailSubscription', [
    {
      key: {
        email_lowered: 1,
      },
      unique: true,
    },
  ]),
  {
    findOneByEmail(email: string) {
      return EmailSubscriptionCollection.findOne({
        email_lowered: email.toLowerCase(),
      });
    },
  }
);
