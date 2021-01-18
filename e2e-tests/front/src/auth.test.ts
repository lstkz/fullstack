import { WEBSITE_URL } from './config';
import { MockError } from './lib/Engine';
import { initEngine } from './utils';

const engine = initEngine(page);

const defaultAuthData = {
  token: 'abc',
  user: {
    email: 'a@example.org',
    id: 'id1',
    isVerified: true,
    hasSubscription: false,
  },
};

describe('login', () => {
  beforeEach(() => {
    engine.mock('module_getAllModules', () => {
      return [];
    });
  });

  it('should login', async () => {
    engine.mock('user_login', (count, data) => {
      if (count === 1) {
        throw new MockError('Invalid credentials');
      }
      return {
        token: 'abc',
        user: {
          email: data.email,
          id: 'id1',
          isVerified: true,
          hasSubscription: false,
        },
      };
    });
    await page.goto(WEBSITE_URL + '/login');
    await $('@login-input').type('a@example.org');
    await $('@password-input').type('pass');
    await $('@login-submit').click();
    await $('@login-error').expect.toMatch('Invalid credentials');
    await $('@login-input').clear();
    await $('@login-input').type('b@example.org');
    await $('@login-submit').click();
    await $('@current-email').expect.toMatch('b@example.org');
  });

  it('should login with github', async () => {
    engine.mock('user_githubLogin', () => {
      return defaultAuthData;
    });
    await page.goto(WEBSITE_URL + '/login?auth=github&code=123');
    await $('@current-email').expect.toMatch('a@example.org');
  });

  it('error when login with github', async () => {
    engine.mock('user_githubLogin', () => {
      throw new MockError('Invalid credentials');
    });
    await page.goto(WEBSITE_URL + '/login?auth=github&code=123');
    await $('@error-modal @error-msg').expect.toMatch('Invalid credentials');
  });

  it('should login with google', async () => {
    engine.mock('user_googleLogin', () => {
      return defaultAuthData;
    });
    await page.goto(WEBSITE_URL + '/login?auth=google#access_token=123');
    await $('@current-email').expect.toMatch('a@example.org');
  });

  it('error when login with google', async () => {
    engine.mock('user_googleLogin', () => {
      throw new MockError('Invalid credentials');
    });
    await page.goto(WEBSITE_URL + '/login?auth=google#access_token=123');
    await $('@error-modal @error-msg').expect.toMatch('Invalid credentials');
  });
});

describe('register', () => {
  beforeEach(() => {
    engine.mock('user_getGeneralInfo', () => {
      return {
        address: '',
        city: '',
        firstName: '',
        lastName: '',
        postalCode: '',
      };
    });
    engine.mock('subscriptionPlan_getAllSubscriptionPlans', () => {
      return [
        {
          id: 'plan1',
          name: 'plan 1',
          price: {
            net: 100,
            total: 123,
            vat: 23,
            vatRate: 23,
          },
          pricePerMonth: 100,
          savings: 0,
          type: 'annual' as const,
        },
      ];
    });
    engine.mock('subscription_getTPayGroups', () => {
      return [
        {
          banks: '1',
          id: 1,
          img: '',
          main_bank_id: 1,
          name: 'bank 1',
        },
      ];
    });
  });

  it('should register', async () => {
    engine.mock('user_register', (count, data) => {
      if (count === 1) {
        throw new MockError('Duplicated user');
      }
      return {
        token: 'abc',
        user: {
          email: data.email,
          id: 'id1',
          isVerified: true,
          hasSubscription: false,
        },
      };
    });
    await page.goto(WEBSITE_URL + '/register');
    await $('@register-input').type('a@example.org');
    await $('@password-input').type('pass12');
    await $('@confirm-password-input').type('pass1');
    await $('@register-submit').click();
    await $('@confirm-password-input-error').expect.toMatch(
      'Hasła muszą być takie same'
    );
    await $('@confirm-password-input').type('2');
    await $('@register-submit').click();
    await $('@register-error').expect.toMatch('Duplicated user');
    await $('@register-input').clear();
    await $('@register-input').type('b@example.org');
    await $('@register-submit').click();
    await $('@current-email').expect.toMatch('b@example.org');
    await $('@subscription-page').expect.toBeVisible();
  });

  it('should register with github', async () => {
    engine.mock('user_githubRegister', () => {
      return defaultAuthData;
    });
    await page.goto(WEBSITE_URL + '/register?auth=github&code=123');
    await $('@current-email').expect.toMatch('a@example.org');
    await $('@subscription-page').expect.toBeVisible();
  });

  it('error when register with github', async () => {
    engine.mock('user_githubRegister', () => {
      throw new MockError('Invalid credentials');
    });
    await page.goto(WEBSITE_URL + '/register?auth=github&code=123');
    await $('@error-modal @error-msg').expect.toMatch('Invalid credentials');
  });

  it('should register with google', async () => {
    engine.mock('user_googleRegister', () => {
      return defaultAuthData;
    });
    await page.goto(WEBSITE_URL + '/register?auth=google#access_token=123');
    await $('@current-email').expect.toMatch('a@example.org');
  });

  it('error when register with google', async () => {
    engine.mock('user_googleRegister', () => {
      throw new MockError('Invalid credentials');
    });
    await page.goto(WEBSITE_URL + '/register?auth=google#access_token=123');
    await $('@error-modal @error-msg').expect.toMatch('Invalid credentials');
  });
});

describe('forgot password', () => {
  it('forgot password successfully', async () => {
    engine.mock('user_resetPassword', () => {
      return {};
    });
    await page.goto(WEBSITE_URL + '/forgot-password');
    await $('@email-input').type('a@example.org');
    await $('@reset-password-submit').click();
    await $('@reset-password-success').expect.toBeVisible();
  });

  it('error when forgot password', async () => {
    engine.mock('user_resetPassword', () => {
      throw new MockError('user not found');
    });
    await page.goto(WEBSITE_URL + '/forgot-password');
    await $('@email-input').type('a@example.org');
    await $('@reset-password-submit').click();
    await $('@reset-password-error').expect.toMatch('user not found');
  });
});

describe('reset password', () => {
  it('should reset password', async () => {
    engine.mock('user_confirmResetPassword', (count, code, newPassword) => {
      expect(code).toEqual('123');
      expect(newPassword).toEqual('12345');
      return defaultAuthData;
    });
    engine.mock('module_getAllModules', () => {
      return [];
    });
    await page.goto(WEBSITE_URL + '/reset-password/123');
    await $('@password-input').type('12345');
    await $('@confirm-password-input').type('12345');
    await $('@change-password-submit').click();
    await $('@current-email').expect.toMatch('a@example.org');
  });

  it('error when reset password', async () => {
    engine.mock('user_confirmResetPassword', () => {
      throw new MockError('user not found');
    });
    await page.goto(WEBSITE_URL + '/reset-password/123');
    await $('@password-input').type('12345');
    await $('@confirm-password-input').type('12345');
    await $('@change-password-submit').click();
    await $('@reset-password-error').expect.toMatch('user not found');
  });
});
