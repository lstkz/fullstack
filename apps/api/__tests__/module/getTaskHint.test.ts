import { ModuleCollection } from '../../src/collections/Module';
import { getDuration } from '../../src/common/helper';
import { getTask } from '../../src/contracts/module/getTask';
import { getTaskHint } from '../../src/contracts/module/getTaskHint';
import { execContract, setupDb } from '../helper';
import { addSubscription, registerSampleUsers } from '../seed-data';

setupDb();

beforeEach(async () => {
  await registerSampleUsers();
  await addSubscription(1);

  await ModuleCollection.insertMany([
    {
      _id: 'm1',
      name: 'module 1',
      description: 'desc 1',
      isPending: false,
      lessons: [],
      tasks: [
        {
          id: 1,
          name: 'task 1',
          isExample: false,
          detailsS3Key: 'details-1.js',
          sourceS3Key: '',
          htmlS3Key: '1.html',
          hintHtmlS3Key: 'hint',
          testsInfo: {
            files: [],
            resultHash: 'hash',
          },
        },
        {
          id: 2,
          name: 'task 2',
          isExample: false,
          detailsS3Key: 'details-2.js',
          sourceS3Key: '',
          htmlS3Key: '2.html',
          hintHtmlS3Key: null,
          testsInfo: {
            files: [],
            resultHash: 'hash',
          },
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
  await execContract(
    getTask,
    {
      moduleId: 'm1',
      taskId: 1,
    },
    'user1_token'
  );
  Date.now = () => getDuration(2, 'h');
  const ret = await execContract(
    getTaskHint,
    {
      moduleId: 'm1',
      taskId: 1,
    },
    'user1_token'
  );
  expect(ret).toEqual({
    type: 'ok',
    url: 'http://cdn.example.org/hint',
  });
});
