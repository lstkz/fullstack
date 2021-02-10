import { S } from 'schema';
import { ConfirmEmailChangeCollection } from '../../collections/ConfirmEmailChange';
import { UserCollection } from '../../collections/User';
import { AppError } from '../../common/errors';
import { createContract, createRpcBinding } from '../../lib';

export const confirmNewEmail = createContract('user.confirmNewEmail')
  .params('user', 'code')
  .schema({
    user: S.object().appUser(),
    code: S.string(),
  })
  .fn(async (user, code) => {
    const emailChange = await ConfirmEmailChangeCollection.findById(code);
    if (!emailChange) {
      throw new AppError('Invalid code');
    }
    if (!emailChange.userId.equals(user._id)) {
      throw new AppError('Invalid code');
    }
    const existing = await UserCollection.findOneByEmail(emailChange.newEmail);
    if (existing) {
      throw new AppError('Cannot change email. Email taken by another user.');
    }
    await UserCollection.findOneAndUpdate(
      {
        _id: user._id,
      },
      {
        $set: {
          email: emailChange.newEmail,
          email_lowered: emailChange.newEmail.toLowerCase(),
        },
      }
    );
  });

export const confirmNewEmailRpc = createRpcBinding({
  injectUser: true,
  signature: 'user.confirmNewEmail',
  handler: confirmNewEmail,
});
