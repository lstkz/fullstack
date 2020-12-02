import { confirmEmail } from '../../src/contracts/user/confirmEmail';
import { setupDb } from '../helper';

setupDb();

it('throw error if invalid code', async () => {
  const promise = confirmEmail('sadkjansfj');
  await expect(promise).rejects.toThrow('Invalid code');
});
