import { S } from 'schema';
import { AuthData } from 'shared';
import { UserCollection } from '../../collections/User';
import { AppError } from '../../common/errors';
import { getEmail } from '../../common/google';
import { randomUniqString } from '../../common/helper';
import { createContract, createRpcBinding } from '../../lib';
import { _createUser } from './_createUser';
import { _generateAuthData } from './_generateAuthData';

export const googleRegister = createContract('user.googleRegister')
  .params('accessToken')
  .schema({
    accessToken: S.string(),
  })
  .returns<AuthData>()
  .fn(async accessToken => {
    const email = await getEmail(accessToken);
    const existing = await UserCollection.findOneByEmail(email);
    if (existing) {
      throw new AppError('User is already registered');
    }
    const user = await _createUser({
      email,
      password: randomUniqString(),
      isVerified: true,
    });
    return _generateAuthData(user);
  });

export const googleRegisterRpc = createRpcBinding({
  public: true,
  signature: 'user.googleRegister',
  handler: googleRegister,
});
