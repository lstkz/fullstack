import { execContract, resetDb } from '../helper';
import { login } from '../../src/contracts/user/login';
import { registerSampleUsers } from '../seed-data';

beforeEach(async () => {
  await resetDb();
  await registerSampleUsers();
});

it('email not found', async () => {
  await expect(
    execContract(login, {
      values: {
        email: 'unknown@example.com',
        password: 'password1',
      },
    })
  ).rejects.toThrowError('Invalid credentials or user not found');
});

it('password invalid', async () => {
  const promise = execContract(login, {
    values: {
      email: 'user1@example.com',
      password: '12345qwe',
    },
  });
  await expect(promise).rejects.toThrowError(
    'Invalid credentials or user not found'
  );
});

it('login successfully', async () => {
  const { user, token } = await execContract(login, {
    values: {
      email: 'user1@example.com',
      password: 'password1',
    },
  });
  expect(token).toBeDefined();
  expect(user.id).toBeDefined();
  expect(user.email).toEqual('user1@example.com');
});
