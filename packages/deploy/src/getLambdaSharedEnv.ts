import { MainBucket } from './resources/MainBucket';
import { MainTable } from './resources/MainTable';
import { MainTopic } from './resources/MainTopic';

interface GetLambdaSharedEnvOptions {
  mainBucket: MainBucket;
  mainTopic: MainTopic;
  mainTable: MainTable;
}

function _get(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set`);
  }
  return value;
}

export function getLambdaSharedEnv(options: GetLambdaSharedEnvOptions) {
  const { mainBucket, mainTable, mainTopic } = options;

  return {
    IS_AWS: '1',
    NODE_ENV: 'production',
    TOPIC_ARN: mainTopic.getSNSTopic().topicArn,
    TABLE: mainTable.getDynamoTable().tableName,
    S3_BUCKET_NAME: mainBucket.getS3Bucket().bucketName,
    SES_REGION: process.env.SES_REGION ?? '',

    API_BASE_URL: _get('API_BASE_URL'),
    APP_BASE_URL: _get('APP_BASE_URL'),

    ES_URL: _get('ES_URL'),
    ES_USERNAME: _get('ES_USERNAME'),
    ES_PASSWORD: _get('ES_PASSWORD'),

    TPAY_CUSTOMER_ID: _get('TPAY_CUSTOMER_ID'),
    TPAY_API_KEY: _get('TPAY_API_KEY'),
    TPAY_PASSWORD: _get('TPAY_PASSWORD'),
    TPAY_CODE: process.env.TPAY_CODE ?? '',
    TPAY_RESULT_EMAIL: _get('TPAY_RESULT_EMAIL'),

    GITHUB_CLIENT_ID: _get('GITHUB_CLIENT_ID'),
    GITHUB_CLIENT_SECRET: _get('GITHUB_CLIENT_SECRET'),
  };
}
