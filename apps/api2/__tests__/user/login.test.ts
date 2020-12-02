import { execContract, getId, setupDb } from '../helper';
import { login } from '../../src/contracts/user/login';
import { registerSampleUsers } from '../seed-data';
import { _createUser } from '../../src/contracts/user/_createUser';

setupDb();

beforeEach(async () => {
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

it('should log in as non-verified', async () => {
  await _createUser({
    userId: getId(3),
    email: 'user3@example.com',
    password: 'password3',
    isVerified: false,
  });
  const { user } = await execContract(login, {
    values: {
      email: 'user3@example.com',
      password: 'password3',
    },
  });
  expect(user.email).toEqual('user3@example.com');
});
