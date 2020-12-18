import { config } from 'config';
import { S } from 'schema';
import { getCurrentDate, randomString } from '../../common/helper';
import { createContract, createRpcBinding, s3 } from '../../lib';

export const getSolutionUploadUrl = createContract(
  'module.getSolutionUploadUrl'
)
  .params('user', 'values')
  .schema({
    user: S.object().appUser(),
    values: S.object().keys({}),
  })
  .returns<{ url: string }>()
  .fn(async (user, values) => {
    const now = getCurrentDate();
    const { url } = s3.createPresignedPost({
      Bucket: config.aws.s3Bucket,
      Fields: {
        key: [
          'solutions',
          user._id.toHexString(),
          now.getFullYear(),
          now.getMonth() + 1,
          now.getDate(),
          `${randomString(20)}.tar.gz`,
        ].join('/'),
      },
      Conditions: [['content-length-range', 1, 10 * 1024 * 1024]],
    });
    return { url };
  });

export const getSolutionUploadUrlRpc = createRpcBinding({
  injectUser: true,
  signature: 'module.getSolutionUploadUrl',
  handler: getSolutionUploadUrl,
});
