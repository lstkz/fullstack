import { createBaseEntity } from '../lib';
import { UserEmailEntity } from './UserEmailEntity';

export interface UserKey {
  userId: string;
}

export interface UserProps extends UserKey {
  email: string;
  salt?: string;
  password?: string;
  isAdmin?: boolean;
}

const BaseEntity = createBaseEntity('user')
  .props<UserProps>()
  .key<UserKey>(key => `$:${key.userId}`)
  .build();

export class UserEntity extends BaseEntity {
  static async getUserByEmailOrNull(email: string) {
    const userId = await this.getUserIdByEmailOrNull(email);
    if (!userId) {
      return null;
    }
    return this.getByIdOrNull(userId);
  }

  static async getUserIdByEmailOrNull(email: string) {
    const item = await UserEmailEntity.getByKeyOrNull({
      email: email,
    });
    return item?.userId;
  }

  static getByIdOrNull(userId: string) {
    return this.getByKeyOrNull({ userId });
  }

  static getById(userId: string) {
    return this.getByKey({ userId });
  }
}
