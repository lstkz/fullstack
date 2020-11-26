import * as Rx from 'rxjs';
import { ajax, AjaxRequest } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

// IMPORTS
import { Course, TPayGroup, SubscriptionResult, AuthData, User } from './types';
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
  course_getAllCourses(): Rx.Observable<Course[]> {
    return this.call('course.getAllCourses', {});
  }
  course_getCourse(courseId: string): Rx.Observable<Course> {
    return this.call('course.getCourse', { courseId });
  }
  course_updateCourse(
    course: {
      name: string;
      description: string;
      price: number;
      promoPrice: number;
      promoEnds: Date;
      id: string;
    },
    lessons: {
      name: string;
      id: number;
      week: number;
      sources: { resolution: number; s3Key: string }[];
    }[],
    tasks: {
      name: string;
      id: number;
      week: number;
      detailsS3Key: string;
      sourceS3Key: string;
    }[]
  ): Rx.Observable<unknown> {
    return this.call('course.updateCourse', { course, lessons, tasks });
  }
  errorReporting_reportFrontendError(content: {
    [key: string]: any;
  }): Rx.Observable<unknown> {
    return this.call('errorReporting.reportFrontendError', { content });
  }
  order_checkOrderStatus(
    orderId: string
  ): Rx.Observable<{ status: 'NOT_PAID' | 'PAID' }> {
    return this.call('order.checkOrderStatus', { orderId });
  }
  order_createOrder(values: {
    quantity: number;
    product: { courseId: string; type: 'course' };
    customer: {
      email: string;
      firstName: string;
      lastName: string;
      address: string;
      postalCode: string;
      city: string;
      companyName?: string | undefined;
      companyVat?: string | undefined;
    };
    requestUnitPriceNet: number;
    group: number;
    subscribeNewsletter?: boolean | undefined;
  }): Rx.Observable<{ paymentUrl: string }> {
    return this.call('order.createOrder', { values });
  }
  order_getTPayGroups(): Rx.Observable<TPayGroup[]> {
    return this.call('order.getTPayGroups', {});
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
    name: string | null | undefined,
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
  ): Rx.Observable<AuthData> {
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
    activationCode: string;
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
