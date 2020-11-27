import { completeCourseOrder } from '../../src/contracts/order/completeCourseOrder';

import { CourseActivationCodeEntity } from '../../src/entities/CourseActivationCodeEntity';
import { CourseEntity } from '../../src/entities/CourseEntity';
import { OrderEntity } from '../../src/entities/OrderEntity';
import { resetDb } from '../helper';
import { getCustomerData } from '../seed-data';

jest.mock('../../src/dispatch');

const courseId = 'course-1';
const orderId = 'order-abc';

beforeEach(async () => {
  await resetDb();

  await Promise.all([
    new CourseEntity({
      courseId: courseId,
      description: 'This is a Promo Course',
      name: 'Promo Course',
      price: 200,
      promoPrice: 200,
      promoEnds: 1,
    }).insert(),
    new OrderEntity({
      priceNet: 1000,
      priceTotal: 1230,
      quantity: 5,
      vat: 230,
      vatRate: 0.23,
      createdAt: 1,
      customer: getCustomerData(),
      orderId: orderId,
      product: {
        courseId: courseId,
        type: 'course',
      },
      provider: {
        name: 'tpay',
        paymentUrl: 'url',
        transactionId: 't-123',
      },
      status: 'PAID',
    }).insert(),
    new CourseActivationCodeEntity({
      code: 'c1',
      courseId,
      orderId,
      index: 1,
    }).insert(),
    new CourseActivationCodeEntity({
      code: 'c2',
      courseId,
      orderId,
      index: 2,
    }).insert(),
    new CourseActivationCodeEntity({
      code: 'c4',
      courseId,
      orderId,
      index: 4,
    }).insert(),
  ]);
});

it('complete order if some codes already exists', async () => {
  await completeCourseOrder('order-abc');

  const codeEntities = await CourseActivationCodeEntity.getAllByOrderId(
    orderId
  );
  const codes = codeEntities.sort((a, b) => a.index - b.index).map(x => x.code);
  expect(codes[0]).toEqual('c1');
  expect(codes[1]).toEqual('c2');
  expect(codes[3]).toEqual('c4');
});
