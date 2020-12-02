import { SES } from 'aws-sdk';
import { SubscriptionCollection } from '../../src/collections/Subscription';
import { confirmSubscription } from '../../src/contracts/subscription/confirmSubscription';
import { subscribe } from '../../src/contracts/subscription/subscribe';
import { ses } from '../../src/lib';
import { resetDb, setupDb } from '../helper';

let body = '';

setupDb();

beforeEach(async () => {
  await resetDb();
  const sendEmailMock: any = (params: SES.Types.SendEmailRequest) => ({
    promise: () => {
      body = params.Message.Body.Html!.Data;
      return Promise.resolve();
    },
  });
  jest.spyOn(ses, 'sendEmail').mockImplementation(sendEmailMock);
});

it('subscribe and confirm email', async () => {
  const result = await subscribe('john', 'john@example.org');
  expect(result).toEqual({
    result: 'ok',
  });
  expect(body).toBeTruthy();
  const code = /confirm-email=([^"]+)/.exec(body)![1];
  let sub = await SubscriptionCollection.findOne({
    email_lowered: 'john@example.org',
  });
  expect(sub).toBeNull();
  await confirmSubscription(code);
  sub = await SubscriptionCollection.findOne({
    email_lowered: 'john@example.org',
  });
  expect(sub).not.toBeNull();
  await expect(confirmSubscription(code)).resolves.not.toThrow(); // ignore code
  expect(await subscribe('john', 'JOHN@example.org')).toEqual({
    result: 'already-subscribed',
  });
});
