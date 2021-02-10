import { mocked } from 'ts-jest/utils';
import { ConvertKitSubscriberCollection } from '../../src/collections/ConvertKitSubscriber';
import { UserCollection } from '../../src/collections/User';
import {
  addSubscriberToForm,
  getSubscriber,
  tagSubscriber,
  untagSubscriber,
} from '../../src/common/convertKit';
import { syncSubscribers } from '../../src/contracts/convertKit/syncSubscribers';
import { getId, setupDb } from '../helper';
import {
  getAddSubscriberResult,
  getGetSubscriberResult,
  registerSampleUsers,
} from '../seed-data';

jest.mock('../../src/dispatch');
jest.mock('../../src/common/convertKit');
const mocked_addSubscriberToForm = mocked(addSubscriberToForm);
const mocked_tagSubscriber = mocked(tagSubscriber);
const mocked_untagSubscriber = mocked(untagSubscriber);
const mocked_getSubscriber = mocked(getSubscriber);

setupDb();

const SUBSCRIBER_ID = 3000;

beforeEach(async () => {
  await registerSampleUsers();
  mocked_addSubscriberToForm.mockClear();
  mocked_tagSubscriber.mockClear();
  mocked_untagSubscriber.mockClear();
  mocked_getSubscriber.mockClear();
  mocked_addSubscriberToForm.mockImplementation(async () =>
    getAddSubscriberResult(SUBSCRIBER_ID)
  );
  mocked_getSubscriber.mockImplementation(async () =>
    getGetSubscriberResult(SUBSCRIBER_ID)
  );
});

it('should do nothing if nothing to sync', async () => {
  await ConvertKitSubscriberCollection.insertOne({
    _id: SUBSCRIBER_ID,
    isSubscribed: true,
    isSynced: true,
    userId: getId(1),
  });
  await syncSubscribers();
  expect(mocked_addSubscriberToForm).not.toBeCalled();
  expect(mocked_tagSubscriber).not.toBeCalled();
  expect(mocked_untagSubscriber).not.toBeCalled();
  expect(mocked_getSubscriber).not.toBeCalled();
});

it('should resubscribe and add tags', async () => {
  await ConvertKitSubscriberCollection.insertOne({
    _id: SUBSCRIBER_ID,
    isSubscribed: false,
    isSynced: false,
    userId: getId(1),
  });
  await syncSubscribers();
  expect(mocked_addSubscriberToForm).toBeCalled();
  expect(mocked_getSubscriber).toBeCalledWith(SUBSCRIBER_ID);
  expect(mocked_untagSubscriber).not.toBeCalled();
  expect(mocked_tagSubscriber.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        2,
        "user1@example.com",
      ],
      Array [
        1,
        "user1@example.com",
      ],
      Array [
        3,
        "user1@example.com",
      ],
    ]
  `);
  const sub = await ConvertKitSubscriberCollection.findOne({});
  expect(sub?.isSynced).toBe(true);
});

it('should add tags and remove tags', async () => {
  await UserCollection.findOneAndUpdate(
    {
      _id: getId(1),
    },
    {
      $set: {
        notifications: {
          newContent: false,
          newsletter: false,
          subscriptionRemainder: true,
          webinars: true,
        },
      },
    }
  );
  await ConvertKitSubscriberCollection.insertOne({
    _id: SUBSCRIBER_ID,
    isSubscribed: true,
    isSynced: false,
    userId: getId(1),
  });
  await syncSubscribers();
  expect(mocked_addSubscriberToForm).not.toBeCalled();
  expect(mocked_getSubscriber).not.toBeCalled();
  expect(mocked_untagSubscriber.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        2,
        "user1@example.com",
      ],
      Array [
        1,
        "user1@example.com",
      ],
    ]
  `);
  expect(mocked_tagSubscriber.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        3,
        "user1@example.com",
      ],
    ]
  `);
  const sub = await ConvertKitSubscriberCollection.findOne({});
  expect(sub?.isSynced).toBe(true);
});

it('should resubscribe, but not active', async () => {
  await ConvertKitSubscriberCollection.insertOne({
    _id: SUBSCRIBER_ID,
    isSubscribed: false,
    isSynced: false,
    userId: getId(1),
  });
  mocked_getSubscriber.mockImplementation(async () =>
    getGetSubscriberResult(SUBSCRIBER_ID, 'cancelled')
  );
  await syncSubscribers();
  expect(mocked_getSubscriber).toBeCalled();
  expect(mocked_untagSubscriber).not.toBeCalled();
  expect(mocked_tagSubscriber).not.toBeCalled();
  const sub = await ConvertKitSubscriberCollection.findOne({});
  expect(sub?.isSynced).toBe(false);
});
