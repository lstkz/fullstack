import { config } from 'config';
import { ModuleCollection } from '../../src/collections/Module';
import { getTask } from '../../src/contracts/module/getTask';
import { execContract, setupDb } from '../helper';
import { addSubscription, registerSampleUsers } from '../seed-data';

setupDb();

beforeEach(async () => {
  config.cdnBaseUrl = 'https://example.org';

  await registerSampleUsers();
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
          testsInfo: {
            files: [],
            resultHash: 'hash',
          },
        },
      ],
    },
    {
      _id: 'm2',
      name: 'module 2',
      description: 'desc 2',
      isPending: true,
      lessons: [],
      tasks: [
        {
          id: 1,
          name: 'task 1 - module 2',
          isExample: false,
          detailsS3Key: 'details-3.js',
          sourceS3Key: '',
          testsInfo: {
            files: [],
            resultHash: 'hash',
          },
        },
      ],
    },
  ]);
  await addSubscription(1);
});

it('should throw if not pro', async () => {
  await expect(
    execContract(
      getTask,
      {
        moduleId: 'abc',
        taskId: 1,
      },
      'user2_token'
    )
  ).rejects.toThrow('Subscription required');
});

it('should throw if module not found (invalid id)', async () => {
  await expect(
    execContract(
      getTask,
      {
        moduleId: 'abc',
        taskId: 1,
      },
      'user1_token'
    )
  ).rejects.toThrow('Task not found');
});

it('should throw if module not found (invalid taskId)', async () => {
  await expect(
    execContract(
      getTask,
      {
        moduleId: 'm1',
        taskId: 10,
      },
      'user1_token'
    )
  ).rejects.toThrow('Task not found');
});

it('should return a task', async () => {
  const task = await execContract(
    getTask,
    {
      moduleId: 'm1',
      taskId: 2,
    },
    'user1_token'
  );
  expect(task).toMatchInlineSnapshot(`
    Object {
      "detailsUrl": "https://example.org/details-2.js",
      "id": 2,
      "isExample": false,
      "moduleId": "m1",
      "name": "task 2",
    }
  `);
});
