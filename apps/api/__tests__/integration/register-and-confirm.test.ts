import { SES } from 'aws-sdk';
import { ses } from '../../src/lib';
import { register } from '../../src/contracts/user/register';
import { confirmEmail } from '../../src/contracts/user/confirmEmail';
import { login } from '../../src/contracts/user/login';
import { execContract, resetDb } from '../helper';
import { getMe } from '../../src/contracts/user/getMe';

beforeEach(async () => {
  await resetDb();
});

it('register and confirm email', async () => {
  let code: string = '';

  const sendEmailMock: any = (params: SES.Types.SendEmailRequest) => ({
    promise: () => {
      code = /confirm\/([^"]+)/.exec(params.Message.Body.Html!.Data)![1];
      return Promise.resolve();
    },
  });
  jest.spyOn(ses, 'sendEmail').mockImplementation(sendEmailMock);
  await execContract(register, {
    values: {
      email: 'user1@example.com',
      password: 'password',
    },
  });
  const confirmResult = await execContract(confirmEmail, {
    code,
  });
  expect(confirmResult.user.isVerified).toEqual(true);
  const loginResult = await execContract(login, {
    values: {
      email: 'user1@example.com',
      password: 'password',
    },
  });
  expect(loginResult.user.isVerified).toEqual(true);
  const user = await execContract(getMe, {}, loginResult.token);
  expect(user.email).toEqual('user1@example.com');
});
