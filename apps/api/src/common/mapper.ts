import { Module, User } from 'shared';
import { ModuleModel } from '../collections/Module';
import { UserModel } from '../collections/User';

export function mapUser(user: UserModel): User {
  return {
    id: user._id.toHexString(),
    email: user.email,
    isVerified: user.isVerified,
    isAdmin: user.isAdmin,
  };
}

export function mapModule(module: ModuleModel): Module {
  return {
    id: module._id,
    name: module.name,
    description: module.description,
  };
}
