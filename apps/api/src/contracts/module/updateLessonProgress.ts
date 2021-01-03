import { S } from 'schema';
import { LessonProgressCollection } from '../../collections/LessonProgress';
import { ModuleCollection } from '../../collections/Module';
import { AppError } from '../../common/errors';
import { createContract, createRpcBinding } from '../../lib';

async function getLesson(moduleId: string, lessonId: number) {
  const module = await ModuleCollection.findOne(
    {
      _id: moduleId,
      'lessons.id': lessonId,
    },
    {
      projection: {
        isPending: 1,
        'lessons.$': 1,
      },
    }
  );
  if (!module || module.isPending || !module.lessons.length) {
    throw new AppError('Lesson not found');
  }
  if (module.lessons.length > 1) {
    throw new Error('Expected only 1 lessons result');
  }
  return module.lessons[0];
}

export const updateLessonProgress = createContract(
  'module.updateLessonProgress'
)
  .params('user', 'moduleId', 'lessonId', 'values')
  .schema({
    user: S.object().appUser(),
    moduleId: S.string(),
    lessonId: S.number(),
    values: S.object().keys({
      isWatched: S.boolean(),
    }),
  })
  .returns<void>()
  .fn(async (user, moduleId, lessonId, values) => {
    await getLesson(moduleId, lessonId);
    await LessonProgressCollection.findOneAndUpdate(
      {
        moduleId,
        lessonId,
        userId: user._id,
      },
      {
        $set: {
          isWatched: values.isWatched,
        },
      },
      {
        upsert: true,
      }
    );
  });

export const updateLessonProgressRpc = createRpcBinding({
  injectUser: true,
  signature: 'module.updateLessonProgress',
  handler: updateLessonProgress,
});
