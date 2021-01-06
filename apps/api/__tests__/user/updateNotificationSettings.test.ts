import { execContract, setupDb } from '../helper';
import { registerSampleUsers } from '../seed-data';
import { _createUser } from '../../src/contracts/user/_createUser';
import { updateNotificationSettings } from '../../src/contracts/user/updateNotificationSettings';
import { getNotificationSettings } from '../../src/contracts/user/getNotificationSettings';

setupDb();

beforeEach(async () => {
  await registerSampleUsers();
});

it('should update notification settings successfully', async () => {
  await execContract(
    updateNotificationSettings,
    {
      values: {
        newContent: false,
        newsletter: false,
        subscriptionRemainder: false,
      },
    },
    'user1_token'
  );
  const latest = await execContract(getNotificationSettings, {}, 'user1_token');
  expect(latest).toEqual({
    newContent: false,
    newsletter: false,
    subscriptionRemainder: false,
  });
});
