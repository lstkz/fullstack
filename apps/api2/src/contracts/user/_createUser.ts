import { randomSalt, createPasswordHash } from '../../common/helper';
import { _generateAuthData } from './_generateAuthData';
import { UserCollection, UserModel } from '../../collections/User';
import { ObjectID } from 'mongodb';

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

  await UserCollection.insertOne(user);
  return user;
}
