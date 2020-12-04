import { createCollection } from '../db';

export interface EmailSubscriptionRequestModel {
  _id: string;
  email: string;
  unsubscribeCode: string;
}

export const EmailSubscriptionRequestCollection = createCollection<EmailSubscriptionRequestModel>(
  'emailSubscriptionRequest'
);
