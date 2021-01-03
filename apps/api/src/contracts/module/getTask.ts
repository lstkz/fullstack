import { config } from 'config';
import { S } from 'schema';
import { ModuleTaskDetails } from 'shared';
import { ModuleCollection } from '../../collections/Module';
import { TaskSolutionCollection } from '../../collections/TaskSolution';
import { AppError } from '../../common/errors';
import { createContract, createRpcBinding } from '../../lib';

export async function getActiveTask(moduleId: string, taskId: number) {
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
    throw new AppError('Task not found');
  }
  if (module.tasks.length > 1) {
    throw new Error('Expected only 1 task result');
  }

  return module.tasks[0];
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
    const [task, solvedTask] = await Promise.all([
      getActiveTask(moduleId, taskId),
      TaskSolutionCollection.findOne({
        moduleId,
        taskId,
        userId: user._id,
      }),
    ]);
    return {
      id: task.id,
      moduleId,
      isSolved: solvedTask != null,
      name: task.name,
      isExample: task.isExample,
      detailsUrl: config.cdnBaseUrl + '/' + task.detailsS3Key,
      htmlUrl: config.cdnBaseUrl + '/' + task.htmlS3Key,
    };
  });

export const getTaskRpc = createRpcBinding({
  pro: true,
  injectUser: true,
  signature: 'module.getTask',
  handler: getTask,
});
