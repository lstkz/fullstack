import { ObjectId } from 'mongodb';
import { createCollection } from '../db';

export interface TaskPracticeTimeModel {
  moduleId: string;
  taskId: number;
  userId: ObjectId;
  totalTimeMinutes: number;
  lastReportAt: Date;
}

export const TaskPracticeTimeCollection = createCollection<TaskPracticeTimeModel>(
  'taskPracticeTime',
  [
    {
      key: {
        moduleId: 1,
        userId: 1,
      },
    },
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
