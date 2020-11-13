import { mocked } from 'ts-jest/utils';
import { exchangeCode, getUserData } from '../../src/common/github';
import { _createUser } from '../../src/contracts/user/_createUser';
import { authGithub } from '../../src/contracts/user/authGithub';
import { execContract, resetDb } from '../helper';

jest.mock('../../src/common/github');

const mockedExchangeCode = mocked(exchangeCode);
const mockedGetUserData = mocked(getUserData);

beforeAll(() => {
  mockedExchangeCode.mockImplementation(async () => '123');
});

beforeEach(resetDb);

it('return auth data for connected user', async () => {
  await _createUser({
    userId: '1',
    email: 'user1@example.com',
    password: 'pass',
    githubId: 123,
    isVerified: true,
  });

  mockedGetUserData.mockImplementation(async () => ({
    email: 'new-email@example.com',
    id: 123,
    username: 'git123',
  }));

  const ret = await execContract(authGithub, {
    autoConnect: true,
    code: 'abc',
  });
  expect(ret.user.id).toEqual('1');
});

it('return auth data for not connected user, but email exists', async () => {
  await _createUser({
    userId: '1',
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

  const ret = await execContract(authGithub, {
    autoConnect: true,
    code: 'abc',
  });
  expect(ret.user.id).toEqual('1');
});

it('throw error if trying to connect by email and already associated with github', async () => {
  await _createUser({
    userId: '1',
    email: 'user1@example.com',
    password: 'pass',
    githubId: 123,
    isVerified: true,
  });

  mockedGetUserData.mockImplementation(async () => ({
    email: 'user1@example.com',
    id: 2234245,
    username: 'git123',
  }));
  await expect(
    execContract(authGithub, {
      autoConnect: true,
      code: 'abc',
    })
  ).rejects.toThrowError(
    'Cannot register a new user. Another user with email user1@example.com is already connected with different GitHub account.'
  );
});

it('register a new user', async () => {
  mockedGetUserData.mockImplementation(async () => ({
    email: 'user1@example.com',
    id: 123,
    username: 'git123',
  }));

  const ret = await execContract(authGithub, {
    autoConnect: true,
    code: 'abc',
  });
  expect(ret.user.email).toEqual('user1@example.com');
});

it('should throw an error if autoConnect is false and not registered', async () => {
  mockedGetUserData.mockImplementation(async () => ({
    email: 'user1@example.com',
    id: 123,
    username: 'git123',
  }));

  await expect(
    execContract(authGithub, {
      autoConnect: false,
      code: 'abc',
    })
  ).rejects.toThrowError('User is not registered');
});
