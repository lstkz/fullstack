import { apiMapping } from './generated/api-mapping';
import { AppError } from './common/errors';

export async function handler(
  rpcMethod: string,
  rpcBody: any,
  authToken: string | null | undefined
) {
  const getFn = apiMapping[rpcMethod];
  if (!getFn) {
    throw new AppError('RPC Method not found');
  }
  const { options } = await getFn();

  if (!options.public && !authToken) {
    throw new AppError('authToken required');
  }

  const getUser = async () => {
    return null as any;
    // if (!authToken) {
    //   return null;
    // }
    // const user = await getUserByToken(authToken);
    // if (!user) {
    //   throw new AppError('Invalid or expired token');
    // }
    // if (options.admin && !user.isAdmin) {
    //   throw new AppError('Admin only');
    // }
    // if (options.verified && !user.isVerified) {
    //   throw new AppError('Account not verified');
    // }
    // return user;
  };
  const user = await getUser();
  const params = options.handler.getParams();
  if (options.injectUser) {
    params.shift();
  }
  const values = options.raw ? [rpcBody] : params.map(x => rpcBody[x]);
  if (options.injectUser) {
    values.unshift(user);
  }
  return options.handler(...values);
}
