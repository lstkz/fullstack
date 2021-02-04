import { ObjectID } from 'mongodb';
import { createCollection } from '../db';

export interface OrderInvoiceModel {
  _id: string;
  externalId: number | null;
  orderId: string;
  userId: ObjectID;
  createdAt: Date;
  isSent: boolean;
}

export const OrderInvoiceCollection = createCollection<OrderInvoiceModel>(
  'orderInvoice',
  [
    {
      key: {
        orderId: 1,
      },
    },
  ]
);
