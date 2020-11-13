import { User } from 'shared';

export interface AppUser extends User {}

export interface OrderPaidEvent {
  type: 'OrderPaidEvent';
  payload: { orderId: string };
}

export type AppEvent = OrderPaidEvent;

export * from './types-aws';
