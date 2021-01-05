import { config } from 'config';
import { S } from 'schema';
import { TaskHintResult } from 'shared';
import { UserTaskTimeInfoCollection } from '../../collections/UserTaskTimeInfo';
import { AppError } from '../../common/errors';
import {
  checkIsTaskSolved,
  getCurrentDate,
  getRemainingTimeResult,
} from '../../common/helper';
import { createContract, createRpcBinding } from '../../lib';
import { getActiveTask } from './getTask';

export const getTaskHint = createContract('module.getTaskHint')
  .params('user', 'moduleId', 'taskId')
  .schema({
    user: S.object().appUser(),
    moduleId: S.string(),
    taskId: S.number(),
  })
  .returns<TaskHintResult>()
  .fn(async (user, moduleId, taskId) => {
    const task = await getActiveTask(moduleId, taskId);
    if (!task.hintHtmlS3Key) {
      throw new AppError(`Task doesn't have a hint`);
    }
    const isSolved = await checkIsTaskSolved(user._id, moduleId, taskId);
    const timeInfo = await UserTaskTimeInfoCollection.findOne({
      moduleId,
      taskId,
      userId: user._id,
    });
    if (!timeInfo || !timeInfo.openedAt) {
      throw new AppError(`Task was never opened`);
    }
    if (!isSolved) {
      if (!timeInfo.hintViewedAt) {
        timeInfo.hintViewedAt = getCurrentDate();
        await UserTaskTimeInfoCollection.update(timeInfo, ['hintViewedAt']);
      }
      const remainingResult = getRemainingTimeResult(timeInfo.openedAt);
      if (remainingResult) {
        return remainingResult;
      }
    }
    return {
      type: 'ok',
      url: config.cdnBaseUrl + '/' + task.hintHtmlS3Key,
    };
  });

export const getTaskHintRpc = createRpcBinding({
  pro: true,
  injectUser: true,
  signature: 'module.getTaskHint',
  handler: getTaskHint,
});
