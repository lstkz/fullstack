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
  });

export const completeCourseOrderEvent = createEventBinding({
  type: 'OrderPaid',
  handler: async (_, event) => {
    await completePurchase(event.orderId);
  },
});
