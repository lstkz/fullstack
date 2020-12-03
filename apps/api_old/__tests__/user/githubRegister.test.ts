import { mocked } from 'ts-jest/utils';
import { exchangeCode, getUserData } from '../../src/common/github';
import { _createUser } from '../../src/contracts/user/_createUser';
import { execContract, resetDb } from '../helper';
import { CourseActivationCodeEntity } from '../../src/entities/CourseActivationCodeEntity';
import { githubRegister } from '../../src/contracts/user/githubRegister';

jest.mock('../../src/common/github');

const mockedExchangeCode = mocked(exchangeCode);
const mockedGetUserData = mocked(getUserData);

beforeEach(async () => {
  await resetDb();
  await new CourseActivationCodeEntity({
    code: 'a123',
    courseId: 'c1',
    orderId: 'o1',
    index: 1,
  }).insert();
  mockedExchangeCode.mockImplementation(async () => '123');
  mockedGetUserData.mockImplementation(async () => ({
    email: 'new-user1@example.com',
    id: 123,
    username: 'git123',
  }));
});

it('should register successfully', async () => {
  const ret = await execContract(githubRegister, {
    activationCode: 'a123',
    code: 'abc',
  });
  expect(ret.user.email).toEqual('new-user1@example.com');
});

it('should throw an error if invalid code', async () => {
  await expect(
    execContract(githubRegister, {
      activationCode: 'a',
      code: 'abc',
    })
  ).rejects.toThrowError('invalid activation code');
});

it('should throw an error if already registered code', async () => {
  await _createUser({
    email: 'aa',
    isVerified: true,
    password: 'a',
    githubId: 123,
    userId: 'user1',
  });
  await expect(
    execContract(githubRegister, {
      activationCode: 'a',
      code: 'abc',
    })
  ).rejects.toThrowError('User is already registered');
});
