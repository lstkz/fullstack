import { createCollection } from '../db';

export interface SubscriptionRemovedModel {
  email: string;
  source: string;
  createdAt: Date;
}

export const SubscriptionRemovedCollection = createCollection<
  SubscriptionRemovedModel
>('subscriptionRemoved');
