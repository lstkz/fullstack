import { WEBSITE_URL } from './config';
import { MockError } from './lib/Engine';
import { initEngine } from './utils';

const engine = initEngine(page);

const MOCK_IMAGE = `data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==`;

describe('subscription', () => {
  beforeEach(() => {
    engine.setToken('123');
    engine.mock('user_getMe', () => {
      return {
        email: 'user1@example.org',
        id: 'user1',
        isVerified: true,
        hasSubscription: false,
      };
    });
    engine.mock('subscriptionPlan_getAllSubscriptionPlans', () => {
      return [
        {
          id: 'plan1',
          name: 'monthly plan',
          price: {
            net: 200,
            total: 246,
            vat: 46,
            vatRate: 23,
          },
          pricePerMonth: 246,
          savings: 0,
          type: 'monthly' as const,
        },
        {
          id: 'plan2',
          name: 'annual plan',
          price: {
            net: 1200,
            total: 1476,
            vat: 276,
            vatRate: 23,
          },
          pricePerMonth: 123,
          savings: 1476,
          type: 'annual' as const,
        },
      ];
    });
    engine.mock('subscription_getTPayGroups', () => {
      return [
        {
          banks: '1',
          id: 1,
          img: MOCK_IMAGE,
          main_bank_id: 1,
          name: 'bank 1',
        },
        {
          banks: '2',
          id: 2,
          img: MOCK_IMAGE,
          main_bank_id: 2,
          name: 'bank 2',
        },
      ];
    });
  });

  it('should subscribe', async () => {
    engine.mock('user_getGeneralInfo', () => {
      return {
        address: '',
        city: '',
        firstName: '',
        lastName: '',
        postalCode: '',
      };
    });
    engine.mock('subscription_purchase', (count, data) => {
      expect(data).toEqual<typeof data>({
        subscriptionPlanId: 'plan2',
        tpayGroup: 1,
        customer: {
          firstName: 'firstName',
          lastName: 'lastName',
          companyName: '',
          companyVat: '',
          address: 'address',
          postalCode: '12-3456',
          city: 'city',
        },
      });
      return {
        paymentUrl: 'about:blank',
      };
    });
    await page.goto(WEBSITE_URL + '/subscription');
    await $('@firstName-input').type('firstName');
    await $('@lastName-input').type('lastName');
    await $('@address-input').type('address');
    await $('@postalCode-input').type('12-3456');
    await $('@city-input').type('city');
    await $('@payment-1').click();
    await $('@acceptTerms').click();
    await $('@submit-btn').click();
    await $('@submit-btn').expect.toBeHidden();
    expect(page.url()).toEqual('about:blank');
  });

  it('should subscribe with pre-populated form', async () => {
    engine.mock('user_getGeneralInfo', () => {
      return {
        firstName: 'firstName',
        lastName: 'lastName',
        address: 'address',
        postalCode: '12-3456',
        city: 'city',
      };
    });
    engine.mock('subscription_purchase', (count, data) => {
      expect(data).toEqual<typeof data>({
        subscriptionPlanId: 'plan2',
        tpayGroup: 1,
        customer: {
          firstName: 'firstName',
          lastName: 'lastName',
          companyName: '',
          companyVat: '',
          address: 'address',
          postalCode: '12-3456',
          city: 'city',
        },
      });
      return {
        paymentUrl: 'about:blank',
      };
    });
    await page.goto(WEBSITE_URL + '/subscription');
    await $('@payment-1').click();
    await $('@acceptTerms').click();
    await $('@submit-btn').click();
    await $('@submit-btn').expect.toBeHidden();
    expect(page.url()).toEqual('about:blank');
  });

  it('error during subscribe', async () => {
    engine.mock('user_getGeneralInfo', () => {
      return {
        address: '',
        city: '',
        firstName: '',
        lastName: '',
        postalCode: '',
      };
    });
    engine.mock('subscription_purchase', (count, data) => {
      throw new MockError('mock error');
    });
    await page.goto(WEBSITE_URL + '/subscription');
    await $('@firstName-input').type('firstName');
    await $('@lastName-input').type('lastName');
    await $('@address-input').type('address');
    await $('@postalCode-input').type('12-3456');
    await $('@city-input').type('city');
    await $('@payment-1').click();
    await $('@acceptTerms').click();
    await $('@submit-btn').click();
    await $('@error-modal @error-msg').expect.toMatch('mock error');
  });
});
