import { ObjectId } from 'mongodb';
import { createCollection } from '../db';

export interface UserTaskTimeInfoModel {
  moduleId: string;
  taskId: number;
  userId: ObjectId;
  openedAt?: Date | null;
  hintViewedAt?: Date | null;
  solutionViewedAt?: Date | null;
}

export const UserTaskTimeInfoCollection = createCollection<UserTaskTimeInfoModel>(
  'userTaskTimeInfo',
  [
    {
      key: {
        moduleId: 1,
        taskId: 1,
        userId: 1,
      },
      unique: true,
    },
  ]
);
