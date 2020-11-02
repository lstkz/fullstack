import * as Rx from 'rxjs';
import { ajax, AjaxRequest } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

// IMPORTS
import { Foo, SubscriptionResult } from './types';
// IMPORTS END

export class APIClient {
  constructor(
    private baseUrl: string,
    private getToken: () => string | null,
    private createXHR?: any
  ) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  // SIGNATURES
  example_createFoo(values: { foo: string }): Rx.Observable<Foo> {
    return this.call('example.createFoo', { values });
  }
  subscription_confirmSubscription(code: string): Rx.Observable<unknown> {
    return this.call('subscription.confirmSubscription', { code });
  }
  subscription_subscribe(
    name: string,
    email: string
  ): Rx.Observable<SubscriptionResult> {
    return this.call('subscription.subscribe', { name, email });
  }
  subscription_unsubscribe(
    email: string,
    code: string,
    source: string
  ): Rx.Observable<unknown> {
    return this.call('subscription.unsubscribe', { email, code, source });
  }
  // SIGNATURES END
  private call(name: string, params: any): any {
    const token = this.getToken();
    const headers: any = {
      'content-type': 'application/json',
    };
    if (token) {
      headers['x-token'] = token;
    }
    const options: AjaxRequest = {
      url: `${this.baseUrl}/rpc/${name}`,
      method: 'POST',
      body: JSON.stringify(params),
      headers,
    };
    if (this.createXHR) {
      options.createXHR = this.createXHR;
    }
    return ajax(options).pipe(map(res => res.response));
  }
}
