import { ModuleCollection } from '../../src/collections/Module';
import { getModule } from '../../src/contracts/module/getModule';
import { updateLessonProgress } from '../../src/contracts/module/updateLessonProgress';
import { execContract, setupDb } from '../helper';
import { getModuleData, registerSampleUsers } from '../seed-data';

setupDb();

beforeEach(async () => {
  await registerSampleUsers();
  await ModuleCollection.insertMany([
    {
      ...getModuleData(1),
      lessons: [
        {
          id: 1,
          name: 'lesson 1',
          sources: [],
        },
        {
          id: 2,
          name: 'lesson 2',
          sources: [],
        },
      ],
    },
    {
      ...getModuleData(2, true),
      lessons: [
        {
          id: 1,
          name: 'lesson 1',
          sources: [],
        },
      ],
    },
  ]);
});

it('should throw if module is pending', async () => {
  await expect(
    execContract(
      updateLessonProgress,
      {
        moduleId: 'm2',
        lessonId: 1,
        values: {
          isWatched: true,
        },
      },
      'user1_token'
    )
  ).rejects.toThrow('Lesson not found');
});

it('should throw if module is not found', async () => {
  await expect(
    execContract(
      updateLessonProgress,
      {
        moduleId: 'm123',
        lessonId: 1,
        values: {
          isWatched: true,
        },
      },
      'user1_token'
    )
  ).rejects.toThrow('Lesson not found');
});

it('should throw if lesson is not found', async () => {
  await expect(
    execContract(
      updateLessonProgress,
      {
        moduleId: 'm1',
        lessonId: 123,
        values: {
          isWatched: true,
        },
      },
      'user1_token'
    )
  ).rejects.toThrow('Lesson not found');
});

it('should update progress', async () => {
  await execContract(
    updateLessonProgress,
    {
      moduleId: 'm1',
      lessonId: 1,
      values: {
        isWatched: true,
      },
    },
    'user1_token'
  );
  const moduleUser1 = await execContract(
    getModule,
    {
      id: 'm1',
    },
    'user1_token'
  );
  expect(moduleUser1.lessons[0].isWatched).toEqual(true);
  const moduleUser2 = await execContract(
    getModule,
    {
      id: 'm1',
    },
    'user2_token'
  );
  expect(moduleUser2.lessons[0].isWatched).toEqual(false);
});
