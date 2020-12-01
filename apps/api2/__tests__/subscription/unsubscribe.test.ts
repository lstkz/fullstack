import { SubscriptionCollection } from '../../src/collections/Subscription';
import { unsubscribe } from '../../src/contracts/subscription/unsubscribe';
import { disconnect } from '../../src/db';
import { initDb, resetDb } from '../helper';

beforeAll(initDb);
afterAll(disconnect);

beforeEach(async () => {
  await resetDb();
  await SubscriptionCollection.insertOne({
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
  const sub = await SubscriptionCollection.findOne({
    email_lowered: 'john@example.org',
  });
  expect(sub).toBeNull();
});
