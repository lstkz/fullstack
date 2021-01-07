import { ObjectId } from 'mongodb';
import { S } from 'schema';
import { Module } from 'shared';
import { LessonProgressCollection } from '../../collections/LessonProgress';
import { ModuleCollection } from '../../collections/Module';
import { TaskScoreCollection } from '../../collections/TaskScore';
import { renameId } from '../../common/helper';
import { DbCollection } from '../../db';
import { createContract, createRpcBinding } from '../../lib';

interface ModuleResult {
  _id: string;
  name: string;
  description: string;
  isPending: boolean;
  estimatedPracticeTimeHours: number;
  totalTasks: number;
  totalLessons: number;
}

async function _getProgressMap(
  userId: ObjectId | undefined,
  Model: DbCollection<any>,
  filter = {}
) {
  if (!userId) {
    return {};
  }

  const aggregatedItems = await Model.aggregate<{
    _id: string;
    count: number;
  }>([
    {
      $match: {
        userId: userId,
        ...filter,
      },
    },
    {
      $group: {
        _id: '$moduleId',
        count: { $sum: 1 },
      },
    },
  ]);
  const ret: Record<string, number> = {};
  aggregatedItems.forEach(item => {
    ret[item._id] = item.count;
  });
  return ret;
}

async function _getLessonProgressMap(userId?: ObjectId | undefined) {
  return _getProgressMap(userId, LessonProgressCollection, { isWatched: true });
}

async function _getTaskProgressMap(userId?: ObjectId | undefined) {
  return _getProgressMap(userId, TaskScoreCollection);
}

export const getAllModules = createContract('module.getAllModules')
  .params('user')
  .schema({
    user: S.object().appUser().optional(),
  })
  .returns<Module[]>()
  .fn(async user => {
    const modules: Array<ModuleResult> = await ModuleCollection.findAll(
      {},
      {
        projection: {
          name: 1,
          description: 1,
          estimatedPracticeTimeHours: 1,
          isPending: 1,
          totalTasks: { $size: '$tasks' },
          totalLessons: { $size: '$lessons' },
        },
      }
    );
    const [lessonProgressMap, taskProgressMap] = await Promise.all([
      _getLessonProgressMap(user?._id),
      _getTaskProgressMap(user?._id),
    ]);

    return modules.map(module => {
      const total = module.totalLessons + module.totalTasks;
      const userResult =
        (lessonProgressMap[module._id] ?? 0) +
        (taskProgressMap[module._id] ?? 0);
      return {
        ...renameId(module),
        progress: Math.floor((userResult / total) * 100),
      };
    });
  });

export const getAllModulesRpc = createRpcBinding({
  injectUser: true,
  public: true,
  signature: 'module.getAllModules',
  handler: getAllModules,
});
