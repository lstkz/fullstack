import { SES } from 'aws-sdk';
import { confirmSubscription } from '../../src/contracts/subscription/confirmSubscription';
import { subscribe } from '../../src/contracts/subscription/subscribe';
import { SubscriptionEntity } from '../../src/entities/SubscriptionEntity';
import { ses } from '../../src/lib';
import { resetDb } from '../helper';

let body = '';

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
  const code = /confirm\/([^"]+)/.exec(body)![1];
  let sub = await SubscriptionEntity.getByKeyOrNull({
    email: 'john@example.org',
  });
  expect(sub).toBeNull();
  await confirmSubscription(code);
  sub = await SubscriptionEntity.getByKey({
    email: 'john@example.org',
  });
  expect(sub).not.toBeNull();
  expect(sub.name).toEqual('john');

  await expect(confirmSubscription(code)).resolves.not.toThrow(); // ignore code

  expect(await subscribe('john', 'JOHN@example.org')).toEqual({
    result: 'already-subscribed',
  });
});
