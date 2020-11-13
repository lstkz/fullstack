import { AuthData } from 'shared';
import { UserEntity } from '../../entities/UserEntity';
import { createToken } from './createToken';

export async function _generateAuthData(user: UserEntity): Promise<AuthData> {
  return {
    user: user.toUser(),
    token: await createToken(user.userId, null),
  };
}
