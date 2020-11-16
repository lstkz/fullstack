import { S } from 'schema';
import { createContract, createRpcBinding } from '../../lib';
import { _createUser } from './_createUser';
import { _generateAuthData } from './_generateAuthData';
import { AppError } from '../../common/errors';
import { randomUniqString, getDuration } from '../../common/helper';
import { APP_BASE_URL } from '../../config';
import { UserEntity } from '../../entities/UserEntity';
import { ResetPasswordCodeEntity } from '../../entities/ResetPasswordCodeEntity';
import { sendEmail } from '../../common/email';

export const resetPassword = createContract('user.resetPassword')
  .params('email')
  .schema({
    email: S.string().trim(),
  })
  .returns<void>()
  .fn(async email => {
    const user = await UserEntity.getUserByEmailOrNull(email);
    if (!user) {
      throw new AppError('User not found');
    }
    const code = randomUniqString();
    const resetPasswordCode = new ResetPasswordCodeEntity({
      code,
      userId: user.userId,
      expireAt: Date.now() + getDuration(1, 'd'),
    });

    await resetPasswordCode.insert();
    const url = `${APP_BASE_URL}/reset-password/${code}`;
    await sendEmail({
      to: user.email,
      subject: 'Reset hasła',
      body: `
        Cześć,
        <br/>
        <br/>
        Otwórz poniższy link, żeby zresetować hasło:
        <br/>
        <a href="${url}">Resetuj hasło</a>
        <br/>
        <br/>
        Fullstack.pl`,
    });
  });

export const resetPasswordRpc = createRpcBinding({
  public: true,
  signature: 'user.resetPassword',
  handler: resetPassword,
});
