import { createCollection } from '../db';

export interface PreparedTaskModel {
  _id: string;
  preparedAt?: Date;
  folderPath?: string;
}

export const PreparedTaskCollection = createCollection<PreparedTaskModel>(
  'preparedTask'
);
