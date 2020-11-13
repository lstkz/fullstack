import { User } from 'shared';

export interface AppUser extends User {}

export interface OrderPaidEvent {
  type: 'OrderPaidEvent';
  payload: { orderId: string };
}

export interface UserRegisteredEvent {
  type: 'UserRegisteredEvent';
  payload: { userId: string };
}

export type AppEvent = OrderPaidEvent | UserRegisteredEvent;

export * from './types-aws';
