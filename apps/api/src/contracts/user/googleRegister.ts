import { S } from 'schema';
import { AuthData } from 'shared';
import { AppError } from '../../common/errors';
import { getEmail } from '../../common/google';
import { randomUniqString } from '../../common/helper';
import { UserEntity } from '../../entities/UserEntity';
import { createContract, createRpcBinding } from '../../lib';
import { _createUserWithActivation } from './_createUser';

export const googleRegister = createContract('user.googleRegister')
  .params('accessToken', 'activationCode')
  .schema({
    accessToken: S.string(),
    activationCode: S.string(),
  })
  .returns<AuthData>()
  .fn(async (accessToken, activationCode) => {
    const email = await getEmail(accessToken);
    const user = await UserEntity.getUserByEmailOrNull(email);
    if (user) {
      throw new AppError('User is already registered');
    }
    return _createUserWithActivation(activationCode, {
      email,
      password: randomUniqString(),
      isVerified: true,
    });
  });

export const googleRegisterRpc = createRpcBinding({
  public: true,
  signature: 'user.googleRegister',
  handler: googleRegister,
});
