import { ObjectID } from 'mongodb';
import { createCollection } from '../db';

export interface TaskSolutionModel {
  moduleId: string;
  taskId: number;
  userId: ObjectID;
  solutionS3Key: string;
  solvedAt: Date;
}

export const TaskSolutionCollection = createCollection<TaskSolutionModel>(
  'taskSolution',
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
        solutionS3Key: 1,
      },
      unique: true,
    },
  ]
);
