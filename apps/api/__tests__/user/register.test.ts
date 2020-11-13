import { register } from '../../src/contracts/user/register';
import { execContract, resetDb } from '../helper';

jest.mock('../../src/dispatch');

beforeEach(async () => {
  await resetDb();
});

describe('validation', () => {
  const validEmail = 'user@example.com';
  const validPassword = 'password';

  test.each([
    [
      {
        email: 'a',
        password: validPassword,
      },
      "Validation error: 'values.email' must a valid email.",
    ],
    [
      {
        email: validEmail,
        password: 'a',
      },
      "Validation error: 'values.password' length must be at least 5 characters long.",
    ],
  ] as const)(
    '.register(%p) should throw `%s`',
    async (input, errorMessage) => {
      await expect(register(input)).rejects.toThrow(errorMessage);
    }
  );
});

it('register user successfully', async () => {
  const { user, token } = await execContract(register, {
    values: {
      email: 'user1@example.com',
      password: 'password',
    },
  });
  expect(token).toBeDefined();
  expect(user.id).toBeDefined();
  expect(user.email).toEqual('user1@example.com');
});

it('throw error if email is taken', async () => {
  await execContract(register, {
    values: {
      email: 'user1@example.com',
      password: 'password',
    },
  });
  const promise = execContract(register, {
    values: {
      email: 'useR1@example.com',
      password: 'password',
    },
  });
  await expect(promise).rejects.toThrow('Email is already registered');
});
