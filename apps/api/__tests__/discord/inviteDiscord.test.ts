import { mocked } from 'ts-jest/utils';
import { DiscordInviteCollection } from '../../src/collections/DiscordInvite';
import { createDiscordInvite } from '../../src/common/discord';
import { inviteDiscord } from '../../src/contracts/discord/inviteDiscord';
import { dispatchTask } from '../../src/dispatch';
import { getId, setupDb } from '../helper';
import { registerSampleUsers } from '../seed-data';

setupDb();

jest.mock('../../src/common/discord');
jest.mock('../../src/dispatch');

const mocked_createDiscordInvite = mocked(createDiscordInvite);
const mocked_dispatchTask = mocked(dispatchTask);

beforeEach(async () => {
  await registerSampleUsers();
  mocked_createDiscordInvite.mockReset();
  mocked_createDiscordInvite.mockImplementation(async () => ({
    code: '1234',
  }));
  mocked_dispatchTask.mockReset();
});

it('should invite to discord', async () => {
  await inviteDiscord(getId(1));
  const invites = await DiscordInviteCollection.findAll({});
  expect(invites).toHaveLength(1);
  expect(invites[0]._id).toEqual('1234');
  expect(mocked_createDiscordInvite).toBeCalledTimes(1);
  expect(mocked_dispatchTask).toBeCalledTimes(1);
});

it('invite should be ignored if already exists', async () => {
  await inviteDiscord(getId(1));
  await inviteDiscord(getId(1));
  expect(mocked_createDiscordInvite).toBeCalledTimes(1);
  expect(mocked_dispatchTask).toBeCalledTimes(1);
});
