import { mocked } from 'ts-jest/utils';
import { createTPayTransaction, getTPayGroups } from '../../src/common/tpay';
import { execContract, resetDb } from '../helper';
import { CourseEntity } from '../../src/entities/CourseEntity';
import { createOrder } from '../../src/contracts/order/createOrder';
import { getCustomerData, getTPayHookData } from '../seed-data';
import { tpayHook } from '../../src/contracts/order/tpayHook';
import { ses } from '../../src/lib';
import { SES } from 'aws-sdk';
import { register } from '../../src/contracts/user/register';
import { login } from '../../src/contracts/user/login';

jest.mock('../../src/common/tpay');

const mockedGetTPayGroups = mocked(getTPayGroups);
const mockedCreateTPayTransaction = mocked(createTPayTransaction);

beforeEach(async () => {
  await resetDb();
  const day = 1000 * 60 * 60 * 24;
  const promoCourse = new CourseEntity({
    courseId: 'promoCourse',
    description: 'This is a Promo Course',
    name: 'Promo Course',
    price: 3000,
    promoPrice: 1000,
    promoEnds: new Date(Date.now() + day).getTime(),
  });
  await promoCourse.insert();
  mockedGetTPayGroups.mockClear();
  mockedCreateTPayTransaction.mockClear();
  mockedGetTPayGroups.mockImplementation(async () => [
    {
      id: 100,
      name: 'bank 100',
      banks: '',
      img: 'img',
      main_bank_id: 100,
    },
  ]);
  mockedCreateTPayTransaction.mockImplementation(async () => ({
    id: 'T-123',
    url: 'https://example.org/pay/T-123',
  }));
});

it('buy course and register', async () => {
  let code: string = '';
  const sendEmailMock: any = (params: SES.Types.SendEmailRequest) => ({
    promise: () => {
      const CODE_REGEX = /register\?code=([^"]+)/;
      code = CODE_REGEX.exec(params.Message.Body.Html!.Data)![1];
      return Promise.resolve();
    },
  });
  jest.spyOn(ses, 'sendEmail').mockImplementation(sendEmailMock);

  await execContract(createOrder, {
    values: {
      quantity: 1,
      requestUnitPriceNet: 1000,
      group: 100,
      product: {
        type: 'course',
        courseId: 'promoCourse',
      },
      customer: getCustomerData(),
    },
  });
  const options = mockedCreateTPayTransaction.mock.calls[0][0];
  await execContract(tpayHook, {
    values: getTPayHookData(options.crc),
  });

  expect(code).toBeTruthy();
  const registerRet = await execContract(register, {
    values: {
      activationCode: code,
      email: 'user@example.com',
      password: '123456',
    },
  });
  expect(registerRet.user.email).toEqual('user@example.com');

  const loginRet = await execContract(login, {
    values: {
      email: 'user@example.com',
      password: '123456',
    },
  });
  expect(loginRet.user.email).toEqual('user@example.com');
});

it('buy multiple courses', async () => {
  let codes: string[] = [];
  const sendEmailMock: any = (params: SES.Types.SendEmailRequest) => ({
    promise: () => {
      let m: RegExpExecArray | null;
      const CODE_REGEX = /register\?code=(.*?)"/g;
      do {
        m = CODE_REGEX.exec(params.Message.Body.Html!.Data);
        if (m) {
          codes.push(m![1]);
        }
      } while (m);
      return Promise.resolve();
    },
  });
  jest.spyOn(ses, 'sendEmail').mockImplementation(sendEmailMock);

  await execContract(createOrder, {
    values: {
      quantity: 3,
      requestUnitPriceNet: 1000,
      group: 100,
      product: {
        type: 'course',
        courseId: 'promoCourse',
      },
      customer: getCustomerData(),
    },
  });
  const options = mockedCreateTPayTransaction.mock.calls[0][0];
  await execContract(tpayHook, {
    values: getTPayHookData(options.crc),
  });

  expect(codes).toHaveLength(3);
});
