import { mocked } from 'ts-jest/utils';
import { _createUser } from '../../src/contracts/user/_createUser';
import { execContract, resetDb } from '../helper';
import { CourseActivationCodeEntity } from '../../src/entities/CourseActivationCodeEntity';
import { googleRegister } from '../../src/contracts/user/googleRegister';
import { getEmail } from '../../src/common/google';

jest.mock('../../src/common/google');

const mockedGetEmail = mocked(getEmail);

beforeEach(async () => {
  await resetDb();
  await new CourseActivationCodeEntity({
    code: 'a123',
    courseId: 'c1',
    orderId: 'o1',
    index: 1,
  }).insert();
  mockedGetEmail.mockImplementation(async () => 'user1@example.com');
});

it('should register successfully', async () => {
  const ret = await execContract(googleRegister, {
    activationCode: 'a123',
    accessToken: 'abc',
  });
  expect(ret.user.email).toEqual('user1@example.com');
});

it('should throw an error if invalid code', async () => {
  await expect(
    execContract(googleRegister, {
      activationCode: 'a',
      accessToken: 'abc',
    })
  ).rejects.toThrowError('invalid activation code');
});

it('should throw an error if already registered code', async () => {
  await _createUser({
    email: 'user1@example.com',
    isVerified: true,
    password: 'a',
    githubId: 123,
    userId: 'user1',
  });
  await expect(
    execContract(googleRegister, {
      activationCode: 'a',
      accessToken: 'abc',
    })
  ).rejects.toThrowError('User is already registered');
});
