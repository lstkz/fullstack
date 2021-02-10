import { mocked } from 'ts-jest/utils';
import { _createUser } from '../../src/contracts/user/_createUser';
import { execContract, getId, setupDb } from '../helper';
import { googleRegister } from '../../src/contracts/user/googleRegister';
import { getEmail } from '../../src/common/google';

jest.mock('../../src/common/google');
jest.mock('../../src/dispatch');

const mockedGetEmail = mocked(getEmail);

setupDb();

beforeAll(async () => {
  mockedGetEmail.mockImplementation(async () => 'user1@example.com');
});

it('should register successfully', async () => {
  const ret = await execContract(googleRegister, {
    accessToken: 'abc',
    subscribeNewsletter: true,
  });
  expect(ret.user.email).toEqual('user1@example.com');
});

it('should throw an error if already registered code', async () => {
  await _createUser({
    email: 'user1@example.com',
    isVerified: true,
    password: 'a',
    githubId: 123,
    userId: getId(1),
  });
  await expect(
    execContract(googleRegister, {
      accessToken: 'abc',
      subscribeNewsletter: true,
    })
  ).rejects.toThrowError('User is already registered');
});
