import { WEBSITE_URL } from './config';
import { MockError } from './lib/Engine';
import { initEngine } from './utils';

const engine = initEngine(page);

describe('login', () => {
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
});
