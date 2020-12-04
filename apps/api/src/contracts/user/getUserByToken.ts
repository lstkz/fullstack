import { createContract } from '../../lib';
import { S } from 'schema';
import { User } from 'shared';
import { AccessTokenCollection } from '../../collections/AccessToken';
import { UserCollection } from '../../collections/User';
import { mapUser } from '../../common/mapper';

export const getUserByToken = createContract('user.getUserByToken')
  .params('token')
  .schema({
    token: S.string(),
  })
  .returns<User | null>()
  .fn(async token => {
    const tokenEntity = await AccessTokenCollection.findById(token);
    if (!tokenEntity) {
      return null;
    }
    const user = await UserCollection.findByIdOrThrow(tokenEntity.userId);
    return mapUser(user);
  });
