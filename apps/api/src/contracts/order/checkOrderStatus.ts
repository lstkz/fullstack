import { S } from 'schema';
import { AppError } from '../../common/errors';
import { OrderEntity } from '../../entities/OrderEntity';
import { createContract, createRpcBinding } from '../../lib';
import { _generateAuthData } from '../user/_generateAuthData';

export const checkOrderStatus = createContract('order.checkOrderStatus')
  .params('orderId')
  .schema({
    orderId: S.string(),
  })
  .returns<{ status: 'NOT_PAID' | 'PAID' }>()
  .fn(async orderId => {
    const order = await OrderEntity.getByKeyOrNull({ orderId });
    if (!order) {
      throw new AppError('Order not found');
    }
    return { status: order.status };
  });

export const checkOrderStatusRpc = createRpcBinding({
  public: true,
  signature: 'order.checkOrderStatus',
  handler: checkOrderStatus,
});
