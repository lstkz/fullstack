import { randomSalt, createPasswordHash } from '../../common/helper';
import { _generateAuthData } from './_generateAuthData';
import { UserCollection, UserModel } from '../../collections/User';
import { MongoError, ObjectID } from 'mongodb';
import { DUPLICATED_UNIQUE_VALUE_ERROR_CODE } from '../../common/mongo';
import { AppError } from '../../common/errors';
import { setTrackingUser, track } from '../../track';
import { dispatchEvent } from '../../dispatch';
import { NEWSLETTER_TYPES } from '../../Const';
import { NotificationSettings } from 'shared';

interface CreateUserValues {
  userId?: ObjectID;
  email: string;
  password: string;
  isVerified: boolean;
  githubId?: number;
  subscribeNewsletter?: boolean;
}

export async function _createUser(
  values: CreateUserValues,
  publishEvents = false
) {
  const userId = values.userId || new ObjectID();
  const salt = await randomSalt();
  const password = await createPasswordHash(values.password, salt);
  const notifications = {
    subscriptionRemainder: true,
  } as NotificationSettings;
  NEWSLETTER_TYPES.forEach(type => {
    notifications[type] = values.subscribeNewsletter ?? false;
  });
  const user: UserModel = {
    _id: userId,
    email: values.email,
    email_lowered: values.email.toLowerCase(),
    salt,
    password,
    isVerified: values.isVerified,
    githubId: values.githubId,
    notifications,
  };
  if (!user.githubId) {
    delete user.githubId;
  }
  try {
    await UserCollection.insertOne(user);
    track(user._id, { type: 'registered' });
    setTrackingUser(user._id, {
      $email: values.email,
      registeredAt: new Date().toISOString(),
    });
  } catch (e) {
    if (e instanceof MongoError) {
      if (e.code === DUPLICATED_UNIQUE_VALUE_ERROR_CODE) {
        throw new AppError('Email is already registered');
      }
    }
  }
  if (publishEvents) {
    await dispatchEvent({
      type: 'UserRegistered',
      payload: {
        userId: user._id.toHexString(),
      },
    });
  }
  return user;
}
