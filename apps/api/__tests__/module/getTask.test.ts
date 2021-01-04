import { config } from 'config';
import { ModuleCollection } from '../../src/collections/Module';
import { UserTaskTimeInfoCollection } from '../../src/collections/UserTaskTimeInfo';
import { getTask } from '../../src/contracts/module/getTask';
import { execContract, getId, setupDb } from '../helper';
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
          htmlS3Key: '1.html',
          hintHtmlS3Key: null,
          videoSolution: null,
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
          videoSolution: null,
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
          htmlS3Key: '3.html',
          hintHtmlS3Key: null,
          videoSolution: null,
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
      "hasHint": false,
      "htmlUrl": "https://example.org/2.html",
      "id": 2,
      "isExample": false,
      "isHintOpened": false,
      "isSolutionOpened": false,
      "isSolved": false,
      "moduleId": "m1",
      "name": "task 2",
      "nextTask": null,
    }
  `);
});

it('should return a task (with next)', async () => {
  const task = await execContract(
    getTask,
    {
      moduleId: 'm1',
      taskId: 1,
    },
    'user1_token'
  );
  expect(task).toMatchInlineSnapshot(`
    Object {
      "detailsUrl": "https://example.org/details-1.js",
      "hasHint": false,
      "htmlUrl": "https://example.org/1.html",
      "id": 1,
      "isExample": false,
      "isHintOpened": false,
      "isSolutionOpened": false,
      "isSolved": false,
      "moduleId": "m1",
      "name": "task 1",
      "nextTask": Object {
        "id": 2,
        "isExample": false,
        "isSolved": false,
        "name": "task 2",
      },
    }
  `);
});

it('should return with isHintOpened = true', async () => {
  await UserTaskTimeInfoCollection.insertOne({
    moduleId: 'm1',
    taskId: 1,
    userId: getId(1),
    openedAt: new Date(0),
    hintViewedAt: new Date(100),
  });
  const task = await execContract(
    getTask,
    {
      moduleId: 'm1',
      taskId: 1,
    },
    'user1_token'
  );
  expect(task.isHintOpened).toEqual(true);
  expect(task.isSolutionOpened).toEqual(false);
});

it('should return with isSolutionOpened = true', async () => {
  await UserTaskTimeInfoCollection.insertOne({
    moduleId: 'm1',
    taskId: 1,
    userId: getId(1),
    openedAt: new Date(0),
    hintViewedAt: new Date(100),
    solutionViewedAt: new Date(200),
  });
  const task = await execContract(
    getTask,
    {
      moduleId: 'm1',
      taskId: 1,
    },
    'user1_token'
  );
  expect(task.isHintOpened).toEqual(true);
  expect(task.isSolutionOpened).toEqual(true);
});
