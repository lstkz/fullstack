import { mocked } from 'ts-jest/utils';
import { AssignedVMCollection } from '../../src/collections/AssignedVM';
import { getInstanceByTag, runInstance } from '../../src/common/aws-helper';
import { vmStep1CreateTask } from '../../src/contracts/vm/vmStep1CreateTask';
import { dispatchTask } from '../../src/dispatch';
import { getId, setupDb } from '../helper';
import { createModules, registerSampleUsers } from '../seed-data';

setupDb();

jest.mock('../../src/dispatch');
const mockedDispatchTask = mocked(dispatchTask);
jest.mock('../../src/common/aws-helper');
const mockedGetInstanceByTag = mocked(getInstanceByTag);
const mockedRunInstance = mocked(runInstance);

beforeEach(async () => {
  await registerSampleUsers();
  await createModules();
  await AssignedVMCollection.insertOne({
    _id: `100`,
    tagId: '123',
    userId: getId(1),
    isReady: false,
  });
  mockedDispatchTask.mockReset();
  mockedGetInstanceByTag.mockReset();
  mockedRunInstance.mockReset();
  mockedRunInstance.mockImplementation(async () => ({
    InstanceId: '1010',
    LaunchTime: new Date(0),
  }));
});

it('should run an instance', async () => {
  await vmStep1CreateTask.options.handler('123', { vmId: '100' });
  expect(mockedGetInstanceByTag).toBeCalledWith('fsID', '123');
  expect(mockedDispatchTask).toBeCalled();
  expect(mockedRunInstance).toBeCalled();
  const vm = await AssignedVMCollection.findOne({});
  expect(vm?.awsId).toEqual('1010');
  expect(vm?.launchTime).toEqual(new Date(0));
});

it('should run an instance (already exists)', async () => {
  mockedGetInstanceByTag.mockImplementation(async () => ({
    InstanceId: '1010',
    LaunchTime: new Date(0),
  }));
  await vmStep1CreateTask.options.handler('123', { vmId: '100' });
  expect(mockedRunInstance).not.toBeCalled();
  const vm = await AssignedVMCollection.findOne({});
  expect(vm?.awsId).toEqual('1010');
  expect(vm?.launchTime).toEqual(new Date(0));
});
