import { createBaseEntity } from '../lib';

export interface OrderKey {
  orderId: string;
}

type OrderProduct = {
  type: 'course';
  courseId: string;
};

export interface OrderProps extends OrderKey {
  createdAt: number;
  provider: {
    name: 'tpay';
    transactionId: string | null;
    paymentUrl: string | null;
  };
  amount: number;
  status: 'NOT_PAID' | 'PAID';
  product: OrderProduct;
  customer: {
    email: string;
    firstName: string;
    lastName: string;
  };
  invoice?: {
    company: string;
    country: string;
    vat: string;
    street: string;
    streetNo: string;
    localNo?: string;
    postalCode: string;
    city: string;
  };
}

const BaseEntity = createBaseEntity('order')
  .props<OrderProps>()
  .key<OrderKey>(key => `$:${key.orderId}`)
  .build();

export class OrderEntity extends BaseEntity {}
