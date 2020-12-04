import { ObjectID } from 'mongodb';
import { createCollection } from '../db';

export interface UserSubscriptionModel {
  _id: ObjectID;
  userId: ObjectID;
  orderId: string;
  name: string;
}

export const UserSubscriptionCollection = createCollection<UserSubscriptionModel>(
  'userSubscription'
);
