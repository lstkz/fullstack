import { PreparedTaskCollection } from '../../src/collections/PreparedTask';
import { prepareFolderTask } from '../../src/contracts/vm/prepareFolderTask';
import { getId, setupDb } from '../helper';
import {
  addSubscription,
  createModules,
  createReadyVM,
  registerSampleUsers,
} from '../seed-data';

setupDb();

jest.mock('../../src/common/vm-helper');

beforeEach(async () => {
  await registerSampleUsers();
  await addSubscription(1);
  await createModules();
  await createReadyVM();
});

it('should should prepare task', async () => {
  await PreparedTaskCollection.insertOne({
    _id: '444:m1:1',
  });
  await prepareFolderTask.options.handler('123', {
    assignedVMId: `default-${getId(1)}`,
    moduleId: 'm1',
    taskId: 1,
    userId: getId(1).toHexString(),
  });
  const task = await PreparedTaskCollection.findOne({});
  expect(task?.folderPath).toEqual('/home/ubuntu/m1/1');
});
