import { EmailSubscriptionCollection } from '../../src/collections/EmailSubscription';
import { unsubscribe } from '../../src/contracts/emailSubscription/unsubscribe';
import { resetDb, setupDb } from '../helper';

setupDb();

beforeEach(async () => {
  await resetDb();
  await EmailSubscriptionCollection.insertOne({
    createdAt: new Date(1),
    unsubscribeCode: 'abc',
    email: 'john@example.org',
    email_lowered: 'john@example.org',
  });
});

it('should ignore if email not found', async () => {
  await expect(
    unsubscribe('foo@example.org', 'aaa', '123')
  ).resolves.not.toThrow();
});

it('should throw error if code not found', async () => {
  await expect(unsubscribe('john@example.org', 'aaa', '123')).rejects.toThrow(
    'Invalid code'
  );
});

it('should unsubscribe', async () => {
  await unsubscribe('john@example.org', 'abc', '123');
  const sub = await EmailSubscriptionCollection.findOne({
    email_lowered: 'john@example.org',
  });
  expect(sub).toBeNull();
});
