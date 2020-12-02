import { Request, Response, NextFunction } from 'express';
import { User } from 'shared';
import type {
  ButtonActionTemplateProps,
  MultiLinksTemplateProps,
} from 'email-templates';

export type Handler = (req: Request, res: Response, next: NextFunction) => void;

export interface AppUser extends User {}

declare module 'express' {
  interface Request {
    user: AppUser;
  }
}

export interface SendEmailTask {
  type: 'SendEmail';
  payload: {
    to: string;
    subject: string;
    template:
      | {
          name: 'ButtonAction';
          params: ButtonActionTemplateProps;
        }
      | {
          name: 'MultiLinks';
          params: MultiLinksTemplateProps;
        };
  };
}

export interface OrderPaidEvent {
  type: 'OrderPaid';
  payload: { orderId: string };
}

export interface UserRegisteredEvent {
  type: 'UserRegistered';
  payload: { userId: string };
}

export type AppTask = SendEmailTask;
export type AppEvent = OrderPaidEvent | UserRegisteredEvent;

type ExtractType<T> = T extends { type: infer S } ? S : never;

export type AppEventType = ExtractType<Pick<AppEvent, 'type'>>;
export type AppTaskType = ExtractType<Pick<AppTask, 'type'>>;
