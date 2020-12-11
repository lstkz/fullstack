import { config } from 'config';
import { S } from 'schema';
import { ModuleTaskDetails } from 'shared';
import { ModuleCollection } from '../../collections/Module';
import { AppError } from '../../common/errors';
import { createContract, createRpcBinding } from '../../lib';

export const getTask = createContract('module.getTask')
  .params('user', 'moduleId', 'taskId')
  .schema({
    user: S.object().appUser(),
    moduleId: S.string(),
    taskId: S.number(),
  })
  .returns<ModuleTaskDetails>()
  .fn(async (user, moduleId, taskId) => {
    const module = await ModuleCollection.findOne(
      {
        _id: moduleId,
        'tasks.id': taskId,
      },
      {
        projection: {
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
    const task = module.tasks[0];
    return {
      id: task.id,
      name: task.name,
      isExample: task.isExample,
      detailsUrl: config.cdnBaseUrl + '/' + task.detailsS3Key,
    };
  });

export const getTaskRpc = createRpcBinding({
  injectUser: true,
  signature: 'module.getTask',
  handler: getTask,
});
