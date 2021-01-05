import { mocked } from 'ts-jest/utils';
import { ModuleCollection } from '../../src/collections/Module';
import { TaskScoreCollection } from '../../src/collections/TaskScore';
import { TaskSolutionCollection } from '../../src/collections/TaskSolution';
import { UserTaskTimeInfoCollection } from '../../src/collections/UserTaskTimeInfo';
import { checkS3KeyExists } from '../../src/common/aws-helper';
import { submitSolution } from '../../src/contracts/module/submitSolution';
import { dispatchSocketMsg } from '../../src/dispatch';
import { execContract, getId, setupDb } from '../helper';
import {
  addSubscription,
  getModuleData,
  getTaskData,
  registerSampleUsers,
} from '../seed-data';

jest.mock('../../src/common/aws-helper');
jest.mock('../../src/dispatch');
const mocked_checkS3KeyExists = mocked(checkS3KeyExists);
const mocked_dispatchSocketMsg = mocked(dispatchSocketMsg);

setupDb();

function getDefaultParams() {
  return {
    moduleId: 'm1',
    taskId: 1,
    resultHash: 'hash123',
    uploadKey: `solutions/${getId(1)}/kdjkam.tar.gz`,
  };
}

let params = getDefaultParams();

beforeEach(async () => {
  params = getDefaultParams();
  await registerSampleUsers();
  await addSubscription(1);
  await ModuleCollection.insertMany([
    {
      ...getModuleData(1),
      tasks: [getTaskData(1, true), getTaskData(2)],
    },
  ]);
  mocked_checkS3KeyExists.mockImplementation(async () => true);
  mocked_dispatchSocketMsg.mockReset();
});

it('should throw if not pro', async () => {
  await expect(
    execContract(
      submitSolution,
      {
        values: params,
      },
      'user2_token'
    )
  ).rejects.toThrow('Subscription required');
});

it('should throw if not invalid hash', async () => {
  await expect(
    execContract(
      submitSolution,
      {
        values: {
          ...params,
          resultHash: 'aaaaa',
        },
      },
      'user1_token'
    )
  ).rejects.toThrow('Invalid resultHash');
});

it('should throw if not invalid upload key', async () => {
  await expect(
    execContract(
      submitSolution,
      {
        values: {
          ...params,
          uploadKey: 'aaaaa',
        },
      },
      'user1_token'
    )
  ).rejects.toThrow('Invalid uploadKey');
});

it('should throw if not invalid upload key (wrong user)', async () => {
  await expect(
    execContract(
      submitSolution,
      {
        values: {
          ...params,
          uploadKey: `solutions/${getId(2)}/kdjkam.tar.gz`,
        },
      },
      'user1_token'
    )
  ).rejects.toThrow('Invalid uploadKey');
});

it('should throw if source not uploaded', async () => {
  mocked_checkS3KeyExists.mockImplementation(async () => false);
  await expect(
    execContract(
      submitSolution,
      {
        values: {
          ...params,
          uploadKey: `solutions/${getId(2)}/kdjkam.tar.gz`,
        },
      },
      'user1_token'
    )
  ).rejects.toThrow('Invalid uploadKey');
});

it('should submit solution successfully (example)', async () => {
  await execContract(
    submitSolution,
    {
      values: params,
    },
    'user1_token'
  );
  const existing = await TaskSolutionCollection.findOne({});
  expect(existing?.userId.toHexString()).toEqual(getId(1).toHexString());
  expect(mocked_dispatchSocketMsg.mock.calls[0][0].payload.score).toEqual(0);
  const taskScore = await TaskScoreCollection.findOne({});
  expect(taskScore?.score).toEqual(0);
});

it('should submit solution successfully (100 score)', async () => {
  await execContract(
    submitSolution,
    {
      values: {
        ...params,
        taskId: 2,
      },
    },
    'user1_token'
  );
  expect(mocked_dispatchSocketMsg.mock.calls[0][0].payload.score).toEqual(100);
  const taskScore = await TaskScoreCollection.findOne({});
  expect(taskScore?.score).toEqual(100);
});

it('should submit solution successfully (50 score)', async () => {
  await UserTaskTimeInfoCollection.insertOne({
    moduleId: params.moduleId,
    taskId: 2,
    userId: getId(1),
    hintViewedAt: new Date(0),
  });
  await execContract(
    submitSolution,
    {
      values: {
        ...params,
        taskId: 2,
      },
    },
    'user1_token'
  );
  expect(mocked_dispatchSocketMsg.mock.calls[0][0].payload.score).toEqual(50);
  const taskScore = await TaskScoreCollection.findOne({});
  expect(taskScore?.score).toEqual(50);
});

it('should submit solution successfully (1 score)', async () => {
  await UserTaskTimeInfoCollection.insertOne({
    moduleId: params.moduleId,
    taskId: 2,
    userId: getId(1),
    hintViewedAt: new Date(0),
    solutionViewedAt: new Date(10),
  });
  await execContract(
    submitSolution,
    {
      values: {
        ...params,
        taskId: 2,
      },
    },
    'user1_token'
  );
  expect(mocked_dispatchSocketMsg.mock.calls[0][0].payload.score).toEqual(1);
  const taskScore = await TaskScoreCollection.findOne({});
  expect(taskScore?.score).toEqual(1);
});

it('should should throw if upload key is duplicated', async () => {
  await execContract(
    submitSolution,
    {
      values: params,
    },
    'user1_token'
  );
  await expect(
    execContract(
      submitSolution,
      {
        values: params,
      },
      'user1_token'
    )
  ).rejects.toThrow('UploadKey already used');
});
