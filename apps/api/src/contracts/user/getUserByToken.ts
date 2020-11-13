import { createContract } from '../../lib';
import { S } from 'schema';
import { TokenEntity } from '../../entities/TokenEntity';
import { UserEntity } from '../../entities/UserEntity';
import { User } from 'shared';

export const getUserByToken = createContract('user.getUserByToken')
  .params('token')
  .schema({
    token: S.string(),
  })
  .returns<User | null>()
  .fn(async token => {
    const tokenEntity = await TokenEntity.getByKeyOrNull({ token });
    if (!tokenEntity) {
      return null;
    }
    const user = await UserEntity.getByKey({ userId: tokenEntity.userId });
    return user.toUser();
  });
