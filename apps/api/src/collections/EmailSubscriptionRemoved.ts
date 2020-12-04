import { createCollection } from '../db';

export interface EmailSubscriptionRemovedModel {
  email: string;
  source: string;
  createdAt: Date;
}

export const EmailSubscriptionRemovedCollection = createCollection<EmailSubscriptionRemovedModel>(
  'emailSubscriptionRemoved'
);
