import { unsubscribe } from '../../src/contracts/subscription/unsubscribe';
import { SubscriptionEntity } from '../../src/entities/SubscriptionEntity';
import { resetDb } from '../helper';

beforeEach(async () => {
  await resetDb();
  const sub = new SubscriptionEntity({
    createdAt: 1,
    name: 'john',
    unsubscribeCode: 'abc',
    email: 'john@example.org',
  });
  await sub.insert();
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
  const sub = await SubscriptionEntity.getByKeyOrNull({
    email: 'john@example.org',
  });
  expect(sub).toBeNull();
});
