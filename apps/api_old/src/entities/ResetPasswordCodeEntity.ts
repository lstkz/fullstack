import { createBaseEntity } from '../lib';

export interface ResetPasswordCodeKey {
  code: string;
}

export interface ResetPasswordCodeProps extends ResetPasswordCodeKey {
  userId: string;
  expireAt: number;
}

const BaseEntity = createBaseEntity('reset_password_code')
  .props<ResetPasswordCodeProps>()
  .key<ResetPasswordCodeKey>(key => `$:${key.code}`)
  .build();

export class ResetPasswordCodeEntity extends BaseEntity {}
