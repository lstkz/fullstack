import { ObjectID } from 'mongodb';
import { createCollection } from '../db';

export interface TaskScoreModel {
  moduleId: string;
  taskId: number;
  userId: ObjectID;
  score: number;
  scoredAt: Date;
}

export const TaskScoreCollection = createCollection<TaskScoreModel>(
  'taskScore',
  [
    {
      key: {
        userId: 1,
      },
    },
    {
      key: {
        userId: 1,
        moduleId: 1,
      },
    },
    {
      key: {
        userId: 1,
        moduleId: 1,
        taskId: 1,
      },
      unique: true,
    },
  ]
);
