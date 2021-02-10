import { ObjectID } from 'mongodb';
import { createCollection } from '../db';

export interface ConfirmEmailChangeModel {
  _id: string;
  userId: ObjectID;
  newEmail: string;
}

export const ConfirmEmailChangeCollection = createCollection<ConfirmEmailChangeModel>(
  'confirmEmailChange',
  [
    {
      key: {
        userId: 1,
      },
    },
  ]
);
