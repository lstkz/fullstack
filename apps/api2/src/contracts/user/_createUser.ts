import { randomSalt, createPasswordHash } from '../../common/helper';
import { _generateAuthData } from './_generateAuthData';
import { UserCollection, UserModel } from '../../collections/User';
import { MongoError, ObjectID } from 'mongodb';
import { DUPLICATED_UNIQUE_VALUE_ERROR_CODE } from '../../common/mongo';
import { AppError } from '../../common/errors';

interface CreateUserValues {
  userId?: ObjectID;
  email: string;
  password: string;
  isVerified: boolean;
  githubId?: number;
}

export async function _createUser(values: CreateUserValues) {
  const userId = values.userId || new ObjectID();
  const salt = await randomSalt();
  const password = await createPasswordHash(values.password, salt);
  const user: UserModel = {
    _id: userId,
    email: values.email,
    email_lowered: values.email.toLowerCase(),
    salt: salt,
    password: password,
    isVerified: values.isVerified,
    githubId: values.githubId,
  };
  if (!user.githubId) {
    delete user.githubId;
  }
  try {
    await UserCollection.insertOne(user);
  } catch (e) {
    if (e instanceof MongoError) {
      if (e.code === DUPLICATED_UNIQUE_VALUE_ERROR_CODE) {
        throw new AppError('Email is already registered');
      }
    }
  }
  return user;
}
