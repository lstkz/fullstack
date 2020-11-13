import { createBaseEntity } from '../lib';
import { Transaction } from '../orm/Transaction';

export interface EventKey {
  eventId: string;
}

export interface EventProps extends EventKey {}

const BaseEntity = createBaseEntity('event')
  .props<EventProps>()
  .key<EventKey>(key => `$:${key.eventId}`)
  .build();

export class EventEntity extends BaseEntity {
  static addToTransaction(t: Transaction, eventId: string) {
    const event = new EventEntity({ eventId });
    t.insert(event, {
      conditionExpression: 'attribute_not_exists(pk)',
    });
  }
}
