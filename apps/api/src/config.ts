import dotenv from 'dotenv';

dotenv.config({
  path: '../../.env',
});

function _get(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set`);
  }
  return value;
}

if (process.env.NODE_ENV === 'test') {
  delete process.env.AWS_SDK_LOAD_CONFIG;
  delete process.env.AWS_DEFAULT_CREDENTIALS;
  process.env.AWS_REGION = 'eu-central-1';
  process.env.AWS_ACCESS_KEY_ID = 'key';
  process.env.AWS_SECRET_ACCESS_KEY = 'secret';
  process.env.MOCK_DB = '1';
}

export const TABLE_NAME =
  _get('TABLE') +
  (process.env.JEST_WORKER_ID ? process.env.JEST_WORKER_ID : '');

export const S3_BUCKET_NAME = _get('S3_BUCKET_NAME');

export const ES_URL = process.env.JEST_WORKER_ID
  ? 'http://localhost:9200'
  : _get('ES_URL');
export const ES_USERNAME = _get('ES_USERNAME');
export const ES_PASSWORD = _get('ES_PASSWORD');
export const ES_INDEX_PREFIX = process.env.JEST_WORKER_ID
  ? process.env.JEST_WORKER_ID + '_'
  : '';

export const EMAIL_SENDER = 'Fullstack.pl <no-reply@fullstack.pl>';
export const CONTACT_EMAIL = 'kontakt@fullstack.pl';

export const BASE_URL = process.env.BASE_URL || 'https://blog.fullstack.pl';
export const API_BASE_URL = _get('API_BASE_URL');
export const APP_BASE_URL = _get('APP_BASE_URL');

export const TPAY_CUSTOMER_ID = Number(_get('TPAY_CUSTOMER_ID'));
export const TPAY_API_KEY = _get('TPAY_API_KEY');
export const TPAY_PASSWORD = _get('TPAY_PASSWORD');
export const TPAY_CODE = process.env.TPAY_CODE ?? '';
export const TPAY_RESULT_EMAIL = _get('TPAY_RESULT_EMAIL');

export const GITHUB_CLIENT_ID = _get('GITHUB_CLIENT_ID');
export const GITHUB_CLIENT_SECRET = _get('GITHUB_CLIENT_SECRET');

export const ADMIN_TOKEN =
  process.env.NODE_ENV === 'test' ? 'admin-token' : process.env.ADMIN_TOKEN;
