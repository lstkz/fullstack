import { confirmSubscription } from '../../src/contracts/subscription/confirmSubscription';
import { setupDb } from '../helper';

setupDb();

it('should throw an error if invalid code', async () => {
  await expect(confirmSubscription('foo')).rejects.toThrow('Invalid code');
});
