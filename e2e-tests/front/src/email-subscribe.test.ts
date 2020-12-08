import { WEBSITE_URL } from './config';
import { MockError } from './lib/Engine';
import { initEngine } from './utils';

const engine = initEngine(page);

async function _scroll() {
  await page.evaluate(() => {
    document.getElementById('subscribe-section').scrollIntoView();
  });
}

describe('subscribe-form', () => {
  it('should subscribe', async () => {
    engine.mock('emailSubscription_subscribe', () => {
      return {
        result: 'ok' as const,
      };
    });
    await page.goto(WEBSITE_URL);
    await _scroll();
    await $('@subscribe-btn').click();
    await $('@subscribe-error').expect.toMatch('Podaj adres email');
    await $('@subscribe-email-input').type('foo');
    await $('@subscribe-btn').click();
    await $('@subscribe-error').expect.toMatch('Niepoprawny email');
    await $('@subscribe-email-input').type('@example.org');
    await $('@subscribe-btn').click();
    await $('@subscribe-confirm-modal').expect.toBeVisible();
    await $('@subscribe-confirm-modal @close-btn').click();
    await $('@subscribe-confirm-modal').expect.toBeHidden();
    await $('@subscribe-email-input').expect.toMatch('', true);
  });

  it('already subscribed', async () => {
    engine.mock('emailSubscription_subscribe', () => {
      return {
        result: 'already-subscribed' as const,
      };
    });
    await page.goto(WEBSITE_URL);
    await _scroll();
    await $('@subscribe-email-input').type('foo@example.org');
    await $('@subscribe-btn').click();
    await $('@already-subscribed-modal').expect.toBeVisible();
    await $('@already-subscribed-modal @close-btn').click();
    await $('@already-subscribed-modal').expect.toBeHidden();
    await $('@subscribe-email-input').expect.toMatch('foo@example.org', true);
  });

  it('error when subscribing', async () => {
    engine.mock('emailSubscription_subscribe', () => {
      throw new MockError('mock-error');
    });
    await page.goto(WEBSITE_URL);
    await _scroll();
    await $('@subscribe-email-input').type('foo@example.org');
    await $('@subscribe-btn').click();
    await $('@error-modal').expect.toBeVisible();
  });
});

describe('subscribe-checker', () => {
  it('should confirm if url contains code', async () => {
    const confirmSubscription = engine.mock(
      'emailSubscription_confirmSubscription',
      () => {}
    );
    await page.goto(WEBSITE_URL + '?confirm-email=abc&foo=123');
    await $('@subscription-confirmed-modal').expect.toBeVisible();
    expect(page.url()).toEqual(WEBSITE_URL + '/?foo=123');
    expect(confirmSubscription).toBeCalledWith('abc');
  });

  it('error when confirm code', async () => {
    engine.mock('emailSubscription_confirmSubscription', () => {
      throw new MockError('mock error');
    });
    await page.goto(WEBSITE_URL + '?confirm-email=abc&foo=123');
    await $('@error-modal').expect.toBeVisible();
    expect(page.url()).toEqual(WEBSITE_URL + '/?foo=123');
  });

  it('should unsubscribe', async () => {
    const unsubscribe = engine.mock('emailSubscription_unsubscribe', () => {});
    await page.goto(WEBSITE_URL + '?email=a1&unsubscribe=a2&source=a3&foo=123');
    await $('@unsubscribed-modal').expect.toBeVisible();
    expect(page.url()).toEqual(WEBSITE_URL + '/?foo=123');
    expect(unsubscribe).toBeCalledWith('a1', 'a2', 'a3');
  });

  it('error when unsubscribe', async () => {
    const unsubscribe = engine.mock('emailSubscription_unsubscribe', () => {
      throw new MockError('error');
    });
    await page.goto(WEBSITE_URL + '?email=a1&unsubscribe=a2&source=a3&foo=123');
    await $('@error-modal').expect.toBeVisible();
    expect(unsubscribe).toBeCalledWith('a1', 'a2', 'a3');
  });
});
