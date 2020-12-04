import { confirmSubscription } from '../../src/contracts/emailSubscription/confirmEmailSubscription';
import { setupDb } from '../helper';

setupDb();

it('should throw an error if invalid code', async () => {
  await expect(confirmSubscription('foo')).rejects.toThrow('Invalid code');
});
