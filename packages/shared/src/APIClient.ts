import * as Rx from 'rxjs';
import { ajax, AjaxRequest } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

// IMPORTS
import { SubscriptionResult, AuthData, User } from './types';
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
  emailSubscription_confirmSubscription(code: string): Rx.Observable<unknown> {
    return this.call('emailSubscription.confirmSubscription', { code });
  }
  emailSubscription_subscribe(
    name: string | null | undefined,
    email: string
  ): Rx.Observable<SubscriptionResult> {
    return this.call('emailSubscription.subscribe', { name, email });
  }
  emailSubscription_unsubscribe(
    email: string,
    code: string,
    source: string
  ): Rx.Observable<unknown> {
    return this.call('emailSubscription.unsubscribe', { email, code, source });
  }
  user_confirmEmail(code: string): Rx.Observable<AuthData> {
    return this.call('user.confirmEmail', { code });
  }
  user_confirmResetPassword(
    code: string,
    newPassword: string
  ): Rx.Observable<AuthData> {
    return this.call('user.confirmResetPassword', { code, newPassword });
  }
  user_getMe(): Rx.Observable<User> {
    return this.call('user.getMe', {});
  }
  user_githubLogin(code: string): Rx.Observable<AuthData> {
    return this.call('user.githubLogin', { code });
  }
  user_githubRegister(code: string): Rx.Observable<AuthData> {
    return this.call('user.githubRegister', { code });
  }
  user_googleLogin(accessToken: string): Rx.Observable<AuthData> {
    return this.call('user.googleLogin', { accessToken });
  }
  user_googleRegister(accessToken: string): Rx.Observable<AuthData> {
    return this.call('user.googleRegister', { accessToken });
  }
  user_login(values: {
    email: string;
    password: string;
  }): Rx.Observable<AuthData> {
    return this.call('user.login', { values });
  }
  user_register(values: {
    email: string;
    password: string;
  }): Rx.Observable<AuthData> {
    return this.call('user.register', { values });
  }
  user_resetPassword(email: string): Rx.Observable<void> {
    return this.call('user.resetPassword', { email });
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
