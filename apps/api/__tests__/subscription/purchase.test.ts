import { mocked } from 'ts-jest/utils';
import { PromoCodeCollection } from '../../src/collections/PromoCode';
import { SubscriptionOrderCollection } from '../../src/collections/SubscriptionOrder';
import { createTPayTransaction, getTPayGroups } from '../../src/common/tpay';
import { purchase } from '../../src/contracts/subscription/purchase';
import { execContract, setupDb } from '../helper';
import {
  createSubscriptionPlans,
  getCustomerData,
  registerSampleUsers,
} from '../seed-data';

jest.mock('../../src/common/tpay');

const mockedGetTPayGroups = mocked(getTPayGroups);
const mockedCreateTPayTransaction = mocked(createTPayTransaction);

setupDb();

beforeEach(async () => {
  await registerSampleUsers();
  await createSubscriptionPlans();
  mockedGetTPayGroups.mockClear();
  mockedGetTPayGroups.mockImplementation(async () => [
    {
      id: 100,
      name: 'bank 100',
      banks: '',
      img: 'img',
      main_bank_id: 100,
    },
    {
      id: 101,
      name: 'bank 101',
      banks: '',
      img: 'img',
      main_bank_id: 101,
    },
  ]);
  mockedCreateTPayTransaction.mockClear();
  mockedCreateTPayTransaction.mockImplementation(async () => ({
    id: 'T-123',
    url: 'https://example.org/pay/T-123',
  }));
});

it('should throw an error if group invalid', async () => {
  await expect(
    execContract(
      purchase,
      {
        values: {
          subscriptionPlanId: 'p1',
          tpayGroup: 1234,
          customer: getCustomerData(),
        },
      },
      'user1_token'
    )
  ).rejects.toThrow('Invalid group');
});

it('should throw an error if invalid promo code', async () => {
  await expect(
    execContract(
      purchase,
      {
        values: {
          subscriptionPlanId: 'p1',
          tpayGroup: 100,
          customer: getCustomerData(),
          promoCode: '12345',
        },
      },
      'user1_token'
    )
  ).rejects.toThrow('Promo code not found');
});

it('should purchase successfully', async () => {
  const result = await execContract(
    purchase,
    {
      values: {
        subscriptionPlanId: 'p1',
        tpayGroup: 100,
        customer: getCustomerData(),
      },
    },
    'user1_token'
  );
  expect(result).toEqual({
    paymentUrl: 'https://example.org/pay/T-123',
  });
  const options = mockedCreateTPayTransaction.mock.calls[0][0];
  expect(options).toHaveProperty('amount', 123);
  expect(options).toHaveProperty('group', 100);
  expect(options).toHaveProperty('name', 'John Doe');
  expect(options).toHaveProperty('email', 'user1@example.com');
  const orderId = options.crc;
  const order = await SubscriptionOrderCollection.findByIdOrThrow(orderId);
  expect(order.planId).toEqual('p1');
  expect(order.price).toEqual({
    net: 100,
    vatRate: 23,
    vat: 23,
    total: 123,
  });
});

it('should purchase successfully with promo code', async () => {
  await PromoCodeCollection.insertOne({ _id: 'code123', discount: 50 });
  await execContract(
    purchase,
    {
      values: {
        subscriptionPlanId: 'p1',
        tpayGroup: 100,
        customer: getCustomerData(),
        promoCode: 'code123',
      },
    },
    'user1_token'
  );
  const options = mockedCreateTPayTransaction.mock.calls[0][0];
  expect(options).toHaveProperty('amount', 61.5);
  const orderId = options.crc;
  const order = await SubscriptionOrderCollection.findByIdOrThrow(orderId);
  expect(order.planId).toEqual('p1');
  expect(order.price).toEqual({
    net: 50,
    vatRate: 23,
    vat: 11.5,
    total: 61.5,
  });
});
