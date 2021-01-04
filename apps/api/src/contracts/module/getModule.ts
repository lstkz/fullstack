import { S } from 'schema';
import * as R from 'remeda';
import { ModuleDetails } from 'shared';
import { LessonProgressCollection } from '../../collections/LessonProgress';
import { ModuleCollection } from '../../collections/Module';
import { AppError } from '../../common/errors';
import { createContract, createRpcBinding } from '../../lib';
import { ObjectId } from 'mongodb';
import { TaskSolutionCollection } from '../../collections/TaskSolution';
import { TaskPracticeTimeCollection } from '../../collections/TaskPracticeTime';

async function _getLessonProgressMap(
  moduleId: string,
  userId: ObjectId | undefined
) {
  if (!userId) {
    return {};
  }
  const items = await LessonProgressCollection.findAll({
    userId: userId,
    moduleId: moduleId,
  });
  return R.indexBy(items, x => x.lessonId);
}

async function _getTaskSolvedMap(
  moduleId: string,
  userId: ObjectId | undefined
) {
  if (!userId) {
    return {};
  }
  const items = await TaskSolutionCollection.findAll({
    userId: userId,
    moduleId: moduleId,
  });
  return R.indexBy(items, x => x.taskId);
}

async function _getTaskPracticeTime(
  moduleId: string,
  userId: ObjectId | undefined
) {
  if (!userId) {
    return {};
  }
  const items = await TaskPracticeTimeCollection.findAll({
    userId: userId,
    moduleId: moduleId,
  });
  return R.indexBy(items, x => x.taskId);
}

export const getModule = createContract('module.getModule')
  .params('user', 'id')
  .schema({
    user: S.object().appUser().optional(),
    id: S.string(),
  })
  .returns<ModuleDetails>()
  .fn(async (user, id) => {
    const module = await ModuleCollection.findById(id);
    if (!module) {
      throw new AppError('Module not found: ' + id);
    }
    if (module.isPending) {
      throw new AppError('Module is pending');
    }
    const [
      lessonProgressMap,
      taskSolvedMap,
      practiceTimeMap,
    ] = await Promise.all([
      _getLessonProgressMap(id, user?._id),
      _getTaskSolvedMap(id, user?._id),
      _getTaskPracticeTime(id, user?._id),
    ]);
    return {
      id: module._id,
      name: module.name,
      description: module.description,
      lessons: module.lessons.map(item => ({
        id: item.id,
        name: item.name,
        sources: item.sources,
        isWatched: lessonProgressMap[item.id]?.isWatched ?? false,
      })),
      tasks: module.tasks.map(item => ({
        id: item.id,
        name: item.name,
        isExample: item.isExample,
        isSolved: !!taskSolvedMap[item.id],
        practiceTime: practiceTimeMap[item.id]?.totalTimeMinutes ?? 0,
      })),
    };
  });

export const getModuleRpc = createRpcBinding({
  public: true,
  injectUser: true,
  signature: 'module.getModule',
  handler: getModule,
});
