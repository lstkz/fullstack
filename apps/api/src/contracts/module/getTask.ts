import { config } from 'config';
import { ObjectId } from 'mongodb';
import * as R from 'remeda';
import { S } from 'schema';
import { ModuleTaskDetails } from 'shared';
import { ModuleCollection } from '../../collections/Module';
import { TaskSolutionCollection } from '../../collections/TaskSolution';
import { UserTaskTimeInfoCollection } from '../../collections/UserTaskTimeInfo';
import { AppError } from '../../common/errors';
import { getCurrentDate } from '../../common/helper';
import { createContract, createRpcBinding } from '../../lib';

export async function getActiveTaskOrNull(moduleId: string, taskId: number) {
  const module = await ModuleCollection.findOne(
    {
      _id: moduleId,
      'tasks.id': taskId,
    },
    {
      projection: {
        isPending: 1,
        'tasks.$': 1,
      },
    }
  );
  if (!module || module.isPending || !module.tasks.length) {
    return null;
  }
  if (module.tasks.length > 1) {
    throw new Error('Expected only 1 task result');
  }

  return module.tasks[0];
}

export async function getActiveTask(moduleId: string, taskId: number) {
  const task = await getActiveTaskOrNull(moduleId, taskId);
  if (!task) {
    throw new AppError('Task not found');
  }
  return task;
}

async function _getIsSolved(
  moduleId: string,
  taskId: number,
  userId: ObjectId
) {
  const solvedTask = await TaskSolutionCollection.findOne({
    moduleId,
    taskId,
    userId,
  });
  return !!solvedTask;
}

async function _getNextTask(
  moduleId: string,
  nextTaskId: number,
  userId: ObjectId
) {
  const [nextTask, isSolved] = await Promise.all([
    getActiveTaskOrNull(moduleId, nextTaskId),
    _getIsSolved(moduleId, nextTaskId, userId),
  ]);
  if (!nextTask) {
    return null;
  }
  return {
    ...R.pick(nextTask, ['id', 'name', 'isExample']),
    isSolved,
  };
}

async function _setOpened(moduleId: string, taskId: number, userId: ObjectId) {
  const ret = await UserTaskTimeInfoCollection.findOneAndUpdate(
    {
      moduleId,
      taskId,
      userId,
    },
    {
      $setOnInsert: {
        openedAt: getCurrentDate(),
      },
    },
    {
      upsert: true,
      returnOriginal: false,
    }
  );
  return ret.value!;
}

export const getTask = createContract('module.getTask')
  .params('user', 'moduleId', 'taskId')
  .schema({
    user: S.object().appUser(),
    moduleId: S.string(),
    taskId: S.number(),
  })
  .returns<ModuleTaskDetails>()
  .fn(async (user, moduleId, taskId) => {
    const [task, isSolved, taskInfo] = await Promise.all([
      getActiveTask(moduleId, taskId),
      _getIsSolved(moduleId, taskId, user._id),
      _setOpened(moduleId, taskId, user._id),
    ]);
    return {
      id: task.id,
      moduleId,
      isSolved,
      name: task.name,
      isExample: task.isExample,
      detailsUrl: config.cdnBaseUrl + '/' + task.detailsS3Key,
      htmlUrl: config.cdnBaseUrl + '/' + task.htmlS3Key,
      hasHint: task.hintHtmlS3Key != null,
      hasVideoSolution: task.videoSolution != null,
      isHintOpened: taskInfo.hintViewedAt != null,
      isSolutionOpened: taskInfo.solutionViewedAt != null,
      nextTask: await _getNextTask(moduleId, taskId + 1, user._id),
    };
  });

export const getTaskRpc = createRpcBinding({
  pro: true,
  injectUser: true,
  signature: 'module.getTask',
  handler: getTask,
});
