import { ModuleCollection } from '../../src/collections/Module';
import { TaskScoreCollection } from '../../src/collections/TaskScore';
import { getTask } from '../../src/contracts/module/getTask';
import { getTaskHint } from '../../src/contracts/module/getTaskHint';
import { getTaskVideoSolution } from '../../src/contracts/module/getTaskSolution';
import { execContract, getId, setupDb } from '../helper';
import {
  addSubscription,
  getTaskData,
  registerSampleUsers,
} from '../seed-data';

setupDb();

const params = {
  moduleId: 'm1',
  taskId: 1,
};

const waitStep = 1000 * 60 * 60;

beforeEach(async () => {
  await registerSampleUsers();
  await addSubscription(1);

  await ModuleCollection.insertMany([
    {
      _id: 'm1',
      name: 'module 1',
      description: 'desc 1',
      packageJson: '{}',
      isPending: false,
      estimatedPracticeTimeHours: 1,
      lessons: [],
      tasks: [
        getTaskData(1),
        {
          ...getTaskData(2),
          videoSolution: null,
        },

        getTaskData(3, true),
      ],
    },
  ]);
});

it('should throw if no video solution', async () => {
  await expect(
    execContract(
      getTaskVideoSolution,
      {
        moduleId: 'm1',
        taskId: 2,
      },
      'user1_token'
    )
  ).rejects.toThrow("Task doesn't have a video solution");
});

it('should throw if never opened', async () => {
  await expect(
    execContract(getTaskVideoSolution, params, 'user1_token')
  ).rejects.toThrow('Task was never opened');
});

it('should throw if hint never opened', async () => {
  Date.now = () => 1000;
  await execContract(getTask, params, 'user1_token');
  await expect(
    execContract(getTaskVideoSolution, params, 'user1_token')
  ).rejects.toThrow('Hint was never opened');
});

it('should return wait type', async () => {
  let now = 1000;
  Date.now = () => now;
  await execContract(getTask, params, 'user1_token');
  now += waitStep;
  await execContract(getTaskHint, params, 'user1_token');
  now += 1000;
  const ret = await execContract(getTaskVideoSolution, params, 'user1_token');
  expect(ret).toEqual({
    remainingTime: 3599000,
    type: 'wait',
    waitTime: 3600000,
  });
});

it('should return sources', async () => {
  let now = 1000;
  Date.now = () => now;
  let task = await execContract(getTask, params, 'user1_token');
  expect(task.isSolutionOpened).toEqual(false);
  now += waitStep;
  await execContract(getTaskHint, params, 'user1_token');
  now += waitStep;
  const ret = await execContract(getTaskVideoSolution, params, 'user1_token');
  expect(ret).toEqual({
    type: 'ok',
    sources: [
      {
        type: '720',
        url: 'http://example.org/solution.mp4',
      },
    ],
  });
  task = await execContract(getTask, params, 'user1_token');

  expect(task.isSolutionOpened).toEqual(true);
});

it('should return sources if task is solved', async () => {
  await TaskScoreCollection.insertOne({
    ...params,
    userId: getId(1),
    score: 100,
    scoredAt: new Date(0),
  });
  await execContract(getTask, params, 'user1_token');
  const ret = await execContract(getTaskVideoSolution, params, 'user1_token');
  expect(ret).toEqual({
    type: 'ok',
    sources: [
      {
        type: '720',
        url: 'http://example.org/solution.mp4',
      },
    ],
  });
});

it('should return sources if task is an example', async () => {
  await execContract(
    getTask,
    {
      ...params,
      taskId: 3,
    },
    'user1_token'
  );
  const ret = await execContract(
    getTaskVideoSolution,
    {
      ...params,
      taskId: 3,
    },
    'user1_token'
  );
  expect(ret).toEqual({
    type: 'ok',
    sources: [
      {
        type: '720',
        url: 'http://example.org/solution.mp4',
      },
    ],
  });
});
