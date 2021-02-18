/// <reference types="typescript/lib/lib.dom" />

// IMPORTS
import {
  Module,
  ModuleDetails,
  ModuleTaskDetails,
  TaskHintResult,
  TaskVideoResult,
  TaskTestInfo,
  CheckPromoCodResult,
  Order,
  SubscriptionStatus,
  TPayGroup,
  SubscriptionPlan,
  AuthData,
  CustomerInfo,
  User,
  NotificationSettings,
} from './types';
// IMPORTS END

export class APIClient {
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response> = null!;

  constructor(
    private baseUrl: string,
    public getToken: () => string | null,
    fetch?: any
  ) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.fetch =
      fetch ?? (typeof window === 'undefined' ? null! : window.fetch);
    if (this.fetch) {
      this.fetch = this.fetch.bind(fetch);
    }
  }

  // SIGNATURES
  convertKit_unsubscribeWebhook(
    values: { subscriber: { id: number } & { [key: string]: any } } & {
      [key: string]: any;
    }
  ): Promise<unknown> {
    return this.call('convertKit.unsubscribeWebhook', { values });
  }
  domainCert_createDomainCert(values: {
    expiresAt: Date;
    cert: string;
    certKey: string;
    domain: string;
  }): Promise<void> {
    return this.call('domainCert.createDomainCert', { values });
  }
  module_getAllModules(): Promise<Module[]> {
    return this.call('module.getAllModules', {});
  }
  module_getModule(id: string): Promise<ModuleDetails> {
    return this.call('module.getModule', { id });
  }
  module_getSolutionUploadUrl(): Promise<{
    url: string;
    key: string;
    fields: Record<string, string>;
  }> {
    return this.call('module.getSolutionUploadUrl', {});
  }
  module_getTask(moduleId: string, taskId: number): Promise<ModuleTaskDetails> {
    return this.call('module.getTask', { moduleId, taskId });
  }
  module_getTaskHint(
    moduleId: string,
    taskId: number
  ): Promise<TaskHintResult> {
    return this.call('module.getTaskHint', { moduleId, taskId });
  }
  module_getTaskVideoSolution(
    moduleId: string,
    taskId: number
  ): Promise<TaskVideoResult> {
    return this.call('module.getTaskVideoSolution', { moduleId, taskId });
  }
  module_getTaskTestInfo(
    moduleId: string,
    taskId: number
  ): Promise<TaskTestInfo> {
    return this.call('module.getTaskTestInfo', { moduleId, taskId });
  }
  module_reportPracticeTime(
    moduleId: string,
    taskId: number
  ): Promise<unknown> {
    return this.call('module.reportPracticeTime', { moduleId, taskId });
  }
  module_submitSolution(values: {
    moduleId: string;
    taskId: number;
    resultHash: string;
    uploadKey: string;
  }): Promise<void> {
    return this.call('module.submitSolution', { values });
  }
  module_updateLessonProgress(
    moduleId: string,
    lessonId: number,
    values: { isWatched: boolean }
  ): Promise<void> {
    return this.call('module.updateLessonProgress', {
      moduleId,
      lessonId,
      values,
    });
  }
  module_updateModule(values: {
    id: string;
    name: string;
    description: string;
    isPending: boolean;
    estimatedPracticeTimeHours: number;
    packageJson: string;
    lessons: {
      id: number;
      name: string;
      duration: string;
      sources: { url: string; type: string }[];
    }[];
    tasks: {
      id: number;
      name: string;
      isExample: boolean;
      detailsS3Key: string;
      sourceS3Key: string;
      htmlS3Key: string;
      hintHtmlS3Key: string | null;
      testsInfo: {
        resultHash: string;
        files: { path: string; hash: string }[];
      };
      videoSolution: { url: string; type: string }[] | null;
    }[];
  }): Promise<unknown> {
    return this.call('module.updateModule', { values });
  }
  subscription_checkPromoCode(code: string): Promise<CheckPromoCodResult> {
    return this.call('subscription.checkPromoCode', { code });
  }
  subscription_checkStatus(
    orderId: string
  ): Promise<{ status: 'NOT_PAID' | 'PAID' }> {
    return this.call('subscription.checkStatus', { orderId });
  }
  subscription_getOrders(): Promise<Order[]> {
    return this.call('subscription.getOrders', {});
  }
  subscription_getSubscriptionStatus(): Promise<SubscriptionStatus> {
    return this.call('subscription.getSubscriptionStatus', {});
  }
  subscription_getTPayGroups(): Promise<TPayGroup[]> {
    return this.call('subscription.getTPayGroups', {});
  }
  user_updateGeneralInfo(info: {
    firstName: string;
    lastName: string;
    address: string;
    postalCode: string;
    city: string;
    companyName?: string | undefined;
    companyVat?: string | undefined;
  }): Promise<unknown> {
    return this.call('user.updateGeneralInfo', { info });
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
    promoCode?: string | undefined;
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
  user_confirmNewEmail(code: string): Promise<unknown> {
    return this.call('user.confirmNewEmail', { code });
  }
  user_confirmResetPassword(
    code: string,
    newPassword: string
  ): Promise<AuthData> {
    return this.call('user.confirmResetPassword', { code, newPassword });
  }
  user_getGeneralInfo(): Promise<CustomerInfo | null> {
    return this.call('user.getGeneralInfo', {});
  }
  user_getMe(): Promise<User> {
    return this.call('user.getMe', {});
  }
  user_getNotificationSettings(): Promise<NotificationSettings> {
    return this.call('user.getNotificationSettings', {});
  }
  user_githubLogin(code: string): Promise<AuthData> {
    return this.call('user.githubLogin', { code });
  }
  user_githubRegister(
    code: string,
    subscribeNewsletter: boolean
  ): Promise<AuthData> {
    return this.call('user.githubRegister', { code, subscribeNewsletter });
  }
  user_googleLogin(accessToken: string): Promise<AuthData> {
    return this.call('user.googleLogin', { accessToken });
  }
  user_googleRegister(
    accessToken: string,
    subscribeNewsletter: boolean
  ): Promise<AuthData> {
    return this.call('user.googleRegister', {
      accessToken,
      subscribeNewsletter,
    });
  }
  user_login(values: { email: string; password: string }): Promise<AuthData> {
    return this.call('user.login', { values });
  }
  user_register(values: {
    email: string;
    password: string;
    subscribeNewsletter: boolean;
  }): Promise<AuthData> {
    return this.call('user.register', { values });
  }
  user_resetPassword(email: string): Promise<void> {
    return this.call('user.resetPassword', { email });
  }
  user_updateEmail(newEmail: string): Promise<{ ok: boolean }> {
    return this.call('user.updateEmail', { newEmail });
  }
  user_updateNotificationSettings(values: {
    newsletter: boolean;
    webinars: boolean;
    newContent: boolean;
    subscriptionRemainder: boolean;
  }): Promise<unknown> {
    return this.call('user.updateNotificationSettings', { values });
  }
  user_updatePassword(password: string): Promise<void> {
    return this.call('user.updatePassword', { password });
  }
  vm_assignVM(): Promise<{ isReady: boolean }> {
    return this.call('vm.assignVM', {});
  }
  vm_pingVM(): Promise<unknown> {
    return this.call('vm.pingVM', {});
  }
  vm_prepareFolder(
    moduleId: string,
    taskId: number
  ): Promise<{ url: string | null }> {
    return this.call('vm.prepareFolder', { moduleId, taskId });
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

    const res = await this.fetch(`${this.baseUrl}/rpc/${name}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(params),
    });
    const body = await res.json();
    if (res.status !== 200) {
      const err: any = new Error(body.error || 'Failed to call API');
      err.res = res;
      err.body = body;
      throw err;
    }
    return body;
  }
}
