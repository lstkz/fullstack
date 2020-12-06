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
  emailSubscription_confirmSubscription(code: string): Promise<unknown> {
    return this.call('emailSubscription.confirmSubscription', { code });
  }
  emailSubscription_subscribe(
    name: string | null | undefined,
    email: string
  ): Promise<SubscriptionResult> {
    return this.call('emailSubscription.subscribe', { name, email });
  }
  emailSubscription_unsubscribe(
    email: string,
    code: string,
    source: string
  ): Promise<unknown> {
    return this.call('emailSubscription.unsubscribe', { email, code, source });
  }
  subscription_checkStatus(
    orderId: string
  ): Promise<{ status: 'NOT_PAID' | 'PAID' }> {
    return this.call('subscription.checkStatus', { orderId });
  }
  subscription_getTPayGroups(): Promise<TPayGroup[]> {
    return this.call('subscription.getTPayGroups', {});
  }
  subscription_purchase(values: {
    customer: {
      firstName: string;
      lastName: string;
      address: string;
      postalCode: string;
      city: string;
      companyName?: string | undefined;
      companyVat?: string | undefined;
    };
    subscriptionPlanId: string;
    tpayGroup: number;
  }): Promise<{ paymentUrl: string }> {
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
  ): Promise<'TRUE' | 'FALSE'> {
    return this.call('subscription.tpayHook', { values });
  }
  subscriptionPlan_getAllSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    return this.call('subscriptionPlan.getAllSubscriptionPlans', {});
  }
  user_confirmEmail(code: string): Promise<AuthData> {
    return this.call('user.confirmEmail', { code });
  }
  user_confirmResetPassword(
    code: string,
    newPassword: string
  ): Promise<AuthData> {
    return this.call('user.confirmResetPassword', { code, newPassword });
  }
  user_getMe(): Promise<User> {
    return this.call('user.getMe', {});
  }
  user_githubLogin(code: string): Promise<AuthData> {
    return this.call('user.githubLogin', { code });
  }
  user_githubRegister(code: string): Promise<AuthData> {
    return this.call('user.githubRegister', { code });
  }
  user_googleLogin(accessToken: string): Promise<AuthData> {
    return this.call('user.googleLogin', { accessToken });
  }
  user_googleRegister(accessToken: string): Promise<AuthData> {
    return this.call('user.googleRegister', { accessToken });
  }
  user_login(values: { email: string; password: string }): Promise<AuthData> {
    return this.call('user.login', { values });
  }
  user_register(values: {
    email: string;
    password: string;
  }): Promise<AuthData> {
    return this.call('user.register', { values });
  }
  user_resetPassword(email: string): Promise<void> {
    return this.call('user.resetPassword', { email });
  }
  // SIGNATURES END
  private async call(name: string, params: any): Promise<any> {
    const token = this.getToken();
    const headers: any = {
      'content-type': 'application/json',
    };
    if (token) {
      headers['x-token'] = token;
    }

    const res = await fetch(`${this.baseUrl}/rpc/${name}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(params),
    });
    return res.json();

    // const options: AjaxRequest = {
    //   url: `${this.baseUrl}/rpc/${name}`,
    //   method: 'POST',
    //   body: JSON.stringify(params),
    //   headers,
    // };
    // if (this.createXHR) {
    //   options.createXHR = this.createXHR;
    // }
    // return ajax(options).pipe(map(res => res.response));
  }
}
