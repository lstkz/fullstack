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
  course_updateCourse(
    course: {
      id: string;
      name: string;
      description: string;
      promoPrice: number;
      price: number;
      promoEnds: Date;
    },
    lessons: {
      id: number;
      name: string;
      week: number;
      sources: { resolution: number; s3Key: string }[];
    }[],
    tasks: {
      id: number;
      name: string;
      week: number;
      detailsS3Key: string;
      sourceS3Key: string;
    }[]
  ): Rx.Observable<unknown> {
    return this.call('course.updateCourse', { course, lessons, tasks });
  }
  order_createOrder(values: {
    group: number;
    product: { type: 'course'; courseId: string };
    customer: { email: string; firstName: string; lastName: string };
    invoice?:
      | {
          company: string;
          country: string;
          vat: string;
          street: string;
          streetNo: string;
          postalCode: string;
          city: string;
          localNo?: string | undefined;
        }
      | undefined;
  }): Rx.Observable<unknown> {
    return this.call('order.createOrder', { values });
  }
  order_tpayHook(
    values: {
      id: number;
      tr_id: string;
      tr_date: string;
      tr_crc: string;
      tr_amount: number;
      tr_paid: number;
      tr_desc: string;
      tr_status: 'TRUE' | 'FALSE';
      tr_error: string;
      tr_email: string;
      test_mode: string;
      md5sum: string;
    } & { [key: string]: any }
  ): Rx.Observable<unknown> {
    return this.call('order.tpayHook', { values });
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
  user_authGithub(autoConnect: boolean, code: string): Rx.Observable<AuthData> {
    return this.call('user.authGithub', { autoConnect, code });
  }
  user_authGoogle(
    autoConnect: boolean,
    accessToken: string
  ): Rx.Observable<AuthData> {
    return this.call('user.authGoogle', { autoConnect, accessToken });
  }
  user_confirmEmail(code: string): Rx.Observable<AuthData> {
    return this.call('user.confirmEmail', { code });
  }
  user_confirmResetPassword(
    code: string,
    newPassword: string
  ): Rx.Observable<unknown> {
    return this.call('user.confirmResetPassword', { code, newPassword });
  }
  user_getMe(): Rx.Observable<User> {
    return this.call('user.getMe', {});
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
  user_resetPassword(email: string): Rx.Observable<unknown> {
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
