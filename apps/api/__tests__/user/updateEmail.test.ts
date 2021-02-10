import { execContract, setupDb } from '../helper';
import { registerSampleUsers } from '../seed-data';
import { _createUser } from '../../src/contracts/user/_createUser';
import { updateEmail } from '../../src/contracts/user/updateEmail';
import { login } from '../../src/contracts/user/login';
import { dispatchTask } from '../../src/dispatch';
import { mocked } from 'ts-jest/utils';
import { SendEmailTask } from '../../src/types';
import { confirmNewEmail } from '../../src/contracts/user/confirmNewEmail';

setupDb();

jest.mock('../../src/dispatch');

const mocked_dispatchTask = mocked(dispatchTask);

beforeEach(async () => {
  await registerSampleUsers();
});

it('should throw if email taken', async () => {
  await expect(
    execContract(
      updateEmail,
      {
        newEmail: 'useR2@example.com',
      },
      'user1_token'
    )
  ).rejects.toThrow('Email already used by another user');
});

it('should do nothing if the same email', async () => {
  const ret = await execContract(
    updateEmail,
    {
      newEmail: 'useR1@example.com',
    },
    'user1_token'
  );
  expect(ret).toEqual({ ok: false });
  expect(mocked_dispatchTask).not.toBeCalled();
});

it('should update email successfully', async () => {
  await execContract(
    updateEmail,
    {
      newEmail: 'newEmail@example.com',
    },
    'user1_token'
  );
  expect(mocked_dispatchTask).toBeCalled();
  const task = mocked_dispatchTask.mock.calls[0][0] as SendEmailTask;
  expect(task.payload.to).toEqual('newEmail@example.com');
  const codeReg = /\?confirm-new-email=(.*)/;
  const code = codeReg.exec(
    (task.payload.template.params as any).buttonUrl
  )![1];

  await execContract(
    confirmNewEmail,
    {
      code,
    },
    'user1_token'
  );
  const ret = await execContract(login, {
    values: {
      email: 'newemail@example.com',
      password: 'password1',
    },
  });
  expect(ret.user.email).toEqual('newEmail@example.com');
});
