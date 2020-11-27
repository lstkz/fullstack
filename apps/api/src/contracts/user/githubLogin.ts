import { S } from 'schema';
import { AuthData } from 'shared';
import { AppError } from '../../common/errors';
import { exchangeCode, getUserData } from '../../common/github';
import { GithubUserEntity } from '../../entities/GithubUserEntity';
import { UserEntity } from '../../entities/UserEntity';
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
    const githubUser = await GithubUserEntity.getByKeyOrNull({
      githubId: githubData.id,
    });
    if (!githubUser) {
      throw new AppError('User is not registered');
    }
    const user = await UserEntity.getByKey({ userId: githubUser.userId });
    return _generateAuthData(user);
  });

export const githubLoginRpc = createRpcBinding({
  public: true,
  signature: 'user.githubLogin',
  handler: githubLogin,
});
