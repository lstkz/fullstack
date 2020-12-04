import { createEventBinding } from '../lib';

type BindingResult = ReturnType<typeof createEventBinding>;

interface EventMapping {
  [x: string]: {
    [x: string]: () => Promise<BindingResult>;
  };
}
export const eventMapping: EventMapping = {
  SendEmailEvent: {
    sendEmailEvent: () =>
      import(
        /* webpackChunkName: "SendEmailEvent.sendEmailEvent"*/ '../contracts/notification/sendEmail'
      ).then(x => x['sendEmailEvent']),
  },
  OrderPaidEvent: {
    completeCourseOrderEvent: () =>
      import(
        /* webpackChunkName: "OrderPaidEvent.completeCourseOrderEvent"*/ '../contracts/order/completeCourseOrder'
      ).then(x => x['completeCourseOrderEvent']),
  },
};
