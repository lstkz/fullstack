import { ObjectID } from 'mongodb';
import { CustomerInfo, NotificationSettings } from 'shared';
import { safeExtend } from '../common/helper';
import { createCollection } from '../db';

export interface UserModel {
  _id: ObjectID;
  email: string;
  email_lowered: string;
  salt: string;
  password: string;
  isVerified: boolean;
  isAdmin?: boolean;
  githubId?: number;
  hasSubscription?: boolean;
  subscriptionExpiration?: Date;
  info?: CustomerInfo | null;
  notifications?: NotificationSettings | null;
  invoiceClientId?: number;
}

export const UserCollection = safeExtend(
  createCollection<UserModel>('user', [
    {
      key: {
        email_lowered: 1,
      },
      unique: true,
    },
    {
      key: {
        githubId: 1,
      },
      unique: true,
      sparse: true,
    },
  ]),
  {
    findOneByEmail(email: string) {
      return UserCollection.findOne({ email_lowered: email.toLowerCase() });
    },
  }
);
