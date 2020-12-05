import { execContract, initDb, resetDb } from '../helper';
import { SES } from 'aws-sdk';
import { login } from '../../src/contracts/user/login';
import { confirmResetPassword } from '../../src/contracts/user/confirmResetPassword';
import { ses } from '../../src/lib';
import { resetPassword } from '../../src/contracts/user/resetPassword';
import { registerSampleUsers } from '../seed-data';
import { disconnect } from '../../src/db';

let resetCode = '';

beforeAll(initDb);

beforeEach(resetDb);

afterAll(disconnect);

beforeEach(async () => {
  await resetDb();
  await registerSampleUsers();
  const sendEmailMock: any = (params: SES.Types.SendEmailRequest) => ({
    promise: () => {
      resetCode = /reset-password\/([^"]+)/.exec(
        params.Message.Body.Html!.Data
      )![1];
      return Promise.resolve();
    },
  });
  jest.spyOn(ses, 'sendEmail').mockImplementation(sendEmailMock);
});

it('reset password by email', async () => {
  await execContract(resetPassword, {
    email: 'user1@example.com',
  });
  await execContract(confirmResetPassword, {
    code: resetCode,
    newPassword: 'new-pass',
  });
  await execContract(login, {
    values: { email: 'user1@example.com', password: 'new-pass' },
  });
});

it('expired code', async () => {
  await execContract(resetPassword, {
    email: 'user1@example.com',
  });
  Date.now = () => new Date(3000, 1, 1).getTime();
  await expect(
    execContract(confirmResetPassword, {
      code: resetCode,
      newPassword: 'new-pass',
    })
  ).rejects.toThrow('Expired code');
});
