import { createBaseEntity } from '../lib';

export interface UserEmailKey {
  email: string;
}

export interface UserEmailProps extends UserEmailKey {
  userId: string;
}

const BaseEntity = createBaseEntity('user_email')
  .props<UserEmailProps>()
  .key<UserEmailKey>(key => `$:${key.email.toLowerCase()}`)
  .build();

export class UserEmailEntity extends BaseEntity {}
