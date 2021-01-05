import { config } from 'config';
import { ObjectId } from 'mongodb';
import { S } from 'schema';
import { TaskScoreCollection } from '../../collections/TaskScore';
import {
  TaskSolutionCollection,
  TaskSolutionModel,
} from '../../collections/TaskSolution';
import { UserTaskTimeInfoCollection } from '../../collections/UserTaskTimeInfo';
import { checkS3KeyExists } from '../../common/aws-helper';
import { AppError } from '../../common/errors';
import { getCurrentDate } from '../../common/helper';
import { DUPLICATED_UNIQUE_VALUE_ERROR_CODE } from '../../common/mongo';
import { withTransaction } from '../../db';
import { dispatchSocketMsg } from '../../dispatch';
import { createContract, createRpcBinding } from '../../lib';
import { getActiveTask } from './getTask';

async function _insertScore(
  isExample: boolean,
  params: {
    moduleId: string;
    taskId: number;
    userId: ObjectId;
  }
) {
  let taskScore = await TaskScoreCollection.findOne(params);
  if (taskScore) {
    return taskScore.score;
  }
  const timeInfo = await UserTaskTimeInfoCollection.findOne(params);
  taskScore = {
    ...params,
    score: isExample
      ? 0
      : timeInfo?.solutionViewedAt
      ? 1
      : timeInfo?.hintViewedAt
      ? 50
      : 100,
    scoredAt: getCurrentDate(),
  };
  await TaskScoreCollection.insertOne(taskScore);
  return taskScore.score;
}

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

    let score = 0;

    await withTransaction(async () => {
      const params = {
        moduleId: values.moduleId,
        taskId: values.taskId,
        userId: user._id,
      };
      const solution: TaskSolutionModel = {
        ...params,
        solutionS3Key: values.uploadKey,
        solvedAt: getCurrentDate(),
      };
      await TaskSolutionCollection.insertOne(solution);
      score = await _insertScore(task.isExample, params);
    }).catch(e => {
      if (
        e.code === DUPLICATED_UNIQUE_VALUE_ERROR_CODE &&
        e.keyPattern?.solutionS3Key
      ) {
        throw new AppError('UploadKey already used');
      }
      throw e;
    });

    await dispatchSocketMsg({
      type: 'TaskSolved',
      payload: {
        userId: user._id.toHexString(),
        moduleId: values.moduleId,
        taskId: values.taskId,
        score,
      },
    });
  });

export const submitSolutionRpc = createRpcBinding({
  injectUser: true,
  pro: true,
  signature: 'module.submitSolution',
  handler: submitSolution,
});
