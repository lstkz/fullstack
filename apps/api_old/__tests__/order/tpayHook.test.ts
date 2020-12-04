import { mocked } from 'ts-jest/utils';
import { tpayHook } from '../../src/contracts/order/tpayHook';
import { dispatch } from '../../src/dispatch';
import { OrderEntity } from '../../src/entities/OrderEntity';
import { execContract, resetDb } from '../helper';
import { getCustomerData, getTPayHookData } from '../seed-data';

jest.mock('../../src/dispatch');

const mockedDispatch = mocked(dispatch);

beforeEach(async () => {
  await resetDb();
  const order = new OrderEntity({
    priceNet: 1000,
    priceTotal: 1230,
    quantity: 1,
    vat: 230,
    vatRate: 0.23,
    createdAt: 1,
    customer: getCustomerData(),
    orderId: 'order-abc',
    product: {
      courseId: 'course-1',
      type: 'course',
    },
    provider: {
      name: 'tpay',
      paymentUrl: 'url',
      transactionId: 't-123',
    },
    status: 'NOT_PAID',
  });
  await order.insert();
  mockedDispatch.mockReset();
});

it('should throw an error if md5sum invalid', async () => {
  await expect(
    execContract(tpayHook, {
      values: { ...getTPayHookData(), md5sum: 'abc' },
    })
  ).rejects.toThrow('Invalid md5sum');
});

it('should throw an error if not fully paid', async () => {
  await expect(
    execContract(tpayHook, {
      values: { ...getTPayHookData(), tr_paid: '20' },
    })
  ).rejects.toThrow('Not fully paid');
});

it('should ignore if status is FALSE', async () => {
  await execContract(tpayHook, {
    values: { ...getTPayHookData(), tr_status: 'FALSE' },
  });
  const order = await OrderEntity.getByKey({ orderId: 'order-abc' });
  expect(order.status).toEqual('NOT_PAID');
  expect(mockedDispatch).not.toHaveBeenCalled();
});

it('should ignore if tr_error is defined', async () => {
  await execContract(tpayHook, {
    values: { ...getTPayHookData(), tr_error: 'some error' },
  });
  const order = await OrderEntity.getByKey({ orderId: 'order-abc' });
  expect(order.status).toEqual('NOT_PAID');
  expect(mockedDispatch).not.toHaveBeenCalled();
});

it('should process successfully', async () => {
  await Promise.all([
    execContract(tpayHook, {
      values: getTPayHookData(),
    }),
    execContract(tpayHook, {
      values: getTPayHookData(),
    }),
  ]);
  const order = await OrderEntity.getByKey({ orderId: 'order-abc' });
  expect(order.status).toEqual('PAID');
  expect(order.paidAt).toBeDefined();
  expect(mockedDispatch).toHaveBeenCalledTimes(1);
});
