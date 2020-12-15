import { mocked } from 'ts-jest/utils';
import { AssignedVMCollection } from '../../src/collections/AssignedVM';
import { PreparedTaskCollection } from '../../src/collections/PreparedTask';
import { prepareFolder } from '../../src/contracts/vm/prepareFolder';
import { dispatchTask } from '../../src/dispatch';
import { execContract, setupDb } from '../helper';
import {
  addSubscription,
  createModules,
  createReadyVM,
  registerSampleUsers,
} from '../seed-data';

setupDb();

jest.mock('../../src/dispatch');
const mockedDispatchTask = mocked(dispatchTask);

const params = {
  moduleId: 'm1',
  taskId: 1,
};

beforeEach(async () => {
  await registerSampleUsers();
  await addSubscription(1);
  await createModules();
  await createReadyVM();
  mockedDispatchTask.mockReset();
});

it('should should throw if anonymous', async () => {
  await expect(execContract(prepareFolder, params)).rejects.toThrow(
    'Bearer token required'
  );
});

it('should should throw if not pro', async () => {
  await expect(
    execContract(prepareFolder, params, 'user2_token')
  ).rejects.toThrow('Subscription required');
});

it('should should throw if task not found', async () => {
  await expect(
    execContract(
      prepareFolder,
      {
        moduleId: 'm1',
        taskId: 11234,
      },
      'user1_token'
    )
  ).rejects.toThrow('Task not found');
});

it('should should throw if vm not ready', async () => {
  await AssignedVMCollection.deleteMany({});
  await expect(
    execContract(prepareFolder, params, 'user1_token')
  ).rejects.toThrow('VM is not ready');
});

it('should prepare folder', async () => {
  const ret = await execContract(prepareFolder, params, 'user1_token');
  expect(ret).toEqual({ url: null });
  expect(mockedDispatchTask).toHaveBeenCalledTimes(1);
});

it('parallel test', async () => {
  await Promise.all([
    execContract(prepareFolder, params, 'user1_token'),
    execContract(prepareFolder, params, 'user1_token'),
  ]);
  expect(mockedDispatchTask).toHaveBeenCalledTimes(1);
});

it('should return url', async () => {
  await PreparedTaskCollection.insertOne({
    _id: '444:m1:1',
    folderPath: '/foo/bar',
    preparedAt: new Date(0),
  });
  const ret = await execContract(prepareFolder, params, 'user1_token');
  expect(ret).toEqual({ url: 'https://999.example.org/#/foo/bar' });
  expect(mockedDispatchTask).toHaveBeenCalledTimes(0);
});
