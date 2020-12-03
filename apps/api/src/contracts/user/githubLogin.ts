import { S } from 'schema';
import { AuthData } from 'shared';
import { UserCollection } from '../../collections/User';
import { AppError } from '../../common/errors';
import { exchangeCode, getUserData } from '../../common/github';
import { createContract, createRpcBinding } from '../../lib';
import { _generateAuthData } from './_generateAuthData';

export const githubLogin = createContract('user.githubLogin')
  .params('code')
  .schema({
    code: S.string(),
  })
  .returns<AuthData>()
  .fn(async code => {
    const accessToken = await exchangeCode(code);
    const githubData = await getUserData(accessToken);
    const user = await UserCollection.findOne({
      githubId: githubData.id,
    });
    if (!user) {
      throw new AppError('User is not registered');
    }
    return _generateAuthData(user);
  });

export const githubLoginRpc = createRpcBinding({
  public: true,
  signature: 'user.githubLogin',
  handler: githubLogin,
});
