import { createBaseEntity } from '../lib';

export interface TokenKey {
  token: string;
}

export interface TokenProps extends TokenKey {
  userId: string;
}

const BaseEntity = createBaseEntity('token')
  .props<TokenProps>()
  .key<TokenKey>(key => `$:${key.token}`)
  .build();

export class TokenEntity extends BaseEntity {}
