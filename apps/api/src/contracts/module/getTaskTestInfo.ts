import { config } from 'config';
import { S } from 'schema';
import { TaskTestInfo } from 'shared';
import { createContract, createRpcBinding } from '../../lib';
import { getActiveTask } from './getTask';

export const getTaskTestInfo = createContract('module.getTaskTestInfo')
  .params('moduleId', 'taskId')
  .schema({
    moduleId: S.string(),
    taskId: S.number(),
  })
  .returns<TaskTestInfo>()
  .fn(async (moduleId, taskId) => {
    const task = await getActiveTask(moduleId, taskId);
    const sourceUrl = config.cdnBaseUrl + '/' + task.sourceS3Key;
    return {
      testFiles: task.testsInfo.files,
      sourceUrl,
    };
  });

export const getTaskTestInfoRpc = createRpcBinding({
  pro: true,
  signature: 'module.getTaskTestInfo',
  handler: getTaskTestInfo,
});
