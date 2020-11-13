import { mocked } from 'ts-jest/utils';
import { getEmail } from '../../src/common/google';
import { _createUser } from '../../src/contracts/user/_createUser';
import { authGoogle } from '../../src/contracts/user/authGoogle';
import { execContract, resetDb } from '../helper';

jest.mock('../../src/common/google');

const mockedGetEmail = mocked(getEmail);

beforeEach(resetDb);

it('return auth data for connected user', async () => {
  await _createUser({
    userId: '1',
    email: 'user1@example.com',
    password: 'pass',
    isVerified: true,
  });

  mockedGetEmail.mockImplementation(async () => 'user1@example.com');

  const ret = await execContract(authGoogle, {
    autoConnect: true,
    accessToken: 'abc',
  });
  expect(ret.user.id).toEqual('1');
});

it('register a new user', async () => {
  mockedGetEmail.mockImplementation(async () => 'user1@example.com');

  const ret = await execContract(authGoogle, {
    autoConnect: true,
    accessToken: 'abc',
  });
  expect(ret.user.email).toEqual('user1@example.com');
});

it('should throw an error if autoConnect is false and not registered', async () => {
  mockedGetEmail.mockImplementation(async () => 'user1@example.com');

  await expect(
    execContract(authGoogle, {
      autoConnect: false,
      accessToken: 'abc',
    })
  ).rejects.toThrowError('User is not registered');
});
