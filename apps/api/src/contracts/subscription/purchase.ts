import { S } from 'schema';
import { createContract, createRpcBinding } from '../../lib';
import { createTPayTransaction, getTPayGroups } from '../../common/tpay';
import { AppError } from '../../common/errors';
import { SubscriptionPlanCollection } from '../../collections/SubscriptionPlan';
import {
  SubscriptionOrderCollection,
  SubscriptionOrderModel,
} from '../../collections/SubscriptionOrder';
import { randomUniqString } from '../../common/helper';
import { config } from 'config';
import { dispatchEvent } from '../../dispatch';
import { getCustomerSchema } from 'shared';
import { updateGeneralInfo } from '../user/updateGeneralInfo';
import { PromoCodeCollection } from '../../collections/PromoCode';
import { getDiscountedPrice } from '../../common/money';

async function _getDiscount(code?: string) {
  if (!code) {
    return 0;
  }
  const promo = await PromoCodeCollection.findById(code.toLowerCase());
  if (!promo) {
    throw new AppError('Promo code not found');
  }
  return promo.discount;
}

export const purchase = createContract('subscription.purchase')
  .params('user', 'values')
  .schema({
    user: S.object().appUser(),
    values: S.object().keys({
      subscriptionPlanId: S.string(),
      tpayGroup: S.number(),
      customer: getCustomerSchema(),
      promoCode: S.string().optional(),
    }),
  })
  .returns<{ paymentUrl: string }>()
  .fn(async (user, values) => {
    const groups = await getTPayGroups();
    if (!groups.some(x => x.id === values.tpayGroup)) {
      throw new AppError('Invalid group');
    }
    const plan = await SubscriptionPlanCollection.findById(
      values.subscriptionPlanId
    );
    if (!plan) {
      throw new AppError('Invalid plan id');
    }
    const orderId = randomUniqString().toUpperCase();
    const discount = await _getDiscount(values.promoCode);
    const price = getDiscountedPrice(plan.price, discount);
    const order: SubscriptionOrderModel = {
      _id: orderId,
      createdAt: new Date(),
      customer: values.customer,
      planId: plan._id,
      price: price,
      provider: {
        name: 'tpay',
        transactionId: null,
        paymentUrl: null,
      },
      status: 'NOT_PAID',
      userId: user._id,
      promoCode: values.promoCode,
    };
    await SubscriptionOrderCollection.insertOne(order);

    await updateGeneralInfo(user, order.customer);

    const tpayTransaction = await createTPayTransaction({
      crc: orderId,
      amount: price.total,
      description: plan.name,
      name: `${values.customer.firstName} ${values.customer.lastName}`,
      email: user.email,
      group: values.tpayGroup,
      language: 'pl',
      merchant_description: 'Fullstack.pl',
      online: 1,
      result_email: config.tpay.resultEmail,
      result_url: `${
        config.tpay.apiRedirectBaseUrl || config.apiBaseUrl
      }/rpc/subscription.tpayHook`,
      return_error_url: `${config.appBaseUrl}`,
      return_url: `${config.appBaseUrl}/check-order/${orderId}`,
    });
    order.provider.transactionId = tpayTransaction.id;
    order.provider.paymentUrl = tpayTransaction.url;
    await SubscriptionOrderCollection.update(order, ['provider']);
    await dispatchEvent({
      type: 'OrderCreated',
      payload: {
        orderId,
      },
    });
    return {
      paymentUrl: tpayTransaction.url,
    };
  });

export const purchaseRpc = createRpcBinding({
  injectUser: true,
  signature: 'subscription.purchase',
  handler: purchase,
});
