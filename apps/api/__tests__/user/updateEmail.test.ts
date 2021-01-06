import { execContract, setupDb } from '../helper';
import { registerSampleUsers } from '../seed-data';
import { _createUser } from '../../src/contracts/user/_createUser';
import { updateEmail } from '../../src/contracts/user/updateEmail';
import { login } from '../../src/contracts/user/login';

setupDb();

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

it('should update email successfully', async () => {
  await execContract(
    updateEmail,
    {
      newEmail: 'newEmail@example.com',
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
