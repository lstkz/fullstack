import { S } from 'schema';
import { TaskVideoResult } from 'shared';
import { UserTaskTimeInfoCollection } from '../../collections/UserTaskTimeInfo';
import { AppError } from '../../common/errors';
import { getCurrentDate, getDuration } from '../../common/helper';
import { createContract, createRpcBinding } from '../../lib';
import { getActiveTask } from './getTask';

const minTime = getDuration(1, 'h');

export const getTaskVideoSolution = createContract(
  'module.getTaskVideoSolution'
)
  .params('user', 'moduleId', 'taskId')
  .schema({
    user: S.object().appUser(),
    moduleId: S.string(),
    taskId: S.number(),
  })
  .returns<TaskVideoResult>()
  .fn(async (user, moduleId, taskId) => {
    const task = await getActiveTask(moduleId, taskId);
    if (!task.videoSolution) {
      throw new AppError(`Task doesn't have a video solution`);
    }
    const timeInfo = await UserTaskTimeInfoCollection.findOne({
      moduleId,
      taskId,
      userId: user._id,
    });
    if (!timeInfo || !timeInfo.openedAt) {
      throw new AppError(`Task was never opened`);
    }
    if (!timeInfo.hintViewedAt) {
      throw new AppError(`Hint was never opened`);
    }
    if (!timeInfo.solutionViewedAt) {
      timeInfo.solutionViewedAt = getCurrentDate();
      await UserTaskTimeInfoCollection.update(timeInfo, ['solutionViewedAt']);
    }
    const remainingTime =
      timeInfo.hintViewedAt.getTime() + minTime - Date.now();
    if (remainingTime > 0) {
      return {
        type: 'wait',
        waitTime: minTime,
        remainingTime: remainingTime,
      };
    }
    return {
      type: 'ok',
      sources: task.videoSolution,
    };
  });

export const getTaskVideoSolutionRpc = createRpcBinding({
  pro: true,
  injectUser: true,
  signature: 'module.getTaskVideoSolution',
  handler: getTaskVideoSolution,
});
