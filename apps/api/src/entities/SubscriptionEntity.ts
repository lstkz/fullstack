import { createBaseEntity } from '../lib';

export interface SubscriptionKey {
  email: string;
}

export interface SubscriptionProps extends SubscriptionKey {
  name: string;
  email: string;
}

const BaseEntity = createBaseEntity('subscription')
  .props<SubscriptionProps>()
  .key<SubscriptionKey>(key => ({
    pk: `$:${key.email}`,
    sk: '$',
  }))
  .build();

export class SubscriptionEntity extends BaseEntity {}
