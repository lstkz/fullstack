import { S } from 'schema';
import { User } from 'shared';
import { createContract, createRpcBinding } from '../../lib';

export const getMe = createContract('user.getMe')
  .params('user')
  .schema({
    user: S.object().appUser(),
  })
  .returns<User>()
  .fn(async user => {
    return {
      id: user._id.toHexString(),
      email: user.email,
      isVerified: user.isVerified,
    };
  });

export const getMeRpc = createRpcBinding({
  injectUser: true,
  signature: 'user.getMe',
  handler: getMe,
});
