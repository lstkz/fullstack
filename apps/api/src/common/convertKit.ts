import { getResponseBody } from './helper';
import { config } from 'config';
import fetch from 'node-fetch';

const BASE_URL = 'https://api.convertkit.com/v3';

type SubscriptionState = 'active' | 'cancelled';

interface Subscriber {
  id: number;
  first_name: string | null;
  email_address: string;
  state: SubscriptionState;
  created_at: string;
  fields: Record<string, any>;
}

interface Subscription {
  id: number;
  state: SubscriptionState;
  created_at: string;
  source: string;
  referrer: string | null;
  subscribable_id: number;
  subscribable_type: string;
  subscriber: {
    id: number;
  };
}

export async function addSubscriberToForm(
  formId: number,
  email: string
): Promise<Subscription> {
  const url = `/forms/${formId}/subscribe?api_key=${config.convertKit.apiKey}`;
  const res = await fetch(BASE_URL + url, {
    method: 'POST',
    body: JSON.stringify({
      email,
    }),
  });
  const body = await getResponseBody('Add subscriber to form', res);
  return body.subscription;
}

export async function getSubscriber(id: number): Promise<Subscriber> {
  const url = `/subscribers/${id}?api_secret=${config.convertKit.apiSecret}`;
  const res = await fetch(BASE_URL + url, {
    method: 'GET',
  });
  const body = await getResponseBody('get subscriber', res);
  return body.subscriber;
}

export async function tagSubscriber(
  tagId: number,
  email: string
): Promise<void> {
  const url = `/tags/${tagId}/subscribe?api_secret=${config.convertKit.apiSecret}`;
  const res = await fetch(BASE_URL + url, {
    method: 'POST',
    body: JSON.stringify({
      email,
    }),
  });
  await getResponseBody('Tag subscriber', res);
}
export async function untagSubscriber(
  tagId: number,
  email: string
): Promise<void> {
  const url = `/tags/${tagId}/unsubscribe?api_secret=${config.convertKit.apiSecret}`;
  const res = await fetch(BASE_URL + url, {
    method: 'POST',
    body: JSON.stringify({
      email,
    }),
  });
  await getResponseBody('Untag subscriber', res);
}
