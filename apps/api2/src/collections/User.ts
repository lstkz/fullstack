import { ObjectID } from 'mongodb';
import { createCollection } from '../db';

export interface UserModel {
  _id: ObjectID;
  email: string;
  email_lowered: string;
  salt: string;
  password: string;
  isVerified: boolean;
  isAdmin?: boolean;
  githubId?: number;
}

export const UserCollection = createCollection<UserModel>('user', [
  {
    key: {
      email_lowered: 1,
    },
    unique: true,
  },
  {
    key: {
      githubId: 1,
    },
    unique: true,
    sparse: true,
  },
]);
