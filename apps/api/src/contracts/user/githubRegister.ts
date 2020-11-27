import { S } from 'schema';
import { AuthData } from 'shared';
import { AppError } from '../../common/errors';
import { exchangeCode, getUserData } from '../../common/github';
import { randomUniqString } from '../../common/helper';
import { GithubUserEntity } from '../../entities/GithubUserEntity';
import { createContract, createRpcBinding } from '../../lib';
import { _checkCodeUsed } from '../activation/_checkCodeUsed';
import { _createUser, _createUserWithActivation } from './_createUser';
import { _generateAuthData } from './_generateAuthData';

export const githubRegister = createContract('user.githubRegister')
  .params('code', 'activationCode')
  .schema({
    code: S.string(),
    activationCode: S.string(),
  })
  .returns<AuthData>()
  .fn(async (code, activationCode) => {
    const accessToken = await exchangeCode(code);
    const githubData = await getUserData(accessToken);
    const githubUser = await GithubUserEntity.getByKeyOrNull({
      githubId: githubData.id,
    });
    if (githubUser) {
      throw new AppError('User is already registered');
    }
    return _createUserWithActivation(activationCode, {
      email: githubData.email,
      githubId: githubData.id,
      password: randomUniqString(),
      isVerified: true,
    });
  });

export const githubRegisterRpc = createRpcBinding({
  public: true,
  signature: 'user.githubRegister',
  handler: githubRegister,
});
