import { createBaseEntity } from '../lib';

export interface ConfirmCodeKey {
  code: string;
}

export interface ConfirmCodeProps extends ConfirmCodeKey {
  userId: string;
  expiresAt: number;
}

const BaseEntity = createBaseEntity('confirm_code')
  .props<ConfirmCodeProps>()
  .key<ConfirmCodeKey>(key => `$:${key.code}`)
  .build();

export class ConfirmCodeEntity extends BaseEntity {}
