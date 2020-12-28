import { config } from 'config';
import { S } from 'schema';
import { AuthData } from 'shared';
import { UserCollection } from '../../collections/User';
import { AppError } from '../../common/errors';
import { exchangeCode, getUserData } from '../../common/github';
import { randomUniqString } from '../../common/helper';
import { createContract, createRpcBinding } from '../../lib';
import { _createUser } from './_createUser';
import { _generateAuthData } from './_generateAuthData';

export const githubRegister = createContract('user.githubRegister')
  .params('code')
  .schema({
    code: S.string(),
  })
  .returns<AuthData>()
  .fn(async code => {
    if (config.disableApp) {
      throw new Error('disabled');
    }
    const accessToken = await exchangeCode(code);
    const githubData = await getUserData(accessToken);
    const githubUser = await UserCollection.findOne({
      githubId: githubData.id,
    });
    if (githubUser) {
      throw new AppError('User is already registered');
    }
    const user = await _createUser({
      email: githubData.email,
      githubId: githubData.id,
      password: randomUniqString(),
      isVerified: true,
    });
    return _generateAuthData(user);
  });

export const githubRegisterRpc = createRpcBinding({
  public: true,
  signature: 'user.githubRegister',
  handler: githubRegister,
});
