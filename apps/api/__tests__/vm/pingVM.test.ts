import { AssignedVMCollection } from '../../src/collections/AssignedVM';
import { pingVM } from '../../src/contracts/vm/pingVM';
import { execContract, setupDb } from '../helper';
import { addSubscription, createVM, registerSampleUsers } from '../seed-data';

setupDb();

beforeEach(async () => {
  await registerSampleUsers();
  await addSubscription(1);
});

it('should should throw if not pro', async () => {
  await expect(execContract(pingVM, {}, 'user2_token')).rejects.toThrow(
    'Subscription required'
  );
});

it('should ignore if not running', async () => {
  await createVM('creating');
  await execContract(pingVM, {}, 'user1_token');
  const vm = await AssignedVMCollection.findOne({});
  expect(vm?.lastPingTime).toEqual(new Date(0));
});

it('should update time', async () => {
  Date.now = () => 123;
  await createVM('running');
  await execContract(pingVM, {}, 'user1_token');

  const vm = await AssignedVMCollection.findOne({});
  expect(vm?.lastPingTime?.getTime()).toEqual(123);
});
