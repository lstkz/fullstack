import { createBaseEntity } from '../lib';

export interface SubscriptionKey {
  email: string;
}

export interface SubscriptionProps extends SubscriptionKey {
  name: string;
  email: string;
  createdAt: number;
  unsubscribeCode: string;
}

const BaseEntity = createBaseEntity('subscription')
  .props<SubscriptionProps>()
  .key<SubscriptionKey>(key => `$:${key.email.toLowerCase()}`)
  .build();

export class SubscriptionEntity extends BaseEntity {}
