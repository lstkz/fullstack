import { Request, Response, NextFunction } from 'express';
import type {
  ButtonActionTemplateProps,
  MultiLinksTemplateProps,
} from 'email-templates';
import { ObjectID } from 'mongodb';

export type Handler = (req: Request, res: Response, next: NextFunction) => void;

export interface AppUser {
  _id: ObjectID;
  email: string;
  isVerified: boolean;
}

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

export interface VMStep1CreateTask {
  type: 'VMStep1Create';
  payload: {
    vmId: string;
  };
}

export interface VMStep2AssignDomainTask {
  type: 'VMStep2AssignDomainTask';
  payload: {
    vmId: string;
  };
}

export interface VMStep3InstallTask {
  type: 'VMStep3Install';
  payload: {
    vmId: string;
  };
}

export interface OrderCreatedEvent {
  type: 'OrderCreated';
  payload: { orderId: string };
}

export interface OrderPaidEvent {
  type: 'OrderPaid';
  payload: { orderId: string };
}

export interface UserRegisteredEvent {
  type: 'UserRegistered';
  payload: { userId: string };
}

export type AppTask =
  | SendEmailTask
  | VMStep1CreateTask
  | VMStep2AssignDomainTask
  | VMStep3InstallTask;
export type AppEvent = OrderCreatedEvent | OrderPaidEvent | UserRegisteredEvent;

type ExtractType<T> = T extends { type: infer S } ? S : never;

export type AppEventType = ExtractType<Pick<AppEvent, 'type'>>;
export type AppTaskType = ExtractType<Pick<AppTask, 'type'>>;
