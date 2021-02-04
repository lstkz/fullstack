import { AuthData } from 'shared';
import { UserModel } from '../../collections/User';
import { mapUser } from '../../common/mapper';
import { track } from '../../track';
import { createToken } from './createToken';

export async function _generateAuthData(user: UserModel): Promise<AuthData> {
  track(user._id, { type: 'logged_in' });
  return {
    user: mapUser(user),
    token: await createToken(user._id, null),
  };
}
