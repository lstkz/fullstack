import { ObjectID } from 'mongodb';
import { CustomerInfo } from 'shared';
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
  price: {
    net: number;
    vat: number;
    vatRate: number;
    total: number;
  };
  status: 'NOT_PAID' | 'PAID';
  paidAt?: Date;
  customer: CustomerInfo;
}

export const SubscriptionOrderCollection = createCollection<SubscriptionOrderModel>(
  'subscriptionOrder'
);
