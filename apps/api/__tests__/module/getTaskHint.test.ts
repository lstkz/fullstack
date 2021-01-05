import { ModuleCollection } from '../../src/collections/Module';
import { getDuration } from '../../src/common/helper';
import { getTask } from '../../src/contracts/module/getTask';
import { getTaskHint } from '../../src/contracts/module/getTaskHint';
import { execContract, setupDb } from '../helper';
import {
  addSubscription,
  getModuleData,
  getTaskData,
  registerSampleUsers,
} from '../seed-data';

setupDb();

beforeEach(async () => {
  await registerSampleUsers();
  await addSubscription(1);

  await ModuleCollection.insertMany([
    {
      ...getModuleData(1),
      tasks: [
        {
          ...getTaskData(1),
          videoSolution: null,
        },
        {
          ...getTaskData(2),
          hintHtmlS3Key: null,
          videoSolution: null,
        },
      ],
    },
  ]);
});

it('should throw if no hint', async () => {
  await expect(
    execContract(
      getTaskHint,
      {
        moduleId: 'm1',
        taskId: 2,
      },
      'user1_token'
    )
  ).rejects.toThrow("Task doesn't have a hint");
});

it('should throw if never opened', async () => {
  await expect(
    execContract(
      getTaskHint,
      {
        moduleId: 'm1',
        taskId: 1,
      },
      'user1_token'
    )
  ).rejects.toThrow('Task was never opened');
});

it('should return wait type', async () => {
  Date.now = () => 1000;
  await execContract(
    getTask,
    {
      moduleId: 'm1',
      taskId: 1,
    },
    'user1_token'
  );
  Date.now = () => 2000;
  const ret = await execContract(
    getTaskHint,
    {
      moduleId: 'm1',
      taskId: 1,
    },
    'user1_token'
  );
  expect(ret).toEqual({
    remainingTime: 3599000,
    type: 'wait',
    waitTime: 3600000,
  });
});

it('should return a url', async () => {
  Date.now = () => 1000;
  let task = await execContract(
    getTask,
    {
      moduleId: 'm1',
      taskId: 1,
    },
    'user1_token'
  );
  expect(task.isHintOpened).toEqual(false);
  Date.now = () => getDuration(2, 'h');
  const ret = await execContract(
    getTaskHint,
    {
      moduleId: 'm1',
      taskId: 1,
    },
    'user1_token'
  );
  expect(ret).toMatchInlineSnapshot(`
    Object {
      "type": "ok",
      "url": "http://cdn.example.org/hintHtmlS3Key_1.html",
    }
  `);
  task = await execContract(
    getTask,
    {
      moduleId: 'm1',
      taskId: 1,
    },
    'user1_token'
  );
  expect(task.isHintOpened).toEqual(true);
});
