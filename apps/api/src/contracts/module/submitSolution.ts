import { config } from 'config';
import { S } from 'schema';
import {
  TaskSolutionCollection,
  TaskSolutionModel,
} from '../../collections/TaskSolution';
import { checkS3KeyExists } from '../../common/aws-helper';
import { AppError } from '../../common/errors';
import { getCurrentDate } from '../../common/helper';
import { DUPLICATED_UNIQUE_VALUE_ERROR_CODE } from '../../common/mongo';
import { createContract, createRpcBinding } from '../../lib';
import { getActiveTask } from './getTask';

export const submitSolution = createContract('module.submitSolution')
  .params('user', 'values')
  .schema({
    user: S.object().appUser(),
    values: S.object().keys({
      moduleId: S.string(),
      taskId: S.number(),
      resultHash: S.string(),
      uploadKey: S.string(),
    }),
  })
  .returns<void>()
  .fn(async (user, values) => {
    const task = await getActiveTask(values.moduleId, values.taskId);
    if (task.testsInfo.resultHash !== values.resultHash) {
      throw new AppError('Invalid resultHash');
    }
    const prefix = ['solutions', user._id.toHexString(), ''].join('/');
    if (!values.uploadKey.startsWith(prefix)) {
      throw new AppError('Invalid uploadKey');
    }
    const isUploaded = await checkS3KeyExists(
      config.aws.s3Bucket,
      values.uploadKey
    );
    if (!isUploaded) {
      throw new AppError('Source not uploaded');
    }
    const solution: TaskSolutionModel = {
      moduleId: values.moduleId,
      taskId: values.taskId,
      userId: user._id,
      solutionS3Key: values.uploadKey,
      solvedAt: getCurrentDate(),
    };
    await TaskSolutionCollection.insertOne(solution).catch(e => {
      if (e.code === DUPLICATED_UNIQUE_VALUE_ERROR_CODE) {
        throw new AppError('UploadKey already used');
      }
    });
  });

export const submitSolutionRpc = createRpcBinding({
  injectUser: true,
  pro: true,
  signature: 'module.submitSolution',
  handler: submitSolution,
});
