import { S } from 'schema';
import { AppError } from '../../common/errors';
import { OrderEntity } from '../../entities/OrderEntity';
import { createContract, createRpcBinding } from '../../lib';
import { _generateAuthData } from '../user/_generateAuthData';

export const checkOrderStatus = createContract('order.checkOrderStatus')
  .params('orderId', 'secret')
  .schema({
    orderId: S.string(),
    secret: S.string(),
  })
  .returns<{ status: 'not-paid' | 'paid'; email?: string }>()
  .fn(async (orderId, secret) => {
    const order = await OrderEntity.getByKeyOrNull({ orderId });
    if (!order || order.orderSecret !== secret) {
      throw new AppError('Order not found');
    }
    if (order.status !== 'PAID') {
      return {
        status: 'not-paid',
      };
    }
    return {
      status: 'paid',
      email: order.customer.email,
    };
  });

export const checkOrderStatusRpc = createRpcBinding({
  public: true,
  signature: 'order.checkOrderStatus',
  handler: checkOrderStatus,
});
