import { ObjectID } from 'mongodb';
import * as DateFns from 'date-fns';
import { S } from 'schema';
import { SubscriptionOrderCollection } from '../../collections/SubscriptionOrder';
import { SubscriptionPlanCollection } from '../../collections/SubscriptionPlan';
import { UserCollection } from '../../collections/User';
import {
  UserSubscriptionCollection,
  UserSubscriptionModel,
} from '../../collections/UserSubscription';
import { createContract, createEventBinding } from '../../lib';
import { createFlagTransaction } from '../../db';
import { dispatchTask } from '../../dispatch';
import { track } from '../../track';
import { config } from 'config';

export const completePurchase = createContract('subscription.completePurchase')
  .params('orderId')
  .schema({
    orderId: S.string(),
  })
  .fn(async orderId => {
    const withFlagTransaction = createFlagTransaction(
      `completePurchase:${orderId}`
    );
    const order = await SubscriptionOrderCollection.findByIdOrThrow(orderId);
    const plan = await SubscriptionPlanCollection.findByIdOrThrow(order.planId);
    await withFlagTransaction('createUserSubscription', async () => {
      const user = await UserCollection.findByIdOrThrow(order.userId);
      const userSubscription: UserSubscriptionModel = {
        _id: new ObjectID(),
        name: plan.name,
        orderId,
        userId: user._id,
      };
      await UserSubscriptionCollection.insertOne(userSubscription);
      user.hasSubscription = true;
      const currentExpiration = user.subscriptionExpiration ?? 0;
      user.subscriptionExpiration = DateFns.addMonths(
        currentExpiration > Date.now() ? currentExpiration : Date.now(),
        plan.type === 'annual' ? 12 : 1
      );
      await UserCollection.update(user, [
        'hasSubscription',
        'subscriptionExpiration',
      ]);
    });
    const user = await UserCollection.findByIdOrThrow(order.userId);
    await dispatchTask({
      type: 'SendEmail',
      payload: {
        subject: `👏 Kupiłeś abonament ${
          plan.type == 'annual' ? 'roczny' : 'miesięczny'
        }`,
        to: user.email,
        template: {
          name: 'ButtonAction',
          params: {
            header: 'Gratulacje!',
            description: `Dziękujemy za zakup abonamentu.
            Masz teraz dostęp do wszystkich zasobów platformy.
            Subskrypcja wygasa: ${DateFns.format(
              user.subscriptionExpiration!,
              'dd/MM/YYY'
            )}.`,
            buttonUrl: config.appBaseUrl + '/modules',
            buttonText: 'Pokaż moduły',
          },
        },
      },
    });
    await dispatchTask({
      type: 'InviteDiscord',
      payload: {
        userId: order.userId.toHexString(),
      },
    });
    await dispatchTask({
      type: 'CreateOrderInvoice',
      payload: {
        orderId: order._id,
      },
    });

    track(order.userId, { type: 'subscription_complete', planId: plan._id });
  });

export const completeCourseOrderEvent = createEventBinding({
  type: 'OrderPaid',
  handler: async (_, event) => {
    await completePurchase(event.orderId);
  },
});
