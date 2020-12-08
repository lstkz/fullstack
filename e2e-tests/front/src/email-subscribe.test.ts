import { WEBSITE_URL } from './config';
import { MockError } from './lib/Engine';
import { initEngine } from './utils';

const engine = initEngine(page);

it('should subscribe', async () => {
  engine.mock('emailSubscription_subscribe', () => {
    return {
      result: 'ok' as const,
    };
  });
  await page.goto(WEBSITE_URL);
  await page.evaluate(() => {
    document.getElementById('subscribe-section').scrollIntoView();
  });

  await $('@SubscribeBtn').click();
  await $('@SubscribeValidation').expect.toMatch('Podaj adres email');
  await $('@SubscribeEmail').type('foo');
  await $('@SubscribeBtn').click();
  await $('@SubscribeValidation').expect.toMatch('Niepoprawny email');
  await $('@SubscribeEmail').type('@example.org');
  await $('@SubscribeBtn').click();
  await $('@SubConfirmModal').expect.toBeVisible();
});
