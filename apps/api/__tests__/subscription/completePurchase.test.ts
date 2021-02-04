import { SubscriptionOrderCollection } from '../../src/collections/SubscriptionOrder';
import { UserCollection } from '../../src/collections/User';
import * as DateFns from 'date-fns';
import { UserSubscriptionCollection } from '../../src/collections/UserSubscription';
import { completeCourseOrderEvent } from '../../src/contracts/subscription/completePurchase';
import { execContract, getId, setupDb } from '../helper';
import {
  createSubscriptionPlans,
  getCustomerData,
  getPrice,
  registerSampleUsers,
} from '../seed-data';
import { getSubscriptionStatus } from '../../src/contracts/subscription/getSubscriptionStatus';
import { dispatchTask } from '../../src/dispatch';
import { mocked } from 'ts-jest/utils';

setupDb();

jest.mock('../../src/dispatch');
const mocked_dispatchTask = mocked(dispatchTask);

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
  mocked_dispatchTask.mockReset();
});

it('should complete purchase', async () => {
  await completeCourseOrderEvent.options.handler('123', {
    orderId: 'order-abc',
  });
  const userSubs = await UserSubscriptionCollection.findAll({ userId: userId });
  const status = await execContract(getSubscriptionStatus, {}, 'user1_token');
  expect(status.hasSubscription).toEqual(true);
  expect(status.expires).toBeDefined();
  expect(
    DateFns.isSameMonth(
      new Date(status.expires!),
      DateFns.addMonths(Date.now(), 1)
    )
  ).toBeTruthy();
  expect(userSubs).toHaveLength(1);
  expect(mocked_dispatchTask).toBeCalledTimes(2);
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

it('should should extend expiration', async () => {
  await UserCollection.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      $set: {
        hasSubscription: true,
        subscriptionExpiration: DateFns.addMonths(Date.now(), 1),
      },
    }
  );
  await completeCourseOrderEvent.options.handler('123', {
    orderId: 'order-abc',
  });
  const status = await execContract(getSubscriptionStatus, {}, 'user1_token');
  expect(
    DateFns.isSameMonth(
      new Date(status.expires!),
      DateFns.addMonths(Date.now(), 2)
    )
  ).toBeTruthy();
});
