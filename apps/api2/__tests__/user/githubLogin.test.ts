import { mocked } from 'ts-jest/utils';
import { exchangeCode, getUserData } from '../../src/common/github';
import { _createUser } from '../../src/contracts/user/_createUser';
import { execContract, getId, setupDb } from '../helper';
import { githubLogin } from '../../src/contracts/user/githubLogin';

jest.mock('../../src/common/github');

const mockedExchangeCode = mocked(exchangeCode);
const mockedGetUserData = mocked(getUserData);

setupDb();

beforeAll(async () => {
  mockedExchangeCode.mockImplementation(async () => '123');
});

it('should login successfully', async () => {
  await _createUser({
    userId: getId(1),
    email: 'user1@example.com',
    password: 'pass',
    githubId: 123,
    isVerified: true,
  });

  mockedGetUserData.mockImplementation(async () => ({
    email: 'new-user1@example.com',
    id: 123,
    username: 'git123',
  }));

  const ret = await execContract(githubLogin, {
    code: 'abc',
  });
  expect(ret.user.id).toContain(getId(1));
});

it('should throw an error if not registered', async () => {
  mockedGetUserData.mockImplementation(async () => ({
    email: 'user1@example.com',
    id: 123,
    username: 'git123',
  }));

  await expect(
    execContract(githubLogin, {
      code: 'abc',
    })
  ).rejects.toThrowError('User is not registered');
});
