import { ObjectId } from 'mongodb';
import { createCollection } from '../db';

export interface LessonProgressModel {
  moduleId: string;
  lessonId: number;
  userId: ObjectId;
  isWatched: boolean;
}

export const LessonProgressCollection = createCollection<LessonProgressModel>(
  'lessonProgress',
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
        lessonId: 1,
        userId: 1,
      },
      unique: true,
    },
  ]
);
