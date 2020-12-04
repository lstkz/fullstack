import { ObjectID } from 'mongodb';
import { createCollection } from '../db';

export interface ConfirmCodeModel {
  _id: string;
  userId: ObjectID;
}

export const ConfirmCodeCollection = createCollection<ConfirmCodeModel>(
  'confirmCode'
);
