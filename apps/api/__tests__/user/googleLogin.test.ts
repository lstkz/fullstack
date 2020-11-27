import { mocked } from 'ts-jest/utils';
import { _createUser } from '../../src/contracts/user/_createUser';
import { execContract, resetDb } from '../helper';
import { googleLogin } from '../../src/contracts/user/googleLogin';
import { getEmail } from '../../src/common/google';

jest.mock('../../src/common/google');

const mockedGetEmail = mocked(getEmail);

beforeAll(() => {
  mockedGetEmail.mockImplementation(async () => 'user1@example.com');
});

beforeEach(resetDb);

it('should login successfully', async () => {
  await _createUser({
    userId: '1',
    email: 'user1@example.com',
    password: 'pass',
    githubId: 123,
    isVerified: true,
  });

  const ret = await execContract(googleLogin, {
    accessToken: 'abc',
  });
  expect(ret.user.email).toEqual('user1@example.com');
});

it('should throw an error if not registered', async () => {
  await expect(
    execContract(googleLogin, {
      accessToken: 'abc',
    })
  ).rejects.toThrowError('User is not registered');
});
