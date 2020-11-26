import { User } from 'shared';
import type { ButtonActionTemplateProps } from 'email-templates';

export interface AppUser extends User {}

export interface SendEmailEvent {
  type: 'SendEmailEvent';
  payload: {
    to: string;
    subject: string;
    template: {
      name: 'ButtonAction';
      params: ButtonActionTemplateProps;
    };
  };
}

export interface OrderPaidEvent {
  type: 'OrderPaidEvent';
  payload: { orderId: string };
}

export interface UserRegisteredEvent {
  type: 'UserRegisteredEvent';
  payload: { userId: string };
}

export type AppEvent = SendEmailEvent | OrderPaidEvent | UserRegisteredEvent;

export * from './types-aws';
