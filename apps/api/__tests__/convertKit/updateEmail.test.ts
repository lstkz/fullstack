import { mocked } from 'ts-jest/utils';
import { ConvertKitSubscriberCollection } from '../../src/collections/ConvertKitSubscriber';
import { updateSubscriber } from '../../src/common/convertKit';
import { updateEmail } from '../../src/contracts/convertKit/updateEmail';
import { getId, setupDb } from '../helper';
import { registerSampleUsers } from '../seed-data';

setupDb();

jest.mock('../../src/common/convertKit');

const mocked_updateSubscriber = mocked(updateSubscriber);

beforeEach(async () => {
  await registerSampleUsers();
});

it('should update subscriber', async () => {
  await ConvertKitSubscriberCollection.insertOne({
    _id: 100,
    userId: getId(1),
    isSubscribed: true,
    isSynced: true,
  });
  await updateEmail(getId(1));
  expect(mocked_updateSubscriber.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        100,
        Object {
          "email_address": "user1@example.com",
        },
      ],
    ]
  `);
});
