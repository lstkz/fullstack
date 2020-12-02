import { mocked } from 'ts-jest/utils';
import { exchangeCode, getUserData } from '../../src/common/github';
import { _createUser } from '../../src/contracts/user/_createUser';
import { execContract, getId, setupDb } from '../helper';
import { githubRegister } from '../../src/contracts/user/githubRegister';

jest.mock('../../src/common/github');

const mockedExchangeCode = mocked(exchangeCode);
const mockedGetUserData = mocked(getUserData);

setupDb();

beforeAll(async () => {
  mockedExchangeCode.mockImplementation(async () => '123');
  mockedGetUserData.mockImplementation(async () => ({
    email: 'new-user1@example.com',
    id: 123,
    username: 'git123',
  }));
});

it('should register successfully', async () => {
  const ret = await execContract(githubRegister, {
    code: 'abc',
  });
  expect(ret.user.email).toEqual('new-user1@example.com');
});

it('should throw an error if already registered code', async () => {
  await _createUser({
    email: 'aa',
    isVerified: true,
    password: 'a',
    githubId: 123,
    userId: getId(1),
  });
  await expect(
    execContract(githubRegister, {
      code: 'abc',
    })
  ).rejects.toThrowError('User is already registered');
});
