import { SubscriptionOrderCollection } from '../../src/collections/SubscriptionOrder';
import { checkStatus } from '../../src/contracts/subscription/checkStatus';
import { execContract, getId, setupDb } from '../helper';
import { getCustomerData, getPrice, registerSampleUsers } from '../seed-data';

setupDb();

beforeEach(async () => {
  await registerSampleUsers();
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

it('should return status successfully', async () => {
  const ret = await execContract(
    checkStatus,
    {
      orderId: 'order-abc',
    },
    'user1_token'
  );
  expect(ret).toEqual({ status: 'NOT_PAID' });
});

it('should throw an error if not found (wrong orderId)', async () => {
  await expect(
    execContract(
      checkStatus,
      {
        orderId: 'aaaa',
      },
      'user1_token'
    )
  ).rejects.toThrow('Order not found');
});

it('should throw an error if not found (different user)', async () => {
  await expect(
    execContract(
      checkStatus,
      {
        orderId: 'order-abc',
      },
      'user2_token'
    )
  ).rejects.toThrow('Order not found');
});
