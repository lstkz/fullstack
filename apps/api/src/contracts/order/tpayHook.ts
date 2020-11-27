import { S } from 'schema';
import { AppError } from '../../common/errors';
import { md5 } from '../../common/helper';
import { logger } from '../../common/logger';
import { TPAY_CODE } from '../../config';
import { dispatch } from '../../dispatch';
import { EventEntity } from '../../entities/EventEntity';
import { OrderEntity } from '../../entities/OrderEntity';
import { createContract, createRpcBinding, createTransaction } from '../../lib';

export const tpayHook = createContract('order.tpayHook')
  .params('values')
  .schema({
    values: S.object()
      .keys({
        id: S.string(),
        tr_id: S.string(),
        tr_date: S.string(),
        tr_crc: S.string(),
        tr_amount: S.string(),
        tr_paid: S.string(),
        tr_desc: S.string(),
        tr_status: S.enum().literal('TRUE', 'FALSE'),
        tr_error: S.string(),
        tr_email: S.string(),
        test_mode: S.string(),
        md5sum: S.string(),
      })
      .unknown(),
  })
  .fn(async values => {
    if (
      md5(
        `${values.id}${values.tr_id}${values.tr_amount}${values.tr_crc}${TPAY_CODE}`
      ) !== values.md5sum
    ) {
      throw new AppError('Invalid md5sum');
    }
    if (values.tr_paid !== values.tr_amount) {
      throw new AppError('Not fully paid');
    }
    if (values.tr_status === 'FALSE' || values.tr_error !== 'none') {
      logger.error('tpay payment failed', values);
      return;
    }
    const t = createTransaction();
    const order = await OrderEntity.getByKey({ orderId: values.tr_crc });
    order.status = 'PAID';
    order.paidAt = Date.now();
    t.update(order, ['status', 'paidAt']);
    EventEntity.addToTransaction(t, `tpayHook-${values.tr_crc}`);
    try {
      await t.commit();
    } catch (e) {
      if (e.code === 'TransactionCanceledException') {
        return;
      }
    }
    await dispatch({
      type: 'OrderPaidEvent',
      payload: { orderId: order.orderId },
    });

    return 'TRUE';
  });

export const tpayHookRpc = createRpcBinding({
  public: true,
  signature: 'order.tpayHook',
  handler: tpayHook,
});
