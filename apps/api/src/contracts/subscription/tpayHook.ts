import { config } from 'config';
import { S } from 'schema';
import { SubscriptionOrderCollection } from '../../collections/SubscriptionOrder';
import { reportInfo } from '../../common/bugsnag';
import { AppError } from '../../common/errors';
import { md5 } from '../../common/helper';
import { dispatchEvent } from '../../dispatch';
import { createContract, createRpcBinding } from '../../lib';

export const tpayHook = createContract('subscription.tpayHook')
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
  .returns<'TRUE' | 'FALSE'>()
  .fn(async values => {
    if (
      md5(
        `${values.id}${values.tr_id}${values.tr_amount}${values.tr_crc}${config.tpay.code}`
      ) !== values.md5sum
    ) {
      throw new AppError('Invalid md5sum');
    }
    if (values.tr_paid !== values.tr_amount) {
      throw new AppError('Not fully paid');
    }
    if (values.tr_status === 'FALSE' || values.tr_error !== 'none') {
      reportInfo({
        message: 'tpay payment failed',
        source: 'api',
        data: {
          values,
        },
      });
      return 'FALSE';
    }
    const orderId = values.tr_crc;
    const result = await SubscriptionOrderCollection.findOneAndUpdate(
      {
        _id: orderId,
        status: 'NOT_PAID',
      },
      {
        $set: {
          status: 'PAID',
          paidAt: new Date(),
        },
      }
    );
    if (result.value) {
      await dispatchEvent({
        type: 'OrderPaid',
        payload: { orderId },
      });
    }
    return 'TRUE';
  });

export const tpayHookRpc = createRpcBinding({
  public: true,
  wrapAsValues: true,
  signature: 'subscription.tpayHook',
  handler: tpayHook,
});
