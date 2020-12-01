import { createCollection } from '../db';

export interface SubscriptionRequestModel {
  _id: string;
  email: string;
  unsubscribeCode: string;
}

export const SubscriptionRequestCollection = createCollection<
  SubscriptionRequestModel
>('subscriptionRequest');
