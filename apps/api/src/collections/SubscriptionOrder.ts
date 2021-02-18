import { ObjectID } from 'mongodb';
import { CustomerInfo, PriceInfo } from 'shared';
import { createCollection } from '../db';

export interface SubscriptionOrderModel {
  _id: string;
  createdAt: Date;
  planId: string;
  userId: ObjectID;
  provider: {
    name: 'tpay';
    transactionId: string | null;
    paymentUrl: string | null;
  };
  price: PriceInfo;
  status: 'NOT_PAID' | 'PAID';
  paidAt?: Date;
  customer: CustomerInfo;
  promoCode?: string;
}

export const SubscriptionOrderCollection = createCollection<SubscriptionOrderModel>(
  'subscriptionOrder'
);
