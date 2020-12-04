import { setupDb } from '../helper';
import { createSubscriptionPlans, registerSampleUsers } from '../seed-data';

setupDb();

beforeEach(async () => {
  await registerSampleUsers();
  await createSubscriptionPlans();
});

it('should complete purchase', async () => {});
