import { S } from 'schema';
import { createContract } from '../../lib';
import { AppError } from '../../common/errors';
import { UserCollection } from '../../collections/User';

export const makeAdmin = createContract('user.makeAdmin')
  .params('userId')
  .schema({
    userId: S.string().objectId(),
  })
  .fn(async userId => {
    const user = await UserCollection.findById(userId);
    if (!user) {
      throw new AppError('user not found');
    }
    user.isAdmin = true;
    await UserCollection.update(user, ['isAdmin']);
  });
