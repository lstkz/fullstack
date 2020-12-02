import { S } from 'schema';
import uuid from 'uuid';
import {
  AccessTokenCollection,
  AccessTokenModel,
} from '../../collections/AccessToken';
import { createContract } from '../../lib';

export const createToken = createContract('user.createToken')
  .params('userId', 'fixedToken')
  .schema({
    userId: S.string().objectId(),
    fixedToken: S.string().nullable().optional(),
  })
  .returns<string>()
  .fn(async (userId, fixedToken) => {
    const token: AccessTokenModel = {
      _id: fixedToken || uuid(),
      userId: userId,
    };
    await AccessTokenCollection.insertOne(token);
    return token._id;
  });
