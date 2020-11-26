import { dispatch } from '../../src/dispatch';
import { CourseAccessEntity } from '../../src/entities/CourseAccessEntity';
import { OrderEntity } from '../../src/entities/OrderEntity';
import { resetDb } from '../helper';

jest.mock('uuid', () => {
  let next = 1;
  return () => `id-${next++}`;
});

beforeEach(async () => {
  await resetDb();
  const order = new OrderEntity({
    priceNet: 1000,
    priceTotal: 1230,
    quantity: 1,
    vat: 230,
    vatRate: 0.23,
    createdAt: 1,
    customer: {
      email: 'john@example.org',
      firstName: 'john',
      lastName: 'doe',
      address: 'address',
      city: 'city',
      postalCode: 'zip',
    },
    orderId: 'order-abc',
    orderSecret: 'secret-abc',
    product: {
      courseId: 'course-1',
      type: 'course',
    },
    provider: {
      name: 'tpay',
      paymentUrl: 'url',
      transactionId: 't-123',
    },
    status: 'PAID',
    paidAt: 1,
  });
  await order.insert();
});

it('should complete order and create a user', async () => {
  await dispatch({
    type: 'OrderPaidEvent',
    payload: {
      orderId: 'order-abc',
    },
  });
  const access = await CourseAccessEntity.getByKey({
    courseId: 'course-1',
    userId: 'id-1',
  });
  expect(access).toBeDefined();
});
