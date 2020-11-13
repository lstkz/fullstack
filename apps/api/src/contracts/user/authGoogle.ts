import { S } from 'schema';
import { createContract, createRpcBinding } from '../../lib';
import { getEmail } from '../../common/google';
import { _createUser } from './_createUser';
import { randomUniqString } from '../../common/helper';
import { _generateAuthData } from './_generateAuthData';
import { UserEmailEntity } from '../../entities/UserEmailEntity';
import { UserEntity } from '../../entities/UserEntity';
import { AuthData } from 'shared';
import { AppError } from '../../common/errors';

export const authGoogle = createContract('user.authGoogle')
  .params('autoConnect', 'accessToken')
  .schema({
    autoConnect: S.boolean(),
    accessToken: S.string(),
  })
  .returns<AuthData>()
  .fn(async (autoConnect, accessToken) => {
    const email = await getEmail(accessToken);
    const userEmail = await UserEmailEntity.getByKeyOrNull({ email });
    if (userEmail) {
      const user = await UserEntity.getByKey({ userId: userEmail.userId });
      return _generateAuthData(user);
    }
    if (!autoConnect) {
      throw new AppError('User is not registered');
    }
    const createdUser = await _createUser({
      email,
      password: randomUniqString(),
      isVerified: true,
    });
    return _generateAuthData(createdUser);
  });

export const authGoogleRpc = createRpcBinding({
  public: true,
  signature: 'user.authGoogle',
  handler: authGoogle,
});
