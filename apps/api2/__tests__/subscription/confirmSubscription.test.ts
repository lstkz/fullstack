import { confirmSubscription } from '../../src/contracts/subscription/confirmSubscription';
import { disconnect } from '../../src/db';
import { initDb } from '../helper';

beforeAll(initDb);
afterAll(disconnect);

it('should throw an error if invalid code', async () => {
  await expect(confirmSubscription('foo')).rejects.toThrow('Invalid code');
});
