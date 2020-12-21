import { AccessTokenCollection } from '../../collections/AccessToken';
import { UserCollection } from '../../collections/User';
import { UnauthorizedError } from '../../common/errors';
import { AppUser } from '../../types';

export async function _getAppUser(token: string): Promise<AppUser> {
  const tokenEntity = await AccessTokenCollection.findOne({
    _id: token,
  });
  if (!tokenEntity) {
    throw new UnauthorizedError('invalid token');
  }
  const user = await UserCollection.findByIdOrThrow(tokenEntity.userId);
  return {
    _id: user._id,
    email: user.email,
    isVerified: user.isVerified,
    hasSubscription: user.hasSubscription ?? false,
  };
}
