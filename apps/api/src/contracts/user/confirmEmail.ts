import { S } from 'schema';
import { createContract, createRpcBinding } from '../../lib';
import { AppError } from '../../common/errors';
import { _generateAuthData } from './_generateAuthData';
import { AuthData } from 'shared';
import { ConfirmCodeCollection } from '../../collections/ConfirmCode';
import { UserCollection } from '../../collections/User';

export const confirmEmail = createContract('user.confirmEmail')
  .params('code')
  .schema({
    code: S.string(),
  })
  .returns<AuthData>()
  .fn(async code => {
    const confirmCode = await ConfirmCodeCollection.findById(code);
    if (!confirmCode) {
      throw new AppError('Invalid code');
    }
    const user = await UserCollection.findByIdOrThrow(confirmCode.userId);
    user.isVerified = true;
    await UserCollection.update(user, ['isVerified']);
    return _generateAuthData(user);
  });

export const confirmEmailRpc = createRpcBinding({
  public: true,
  signature: 'user.confirmEmail',
  handler: confirmEmail,
});
