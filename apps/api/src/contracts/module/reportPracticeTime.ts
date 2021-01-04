import { S } from 'schema';
import { TaskPracticeTimeCollection } from '../../collections/TaskPracticeTime';
import { createContract, createRpcBinding } from '../../lib';
import { getActiveTask } from './getTask';

export const reportPracticeTime = createContract('module.reportPracticeTime')
  .params('user', 'moduleId', 'taskId')
  .schema({
    user: S.object().appUser(),
    moduleId: S.string(),
    taskId: S.number(),
  })
  .fn(async (user, moduleId, taskId) => {
    await getActiveTask(moduleId, taskId);
    const nowRounded = new Date(Math.floor(Date.now() / 1000 / 60));
    await TaskPracticeTimeCollection.findOneAndUpdate(
      {
        moduleId,
        taskId,
        userId: user._id,
      },
      {
        $setOnInsert: {
          totalTimeMinutes: 1,
          lastReportAt: nowRounded,
        },
      },
      {
        upsert: true,
      }
    );
    await TaskPracticeTimeCollection.findOneAndUpdate(
      {
        moduleId,
        taskId,
        userId: user._id,
        lastReportAt: { $ne: nowRounded },
      },
      {
        $inc: { totalTimeMinutes: 1 },
        $set: {
          lastReportAt: nowRounded,
        },
      }
    );
  });

export const reportPracticeTimeRpc = createRpcBinding({
  pro: true,
  injectUser: true,
  signature: 'module.reportPracticeTime',
  handler: reportPracticeTime,
});
