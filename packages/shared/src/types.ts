export interface Foo {
  id: string;
  foo: string;
  bar: string;
}

export interface User {
  id: string;
  username: string;
  isAdmin: boolean;
}

export interface SubscriptionResult {
  result: 'ok' | 'already-subscribed';
}
