/// <reference types="typescript/lib/lib.dom" />

// IMPORTS
import {
  SubscriptionResult,
  Module,
  ModuleDetails,
  ModuleTaskDetails,
  TaskTestInfo,
  TPayGroup,
  SubscriptionPlan,
  AuthData,
  User,
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
  domainCert_createDomainCert(values: {
    expiresAt: Date;
    cert: string;
    certKey: string;
    domain: string;
  }): Promise<void> {
    return this.call('domainCert.createDomainCert', { values });
  }
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
  module_getTaskTestInfo(
    moduleId: string,
    taskId: number
  ): Promise<TaskTestInfo> {
    return this.call('module.getTaskTestInfo', { moduleId, taskId });
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
    name: string;
    isPending: boolean;
    description: string;
    lessons: {
      name: string;
      id: number;
      sources: { url: string; resolution: string }[];
    }[];
    tasks: {
      name: string;
      id: number;
      isExample: boolean;
      detailsS3Key: string;
      sourceS3Key: string;
      htmlS3Key: string;
      testsInfo: {
        resultHash: string;
        files: { path: string; hash: string }[];
      };
    }[];
    id: string;
  }): Promise<unknown> {
    return this.call('module.updateModule', { values });
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
