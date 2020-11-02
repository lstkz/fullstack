import dotenv from 'dotenv';

dotenv.config({
  path: '../../.env',
});

if (process.env.NODE_ENV === 'test') {
  delete process.env.AWS_SDK_LOAD_CONFIG;
  delete process.env.AWS_DEFAULT_CREDENTIALS;
  process.env.AWS_REGION = 'eu-central-1';
  process.env.AWS_ACCESS_KEY_ID = 'key';
  process.env.AWS_SECRET_ACCESS_KEY = 'secret';
  process.env.MOCK_DB = '1';
}

if (!process.env.TABLE) {
  throw new Error('TABLE is not set');
}

if (!process.env.TOPIC_ARN) {
  throw new Error('TOPIC_ARN is not set');
}

if (!process.env.S3_BUCKET_NAME) {
  throw new Error('S3_BUCKET_NAME is not set');
}

if (!process.env.ES_USERNAME) {
  throw new Error('ES_USERNAME is not set');
}

if (!process.env.ES_PASSWORD) {
  throw new Error('ES_PASSWORD is not set');
}

if (!process.env.ES_URL) {
  throw new Error('ES_URL is not set');
}

export const TABLE_NAME =
  process.env.TABLE +
  (process.env.JEST_WORKER_ID ? process.env.JEST_WORKER_ID : '');

export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;

export const ES_URL = process.env.JEST_WORKER_ID
  ? 'http://localhost:9200'
  : process.env.ES_URL;
export const ES_USERNAME = process.env.ES_USERNAME;
export const ES_PASSWORD = process.env.ES_PASSWORD;
export const ES_INDEX_PREFIX = process.env.JEST_WORKER_ID
  ? process.env.JEST_WORKER_ID + '_'
  : '';

export const EMAIL_SENDER = 'Fullstack.pl <no-reply@fullstack.pl>';
export const CONTACT_EMAIL = 'kontakt@fullstack.pl';

export const BASE_URL = process.env.BASE_URL || 'https://fullstack.pl';
