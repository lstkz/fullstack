import { S } from 'schema';
import { SubscriptionOrderCollection } from '../../collections/SubscriptionOrder';
import { AppError } from '../../common/errors';
import { createContract, createRpcBinding } from '../../lib';

export const checkStatus = createContract('subscription.checkStatus')
  .params('user', 'orderId')
  .schema({
    user: S.object().appUser(),
    orderId: S.string(),
  })
  .returns<{ status: 'NOT_PAID' | 'PAID' }>()
  .fn(async (user, orderId) => {
    const order = await SubscriptionOrderCollection.findOne({
      _id: orderId,
      userId: user._id,
    });
    if (!order) {
      throw new AppError('Order not found');
    }
    return { status: order.status };
  });

export const checkStatusRpc = createRpcBinding({
  injectUser: true,
  signature: 'subscription.checkStatus',
  handler: checkStatus,
});
