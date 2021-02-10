import { ObjectID } from 'mongodb';
import { UserCollection } from '../../src/collections/User';
import { register } from '../../src/contracts/user/register';
import { execContract, setupDb } from '../helper';

jest.mock('../../src/dispatch');

setupDb();

describe('validation', () => {
  const validEmail = 'user@example.com';
  const validPassword = 'password';

  test.each([
    [
      {
        email: 'a',
        password: validPassword,
        subscribeNewsletter: true,
      },
      "Validation error: 'values.email' must a valid email.",
    ],
    [
      {
        email: validEmail,
        password: 'a',
        subscribeNewsletter: true,
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
      subscribeNewsletter: true,
    },
  });
  expect(token).toBeDefined();
  expect(user.id).toBeDefined();
  expect(user.isVerified).toEqual(false);
  expect(user.email).toEqual('user1@example.com');
  const latest = await UserCollection.findByIdOrThrow(
    ObjectID.createFromHexString(user.id)
  );
  expect(latest.notifications).toEqual({
    newContent: true,
    newsletter: true,
    webinars: true,
    subscriptionRemainder: true,
  });
});

it('register user successfully without newsletter', async () => {
  const { user, token } = await execContract(register, {
    values: {
      email: 'user1@example.com',
      password: 'password',
      subscribeNewsletter: false,
    },
  });
  expect(token).toBeDefined();
  expect(user.id).toBeDefined();
  expect(user.email).toEqual('user1@example.com');
  const latest = await UserCollection.findByIdOrThrow(
    ObjectID.createFromHexString(user.id)
  );
  expect(latest.notifications).toEqual({
    newContent: false,
    newsletter: false,
    webinars: false,
    subscriptionRemainder: true,
  });
});

it('throw error if email is taken', async () => {
  await execContract(register, {
    values: {
      email: 'user1@example.com',
      password: 'password',
      subscribeNewsletter: true,
    },
  });
  await expect(
    execContract(register, {
      values: {
        email: 'useR1@example.com',
        password: 'password',
        subscribeNewsletter: true,
      },
    })
  ).rejects.toThrow('Email is already registered');
});
