import { createBaseEntity } from '../lib';

export interface SubscriptionRequestKey {
  id: string;
}

export interface SubscriptionRequestProps extends SubscriptionRequestKey {
  name?: string | null | undefined;
  email: string;
  unsubscribeCode: string;
}

const BaseEntity = createBaseEntity('subscription_request')
  .props<SubscriptionRequestProps>()
  .key<SubscriptionRequestKey>(key => `$:${key.id}`)
  .build();

export class SubscriptionRequestEntity extends BaseEntity {}
