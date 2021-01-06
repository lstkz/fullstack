import { S } from 'schema';
import { getPasswordSchema } from 'shared';
import { UserCollection } from '../../collections/User';
import { createPasswordHash } from '../../common/helper';
import { createContract, createRpcBinding } from '../../lib';

export const updatePassword = createContract('user.updatePassword')
  .params('user', 'password')
  .schema({
    user: S.object().appUser(),
    password: getPasswordSchema(),
  })
  .returns<void>()
  .fn(async (appUser, password) => {
    const user = await UserCollection.findByIdOrThrow(appUser._id);
    const hash = await createPasswordHash(password, user.salt);
    user.password = hash;
    await UserCollection.update(user, ['password']);
  });

export const updatePasswordRpc = createRpcBinding({
  injectUser: true,
  signature: 'user.updatePassword',
  handler: updatePassword,
});
