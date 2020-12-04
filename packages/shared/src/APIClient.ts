import * as Rx from 'rxjs';
import { ajax, AjaxRequest } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

// IMPORTS
import {
  SubscriptionResult,
  TPayGroup,
  SubscriptionPlan,
  AuthData,
  User,
} from './types';
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
  subscription_getTPayGroups(): Rx.Observable<TPayGroup[]> {
    return this.call('subscription.getTPayGroups', {});
  }
  subscription_purchase(values: {
    subscriptionPlanId: string;
    tpayGroup: number;
    customer: {
      firstName: string;
      lastName: string;
      address: string;
      postalCode: string;
      city: string;
      companyName?: string | undefined;
      companyVat?: string | undefined;
    };
  }): Rx.Observable<{ paymentUrl: string }> {
    return this.call('subscription.purchase', { values });
  }
  subscription_tpayHook(
    values: {
      id: string;
      tr_id: string;
      tr_date: string;
      tr_crc: string;
      tr_amount: string;
      tr_paid: string;
      tr_desc: string;
      tr_status: 'TRUE' | 'FALSE';
      tr_error: string;
      tr_email: string;
      test_mode: string;
      md5sum: string;
    } & { [key: string]: any }
  ): Rx.Observable<'TRUE' | 'FALSE'> {
    return this.call('subscription.tpayHook', { values });
  }
  subscriptionPlan_getAllSubscriptionPlans(): Rx.Observable<
    SubscriptionPlan[]
  > {
    return this.call('subscriptionPlan.getAllSubscriptionPlans', {});
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
