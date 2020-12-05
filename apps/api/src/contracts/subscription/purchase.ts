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

export const purchase = createContract('subscription.purchase')
  .params('user', 'values')
  .schema({
    user: S.object().appUser(),
    values: S.object().keys({
      subscriptionPlanId: S.string(),
      tpayGroup: S.number(),
      customer: S.object().keys({
        firstName: S.string(),
        lastName: S.string(),
        companyName: S.string().optional(),
        companyVat: S.string().optional(),
        address: S.string(),
        postalCode: S.string(),
        city: S.string(),
      }),
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
    const order: SubscriptionOrderModel = {
      _id: orderId,
      createdAt: new Date(),
      customer: values.customer,
      planId: plan._id,
      price: plan.price,
      provider: {
        name: 'tpay',
        transactionId: null,
        paymentUrl: null,
      },
      status: 'NOT_PAID',
      userId: user._id,
    };
    await SubscriptionOrderCollection.insertOne(order);

    const tpayTransaction = await createTPayTransaction({
      crc: orderId,
      amount: plan.price.total,
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
