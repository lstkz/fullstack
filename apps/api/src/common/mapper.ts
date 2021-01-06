import { User } from 'shared';
import { UserModel } from '../collections/User';

export function mapUser(user: UserModel): User {
  return {
    id: user._id.toHexString(),
    email: user.email,
    isVerified: user.isVerified,
    isAdmin: user.isAdmin,
    hasSubscription: user.hasSubscription ?? false,
  };
}
