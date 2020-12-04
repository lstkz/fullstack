import { createToken } from '../src/contracts/user/createToken';
import { _createUser } from '../src/contracts/user/_createUser';
import { getId } from './helper';

export async function registerSampleUsers(isVerified = true) {
  await Promise.all([
    _createUser({
      userId: getId(1),
      email: 'user1@example.com',
      password: 'password1',
      isVerified: isVerified,
    }).then(() => createToken(getId(1), 'user1_token')),
    _createUser({
      userId: getId(2),
      email: 'user2@example.com',
      password: 'password2',
      isVerified: isVerified,
    }).then(() => createToken(getId(2), 'user2_token')),
  ]);
}
