import { mocked } from 'ts-jest/utils';
import { SubscriptionOrderCollection } from '../../src/collections/SubscriptionOrder';
import { tpayHook } from '../../src/contracts/subscription/tpayHook';
import { dispatchEvent } from '../../src/dispatch';
import { execContract, getId, setupDb } from '../helper';
import { getCustomerData, getPrice, getTPayHookData } from '../seed-data';

jest.mock('../../src/dispatch');

setupDb();

const mockedDispatchEvent = mocked(dispatchEvent);

type ExtractType<T> = T extends (arg: infer U) => any ? U : never;

function execHookContract(values: ExtractType<typeof tpayHook>) {
  return execContract(tpayHook, values as any);
}

beforeEach(async () => {
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
  mockedDispatchEvent.mockReset();
});

it('should throw an error if md5sum invalid', async () => {
  await expect(
    execHookContract({ ...getTPayHookData(), md5sum: 'abc' })
  ).rejects.toThrow('Invalid md5sum');
});

it('should throw an error if not fully paid', async () => {
  await expect(
    execHookContract({
      ...getTPayHookData(),
      tr_paid: '20',
    })
  ).rejects.toThrow('Not fully paid');
});

it('should ignore if status is FALSE', async () => {
  await execHookContract({ ...getTPayHookData(), tr_status: 'FALSE' });
  const order = await SubscriptionOrderCollection.findByIdOrThrow('order-abc');
  expect(order.status).toEqual('NOT_PAID');
  expect(mockedDispatchEvent).not.toHaveBeenCalled();
});

it('should ignore if tr_error is defined', async () => {
  await execHookContract({ ...getTPayHookData(), tr_error: 'some error' });
  const order = await SubscriptionOrderCollection.findByIdOrThrow('order-abc');
  expect(order.status).toEqual('NOT_PAID');
  expect(mockedDispatchEvent).not.toHaveBeenCalled();
});

it('should process successfully', async () => {
  await Promise.all([
    execHookContract(getTPayHookData()),
    execHookContract(getTPayHookData()),
  ]);
  const order = await SubscriptionOrderCollection.findByIdOrThrow('order-abc');
  expect(order.status).toEqual('PAID');
  expect(order.paidAt).toBeDefined();
  expect(mockedDispatchEvent).toHaveBeenCalledTimes(1);
});
