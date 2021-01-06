import { S } from 'schema';
import * as R from 'remeda';
import { Order } from 'shared';
import { SubscriptionOrderCollection } from '../../collections/SubscriptionOrder';
import { SubscriptionPlanCollection } from '../../collections/SubscriptionPlan';
import { createContract, createRpcBinding } from '../../lib';

export const getOrders = createContract('subscription.getOrders')
  .params('user')
  .schema({
    user: S.object().appUser(),
  })
  .returns<Order[]>()
  .fn(async user => {
    const plans = await SubscriptionPlanCollection.findAll({});
    const userOrder = await SubscriptionOrderCollection.findAll({
      userId: user._id,
      status: 'PAID',
    });
    const planMap = R.indexBy(plans, x => x._id);
    return userOrder
      .sort((a, b) => b.paidAt!.getTime() - a.paidAt!.getTime())
      .map(item => ({
        id: item._id,
        amount: item.price.total,
        date: item.paidAt!.toISOString(),
        name: planMap[item.planId]?.name ?? item.planId,
      }));
  });

export const getOrdersRpc = createRpcBinding({
  injectUser: true,
  signature: 'subscription.getOrders',
  handler: getOrders,
});
