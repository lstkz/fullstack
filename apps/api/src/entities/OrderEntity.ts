import { createBaseEntity } from '../lib';

export interface OrderKey {
  orderId: string;
}

type OrderProduct = {
  type: 'course';
  courseId: string;
};

export interface OrderProps extends OrderKey {
  orderSecret: string;
  createdAt: number;
  provider: {
    name: 'tpay';
    transactionId: string | null;
    paymentUrl: string | null;
  };
  amount: number;
  status: 'NOT_PAID' | 'PAID';
  paidAt?: number;
  product: OrderProduct;
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    companyName?: string;
    companyVat?: string;
    address: string;
    postalCode: string;
    city: string;
  };
}

const BaseEntity = createBaseEntity('order')
  .props<OrderProps>()
  .key<OrderKey>(key => `$:${key.orderId}`)
  .build();

export class OrderEntity extends BaseEntity {}
