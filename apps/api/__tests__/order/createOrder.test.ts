import { mocked } from 'ts-jest/utils';
import { createTPayTransaction, getTPayGroups } from '../../src/common/tpay';
import { createOrder } from '../../src/contracts/order/createOrder';
import { CourseEntity } from '../../src/entities/CourseEntity';
import { OrderEntity } from '../../src/entities/OrderEntity';
import { execContract, resetDb } from '../helper';

jest.mock('../../src/common/tpay');

const mockedGetTPayGroups = mocked(getTPayGroups);
const mockedCreateTPayTransaction = mocked(createTPayTransaction);

async function createCourses() {
  const day = 1000 * 60 * 60 * 24;
  const promoCourse = new CourseEntity({
    courseId: 'promoCourse',
    description: 'This is a Promo Course',
    name: 'Promo Course',
    price: 3000,
    promoPrice: 1000,
    promoEnds: new Date(Date.now() + day).getTime(),
  });

  const nonPromoCourse = new CourseEntity({
    courseId: 'nonPromoCourse',
    description: 'This is a Non-Promo Course',
    name: 'Non-Promo Course',
    price: 3000,
    promoPrice: 1000,
    promoEnds: new Date(Date.now() - day).getTime(),
  });

  await Promise.all([promoCourse.insert(), nonPromoCourse.insert()]);
}

beforeEach(async () => {
  await resetDb();
  await createCourses();
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

function _getCustomer() {
  return {
    email: 'user1@example.org',
    firstName: 'John',
    lastName: 'Doe',
    address: 'address',
    postalCode: 'postalCode',
    city: 'city',
  };
}

it('should throw an error if group invalid', async () => {
  await expect(
    execContract(createOrder, {
      values: {
        quantity: 1,
        requestUnitPriceNet: 1000,
        group: 1234,
        product: {
          type: 'course',
          courseId: 'promoCourse',
        },
        customer: _getCustomer(),
      },
    })
  ).rejects.toThrow('Invalid group');
});

it('should throw an error if course is not found', async () => {
  await expect(
    execContract(createOrder, {
      values: {
        quantity: 1,
        requestUnitPriceNet: 1000,
        group: 100,
        product: {
          type: 'course',
          courseId: 'aaaa',
        },
        customer: _getCustomer(),
      },
    })
  ).rejects.toThrow('Course not found');
});

it('should throw an error if requestUnitPriceNet is invalid', async () => {
  await expect(
    execContract(createOrder, {
      values: {
        quantity: 1,
        requestUnitPriceNet: 123,
        group: 100,
        product: {
          type: 'course',
          courseId: 'promoCourse',
        },
        customer: _getCustomer(),
      },
    })
  ).rejects.toThrow('Invalid requestUnitPriceNet');
});

it('should throw an error if provided promo price when promo ended', async () => {
  await expect(
    execContract(createOrder, {
      values: {
        quantity: 1,
        requestUnitPriceNet: 1000,
        group: 100,
        product: {
          type: 'course',
          courseId: 'nonPromoCourse',
        },
        customer: _getCustomer(),
      },
    })
  ).rejects.toThrow('Promo ended');
});

it('should order promo course', async () => {
  const result = await execContract(createOrder, {
    values: {
      quantity: 1,
      requestUnitPriceNet: 1000,
      group: 100,
      product: {
        type: 'course',
        courseId: 'promoCourse',
      },
      customer: _getCustomer(),
    },
  });
  expect(result).toEqual({
    paymentUrl: 'https://example.org/pay/T-123',
  });
  const options = mockedCreateTPayTransaction.mock.calls[0][0];
  expect(options).toHaveProperty('amount', 1230);
  expect(options).toHaveProperty('group', 100);
  expect(options).toHaveProperty('name', 'John Doe');
  expect(options).toHaveProperty('email', 'user1@example.org');
  const orderId = options.crc;
  const order = await OrderEntity.getByKey({
    orderId,
  });
  expect(order.quantity).toEqual(1);
  expect(order.vatRate).toEqual(0.23);
  expect(order.vat).toEqual(230);
  expect(order.priceNet).toEqual(1000);
  expect(order.priceTotal).toEqual(1230);
});

it('should order non-promo course', async () => {
  await execContract(createOrder, {
    values: {
      quantity: 1,
      requestUnitPriceNet: 3000,
      group: 100,
      product: {
        type: 'course',
        courseId: 'nonPromoCourse',
      },
      customer: _getCustomer(),
    },
  });
  const options = await mockedCreateTPayTransaction.mock.calls[0][0];
  expect(options).toHaveProperty('amount', 3690);
  const orderId = options.crc;
  const order = await OrderEntity.getByKey({
    orderId,
  });
  expect(order.quantity).toEqual(1);
  expect(order.vatRate).toEqual(0.23);
  expect(order.vat).toEqual(690);
  expect(order.priceNet).toEqual(3000);
  expect(order.priceTotal).toEqual(3690);
});

it('should order 10x non-promo course', async () => {
  await execContract(createOrder, {
    values: {
      quantity: 10,
      requestUnitPriceNet: 3000,
      group: 100,
      product: {
        type: 'course',
        courseId: 'nonPromoCourse',
      },
      customer: _getCustomer(),
    },
  });
  const options = await mockedCreateTPayTransaction.mock.calls[0][0];
  expect(options).toHaveProperty('amount', 36900);
  const orderId = options.crc;
  const order = await OrderEntity.getByKey({
    orderId,
  });
  expect(order.quantity).toEqual(10);
  expect(order.vatRate).toEqual(0.23);
  expect(order.vat).toEqual(6900);
  expect(order.priceNet).toEqual(30000);
  expect(order.priceTotal).toEqual(36900);
});
