import { S } from 'schema';
import { AuthData } from 'shared';
import { AppError } from '../../common/errors';
import { getEmail } from '../../common/google';
import { UserEntity } from '../../entities/UserEntity';
import { createContract, createRpcBinding } from '../../lib';
import { _generateAuthData } from './_generateAuthData';

export const googleLogin = createContract('user.googleLogin')
  .params('accessToken')
  .schema({
    accessToken: S.string(),
  })
  .returns<AuthData>()
  .fn(async accessToken => {
    const email = await getEmail(accessToken);
    const user = await UserEntity.getUserByEmailOrNull(email);
    if (!user) {
      throw new AppError('User is not registered');
    }
    return _generateAuthData(user);
  });

export const googleLoginRpc = createRpcBinding({
  public: true,
  signature: 'user.googleLogin',
  handler: googleLogin,
});
