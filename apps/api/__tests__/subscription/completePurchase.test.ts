import { SubscriptionOrderCollection } from '../../src/collections/SubscriptionOrder';
import { UserCollection } from '../../src/collections/User';
import * as DateFns from 'date-fns';
import { UserSubscriptionCollection } from '../../src/collections/UserSubscription';
import { completeCourseOrderEvent } from '../../src/contracts/subscription/completePurchase';
import { getId, setupDb } from '../helper';
import {
  createSubscriptionPlans,
  getCustomerData,
  getPrice,
  registerSampleUsers,
} from '../seed-data';

setupDb();

const userId = getId(1);

beforeEach(async () => {
  await registerSampleUsers();
  await createSubscriptionPlans();
  await SubscriptionOrderCollection.insertOne({
    _id: 'order-abc',
    createdAt: new Date(),
    customer: getCustomerData(),
    planId: 'p1',
    price: getPrice(),
    provider: {
      name: 'tpay',
      paymentUrl: 'url',
      transactionId: 't-123',
    },
    status: 'NOT_PAID',
    userId: getId(1),
  });
});

it('should complete purchase', async () => {
  await completeCourseOrderEvent.options.handler('123', {
    orderId: 'order-abc',
  });
  const user = await UserCollection.findByIdOrThrow(userId);
  const userSubs = await UserSubscriptionCollection.findAll({ userId: userId });
  expect(user.hasSubscription).toEqual(true);
  expect(user.subscriptionExpiration).toBeDefined();
  expect(
    DateFns.isSameMonth(
      user.subscriptionExpiration!,
      DateFns.addMonths(Date.now(), 1)
    )
  ).toBeTruthy();
  expect(userSubs).toHaveLength(1);
});

it('should complete purchase (parallel)', async () => {
  await Promise.all([
    completeCourseOrderEvent.options.handler('123', {
      orderId: 'order-abc',
    }),
    completeCourseOrderEvent.options.handler('123', {
      orderId: 'order-abc',
    }),
  ]);
  const userSubs = await UserSubscriptionCollection.findAll({ userId: userId });
  expect(userSubs).toHaveLength(1);
});
