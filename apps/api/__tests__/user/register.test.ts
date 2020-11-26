import { register } from '../../src/contracts/user/register';
import { CourseActivationCodeEntity } from '../../src/entities/CourseActivationCodeEntity';
import { execContract, resetDb } from '../helper';

jest.mock('../../src/dispatch');

beforeEach(async () => {
  await resetDb();
  await Promise.all([
    new CourseActivationCodeEntity({
      code: 'a123',
      courseId: 'c1',
      orderId: 'o1',
    }).insert(),
    new CourseActivationCodeEntity({
      code: 'b123',
      courseId: 'c1',
      orderId: 'o2',
    }).insert(),
  ]);
});

describe('validation', () => {
  const validEmail = 'user@example.com';
  const validPassword = 'password';
  const validCode = 'a123';

  test.each([
    [
      {
        email: 'a',
        password: validPassword,
        activationCode: validCode,
      },
      "Validation error: 'values.email' must a valid email.",
    ],
    [
      {
        email: validEmail,
        password: 'a',
        activationCode: validCode,
      },
      "Validation error: 'values.password' length must be at least 5 characters long.",
    ],
    [
      {
        email: validEmail,
        password: validPassword,
        activationCode: '',
      },
      "Validation error: 'values.activationCode' is required.",
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
      activationCode: 'a123',
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
      activationCode: 'a123',
    },
  });
  await expect(
    execContract(register, {
      values: {
        email: 'useR1@example.com',
        password: 'password',
        activationCode: 'b123',
      },
    })
  ).rejects.toThrow('Email is already registered');
});

it('should throw an error if activation code is invalid', async () => {
  await expect(
    execContract(register, {
      values: {
        email: 'user1@example.com',
        password: 'password',
        activationCode: 'aaa',
      },
    })
  ).rejects.toThrow('invalid activation code');
});

it('should throw an error if activation code is used', async () => {
  await execContract(register, {
    values: {
      email: 'user1@example.com',
      password: 'password',
      activationCode: 'a123',
    },
  });
  await expect(
    execContract(register, {
      values: {
        email: 'user2@example.com',
        password: 'password',
        activationCode: 'a123',
      },
    })
  ).rejects.toThrow('invalid activation code');
});
