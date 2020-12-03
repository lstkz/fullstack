import { S } from 'schema';
import { createContract, createRpcBinding } from '../../lib';
import { _createUser } from './_createUser';
import { _generateAuthData } from './_generateAuthData';
import { AppError } from '../../common/errors';
import { randomUniqString, getDuration } from '../../common/helper';
import { config } from 'config';
import { dispatchTask } from '../../dispatch';
import {
  ResetPasswordCodeCollection,
  ResetPasswordCodeModel,
} from '../../collections/ResetPasswordCode';
import { UserCollection } from '../../collections/User';

export const resetPassword = createContract('user.resetPassword')
  .params('email')
  .schema({
    email: S.string().trim(),
  })
  .returns<void>()
  .fn(async email => {
    const user = await UserCollection.findOneByEmail(email);
    if (!user) {
      throw new AppError('User not found');
    }
    const code = randomUniqString();
    const resetPasswordCode: ResetPasswordCodeModel = {
      _id: code,
      userId: user._id,
      expireAt: new Date(Date.now() + getDuration(1, 'd')),
    };
    await ResetPasswordCodeCollection.insertOne(resetPasswordCode);
    const url = `${config.appBaseUrl}/reset-password/${code}`;
    await dispatchTask({
      type: 'SendEmail',
      payload: {
        to: user.email,
        subject: 'Reset hasła',
        template: {
          name: 'ButtonAction',
          params: {
            header: 'Reset hasła',
            description: 'Otwórz poniższy link, żeby zresetować hasło',
            buttonText: 'Resetuj hasło',
            buttonUrl: url,
          },
        },
      },
    });
  });

export const resetPasswordRpc = createRpcBinding({
  public: true,
  signature: 'user.resetPassword',
  handler: resetPassword,
});
