import { createBaseEntity } from '../lib';

export interface SubscriptionRemovedKey {
  id: string;
}

export interface SubscriptionRemovedProps extends SubscriptionRemovedKey {
  email: string;
  source: string;
  createdAt: number;
}

const BaseEntity = createBaseEntity('subscription_removed')
  .props<SubscriptionRemovedProps>()
  .key<SubscriptionRemovedKey>(key => `$:${key.id}`)
  .build();

export class SubscriptionRemovedEntity extends BaseEntity {}
