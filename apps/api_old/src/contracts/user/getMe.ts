import { S } from 'schema';
import { User } from 'shared';
import { UserEntity } from '../../entities/UserEntity';
import { createContract, createRpcBinding } from '../../lib';

export const getMe = createContract('user.getMe')
  .params('userId')
  .schema({
    userId: S.string(),
  })
  .returns<User>()
  .fn(async userId => {
    const user = await UserEntity.getByKey({ userId });
    return user.toUser();
  });

export const getMeRpc = createRpcBinding({
  injectUser: true,
  signature: 'user.getMe',
  handler: getMe,
});
