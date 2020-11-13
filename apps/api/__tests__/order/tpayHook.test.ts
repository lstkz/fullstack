import { mocked } from 'ts-jest/utils';
import { md5 } from '../../src/common/helper';
import { TPAY_CODE, TPAY_CUSTOMER_ID } from '../../src/config';
import { tpayHook } from '../../src/contracts/order/tpayHook';
import { dispatch } from '../../src/dispatch';
import { OrderEntity } from '../../src/entities/OrderEntity';
import { execContract, resetDb } from '../helper';

jest.mock('../../src/dispatch');

const mockedDispatch = mocked(dispatch);

beforeEach(async () => {
  await resetDb();
  const order = new OrderEntity({
    amount: 120,
    createdAt: 1,
    customer: { email: 'john@example.org', firstName: 'john', lastName: 'doe' },
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

function getValues() {
  return {
    id: TPAY_CUSTOMER_ID,
    tr_id: 't-123',
    tr_date: 'date',
    tr_crc: 'order-abc',
    tr_amount: 120,
    tr_paid: 120,
    tr_desc: 'foo',
    tr_status: 'TRUE' as const,
    tr_error: 'none',
    tr_email: 'john@',
    test_mode: '0',
    md5sum: md5(`${TPAY_CUSTOMER_ID}${120}order-abc${TPAY_CODE}`),
  };
}

it('should throw an error if md5sum invalid', async () => {
  await expect(
    execContract(tpayHook, {
      values: { ...getValues(), md5sum: 'abc' },
    })
  ).rejects.toThrow('Invalid md5sum');
});

it('should throw an error if not fully paid', async () => {
  await expect(
    execContract(tpayHook, {
      values: { ...getValues(), tr_paid: 20 },
    })
  ).rejects.toThrow('Not fully paid');
});

it('should ignore if status is FALSE', async () => {
  await execContract(tpayHook, {
    values: { ...getValues(), tr_status: 'FALSE' },
  });
  const order = await OrderEntity.getByKey({ orderId: 'order-abc' });
  expect(order.status).toEqual('NOT_PAID');
  expect(mockedDispatch).not.toHaveBeenCalled();
});

it('should ignore if tr_error is defined', async () => {
  await execContract(tpayHook, {
    values: { ...getValues(), tr_error: 'some error' },
  });
  const order = await OrderEntity.getByKey({ orderId: 'order-abc' });
  expect(order.status).toEqual('NOT_PAID');
  expect(mockedDispatch).not.toHaveBeenCalled();
});

it('should process successfully', async () => {
  await Promise.all([
    execContract(tpayHook, {
      values: getValues(),
    }),
    execContract(tpayHook, {
      values: getValues(),
    }),
  ]);
  const order = await OrderEntity.getByKey({ orderId: 'order-abc' });
  expect(order.status).toEqual('PAID');
  expect(order.paidAt).toBeDefined();
  expect(mockedDispatch).toHaveBeenCalledTimes(1);
});
