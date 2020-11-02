import { MainBucket } from './resources/MainBucket';
import { MainTable } from './resources/MainTable';
import { MainTopic } from './resources/MainTopic';

interface GetLambdaSharedEnvOptions {
  mainBucket: MainBucket;
  mainTopic: MainTopic;
  mainTable: MainTable;
}

export function getLambdaSharedEnv(options: GetLambdaSharedEnvOptions) {
  const { mainBucket, mainTable, mainTopic } = options;

  if (!process.env.ES_URL) {
    throw new Error('ES_URL is not set');
  }
  if (!process.env.ES_USERNAME) {
    throw new Error('ES_USERNAME is not set');
  }
  if (!process.env.ES_PASSWORD) {
    throw new Error('ES_PASSWORD is not set');
  }

  return {
    IS_AWS: '1',
    NODE_ENV: 'production',
    TOPIC_ARN: mainTopic.getSNSTopic().topicArn,
    TABLE: mainTable.getDynamoTable().tableName,
    S3_BUCKET_NAME: mainBucket.getS3Bucket().bucketName,
    ES_URL: process.env.ES_URL,
    ES_USERNAME: process.env.ES_USERNAME,
    ES_PASSWORD: process.env.ES_PASSWORD,
    SES_REGION: process.env.SES_REGION!,
  };
}
