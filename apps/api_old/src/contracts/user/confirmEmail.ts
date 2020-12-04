import { S } from 'schema';
import { createContract, createRpcBinding } from '../../lib';
import { AppError } from '../../common/errors';
import { _generateAuthData } from './_generateAuthData';
import { ConfirmCodeEntity } from '../../entities/ConfirmCodeEntity';
import { UserEntity } from '../../entities/UserEntity';
import { AuthData } from 'shared';

export const confirmEmail = createContract('user.confirmEmail')
  .params('code')
  .schema({
    code: S.string(),
  })
  .returns<AuthData>()
  .fn(async code => {
    const confirmCode = await ConfirmCodeEntity.getByKeyOrNull({ code });
    if (!confirmCode) {
      throw new AppError('Invalid code');
    }
    if (confirmCode.expiresAt < Date.now()) {
      throw new AppError('Expires code');
    }
    const user = await UserEntity.getByKey({ userId: confirmCode.userId });
    user.isVerified = true;
    await user.update(['isVerified']);
    return _generateAuthData(user);
  });

export const confirmEmailRpc = createRpcBinding({
  public: true,
  signature: 'user.confirmEmail',
  handler: confirmEmail,
});
