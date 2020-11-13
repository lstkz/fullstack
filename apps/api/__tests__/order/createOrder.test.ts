import { mocked } from 'ts-jest/utils';
import { createTPayTransaction, getTPayGroups } from '../../src/common/tpay';
import { createOrder } from '../../src/contracts/order/createOrder';
import { CourseEntity } from '../../src/entities/CourseEntity';
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
  };
}

it('should throw an error if group invalid', async () => {
  await expect(
    execContract(createOrder, {
      values: {
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

it('should order promo course', async () => {
  const result = await execContract(createOrder, {
    values: {
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
  const options = await mockedCreateTPayTransaction.mock.calls[0][0];
  expect(options).toHaveProperty('amount', 1000);
  expect(options).toHaveProperty('group', 100);
  expect(options).toHaveProperty('name', 'John Doe');
  expect(options).toHaveProperty('email', 'user1@example.org');
});

it('should order non-promo course', async () => {
  await execContract(createOrder, {
    values: {
      group: 100,
      product: {
        type: 'course',
        courseId: 'nonPromoCourse',
      },
      customer: _getCustomer(),
    },
  });
  const options = await mockedCreateTPayTransaction.mock.calls[0][0];
  expect(options).toHaveProperty('amount', 3000);
});
