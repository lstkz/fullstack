import { SubscriptionOrderCollection } from '../../src/collections/SubscriptionOrder';
import { execContract, getId, setupDb } from '../helper';
import {
  createSubscriptionPlans,
  getCustomerData,
  getPrice,
  registerSampleUsers,
} from '../seed-data';
import { getOrders } from '../../src/contracts/subscription/getOrders';

setupDb();

beforeEach(async () => {
  await registerSampleUsers();
  await createSubscriptionPlans();
  await SubscriptionOrderCollection.insertMany([
    {
      _id: 'order-1',
      createdAt: new Date(1),
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
    },
    {
      _id: 'order-2',
      createdAt: new Date(1),
      customer: getCustomerData(),
      planId: 'p1',
      price: getPrice(),
      provider: {
        name: 'tpay',
        paymentUrl: 'url',
        transactionId: 't-123',
      },
      status: 'PAID',
      paidAt: new Date(1),
      userId: getId(1),
    },
    {
      _id: 'order-3',
      createdAt: new Date(1),
      customer: getCustomerData(),
      planId: 'p1',
      price: getPrice(),
      provider: {
        name: 'tpay',
        paymentUrl: 'url',
        transactionId: 't-123',
      },
      status: 'PAID',
      paidAt: new Date(2),
      userId: getId(1),
    },
    {
      _id: 'order-4',
      createdAt: new Date(1),
      customer: getCustomerData(),
      planId: 'p1',
      price: getPrice(),
      provider: {
        name: 'tpay',
        paymentUrl: 'url',
        transactionId: 't-123',
      },
      status: 'PAID',
      paidAt: new Date(3),
      userId: getId(2),
    },
  ]);
});

it('should return orders', async () => {
  const orders = await execContract(getOrders, {}, 'user1_token');
  expect(orders).toMatchInlineSnapshot(`
    Array [
      Object {
        "amount": 123,
        "date": "1970-01-01T00:00:00.002Z",
        "id": "order-3",
        "name": "plan",
      },
      Object {
        "amount": 123,
        "date": "1970-01-01T00:00:00.001Z",
        "id": "order-2",
        "name": "plan",
      },
    ]
  `);
});
