import { S } from 'schema';
import { UserCollection } from '../../collections/User';
import { AppError } from '../../common/errors';
import { createContract, createRpcBinding } from '../../lib';

export const updateEmail = createContract('user.updateEmail')
  .params('user', 'newEmail')
  .schema({
    user: S.object().appUser(),
    newEmail: S.string().email(),
  })
  .returns<void>()
  .fn(async (user, newEmail) => {
    if (user.email.toLowerCase() === newEmail.toLowerCase()) {
      return;
    }
    const existing = await UserCollection.findOneByEmail(newEmail);
    if (existing) {
      throw new AppError('Email already used by another user');
    }
    await UserCollection.findOneAndUpdate(
      {
        _id: user._id,
      },
      {
        $set: {
          email: newEmail,
          email_lowered: newEmail.toLowerCase(),
        },
      }
    );
  });

export const updateEmailRpc = createRpcBinding({
  injectUser: true,
  signature: 'user.updateEmail',
  handler: updateEmail,
});
