import { createBaseEntity } from '../lib';

export interface UserKey {
  userId: string;
}

export interface UserProps extends UserKey {
  email: string;
  salt: string;
  password: string;
  isAdmin?: boolean;
}

const BaseEntity = createBaseEntity('user')
  .props<UserProps>()
  .key<UserKey>(key => `$:${key.userId}`)
  .build();

export class UserEntity extends BaseEntity {}
