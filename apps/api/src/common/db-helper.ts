import { ObjectID } from 'mongodb';
import { TaskScoreCollection } from '../collections/TaskScore';
import { UserModel } from '../collections/User';

export async function checkIsTaskSolved(
  userId: ObjectID,
  moduleId: string,
  taskId: number
) {
  const count = await TaskScoreCollection.countDocuments({
    userId,
    moduleId,
    taskId,
  });
  return count != 0;
}

export function getUserNotificationSettings(user: UserModel) {
  return (
    user.notifications ?? {
      newsletter: true,
      newContent: true,
      subscriptionRemainder: true,
    }
  );
}
