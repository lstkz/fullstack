import { LessonProgressCollection } from '../../src/collections/LessonProgress';
import { ModuleCollection } from '../../src/collections/Module';
import { TaskScoreCollection } from '../../src/collections/TaskScore';
import { getAllModules } from '../../src/contracts/module/getAllModules';
import { execContract, getId, setupDb } from '../helper';
import { getModuleData, getTaskData, registerSampleUsers } from '../seed-data';

setupDb();

beforeEach(async () => {
  await registerSampleUsers();
  await ModuleCollection.insertMany([
    {
      ...getModuleData(1),
      lessons: [
        {
          id: 1,
          name: 'l1',
          duration: '1:00',
          sources: [],
        },
        {
          id: 2,
          name: 'l2',
          duration: '1:00',
          sources: [],
        },
      ],
      tasks: [getTaskData(1), getTaskData(2)],
    },
    {
      ...getModuleData(2, true),
      lessons: [
        {
          id: 1,
          name: 'l1',
          duration: '1:00',
          sources: [],
        },
      ],
      tasks: [getTaskData(1)],
    },
  ]);
});

it('should return all modules as anonymous', async () => {
  const ret = await execContract(getAllModules, {});
  expect(ret).toMatchInlineSnapshot(`
    Array [
      Object {
        "description": "desc 1",
        "estimatedPracticeTimeHours": 10,
        "id": "m1",
        "isPending": false,
        "name": "module 1",
        "progress": 0,
        "totalLessons": 2,
        "totalTasks": 2,
      },
      Object {
        "description": "desc 2",
        "estimatedPracticeTimeHours": 20,
        "id": "m2",
        "isPending": true,
        "name": "module 2",
        "progress": 0,
        "totalLessons": 1,
        "totalTasks": 1,
      },
    ]
  `);
});

it('should return all modules as logged in', async () => {
  const ret = await execContract(getAllModules, {}, 'user1_token');
  expect(ret).toMatchInlineSnapshot(`
    Array [
      Object {
        "description": "desc 1",
        "estimatedPracticeTimeHours": 10,
        "id": "m1",
        "isPending": false,
        "name": "module 1",
        "progress": 0,
        "totalLessons": 2,
        "totalTasks": 2,
      },
      Object {
        "description": "desc 2",
        "estimatedPracticeTimeHours": 20,
        "id": "m2",
        "isPending": true,
        "name": "module 2",
        "progress": 0,
        "totalLessons": 1,
        "totalTasks": 1,
      },
    ]
  `);
});

it('should return all modules as logged in with lesson progress', async () => {
  await LessonProgressCollection.insertMany([
    {
      userId: getId(1),
      isWatched: true,
      lessonId: 1,
      moduleId: 'm1',
    },
    {
      userId: getId(1),
      isWatched: false,
      lessonId: 2,
      moduleId: 'm1',
    },
  ]);
  const ret = await execContract(getAllModules, {}, 'user1_token');
  expect(ret[0].progress).toEqual(25);
  expect(ret[1].progress).toEqual(0);
});

it('should return all modules as logged in with task progress', async () => {
  await TaskScoreCollection.insertMany([
    {
      userId: getId(1),
      score: 100,
      scoredAt: new Date(0),
      taskId: 1,
      moduleId: 'm1',
    },
  ]);
  const ret = await execContract(getAllModules, {}, 'user1_token');
  expect(ret[0].progress).toEqual(25);
  expect(ret[1].progress).toEqual(0);
});
