import { mocked } from 'ts-jest/utils';
import { ConvertKitSubscriberCollection } from '../../src/collections/ConvertKitSubscriber';
import { UserCollection } from '../../src/collections/User';
import { addSubscriberToForm } from '../../src/common/convertKit';
import { createSubscriber } from '../../src/contracts/convertKit/createSubscriber';
import { unsubscribeWebhook } from '../../src/contracts/convertKit/unsubscribeWebhook';
import { getId, setupDb } from '../helper';
import { getAddSubscriberResult, registerSampleUsers } from '../seed-data';

jest.mock('../../src/dispatch');
jest.mock('../../src/common/convertKit');
const mocked_addSubscriberToForm = mocked(addSubscriberToForm);

setupDb();

const SUBSCRIBER_ID = 3000;

beforeEach(async () => {
  await registerSampleUsers();
  mocked_addSubscriberToForm.mockClear();
  mocked_addSubscriberToForm.mockImplementation(async () =>
    getAddSubscriberResult(SUBSCRIBER_ID)
  );
});

it('should create subscriber and unsubscribe', async () => {
  let user = await UserCollection.findByIdOrThrow(getId(1));
  expect(user.notifications).toMatchInlineSnapshot(`
    Object {
      "newContent": true,
      "newsletter": true,
      "subscriptionRemainder": true,
      "webinars": true,
    }
  `);
  await createSubscriber(getId(1));
  let subs = await ConvertKitSubscriberCollection.findAll({});
  expect(subs).toHaveLength(1);
  expect(subs[0]).toMatchInlineSnapshot(`
    Object {
      "_id": 3000,
      "isSubscribed": true,
      "isSynced": false,
      "userId": "000000000000000000000001",
    }
  `);

  await unsubscribeWebhook({
    subscriber: {
      id: 3000,
      extra: 123,
    },
    extra: 12345,
  });
  subs = await ConvertKitSubscriberCollection.findAll({});
  expect(subs).toHaveLength(1);
  expect(subs[0]).toMatchInlineSnapshot(`
    Object {
      "_id": 3000,
      "isSubscribed": false,
      "isSynced": false,
      "userId": "000000000000000000000001",
    }
  `);
  user = await UserCollection.findByIdOrThrow(getId(1));
  expect(user.notifications).toMatchInlineSnapshot(`
    Object {
      "newContent": false,
      "newsletter": false,
      "subscriptionRemainder": true,
      "webinars": false,
    }
  `);
});
