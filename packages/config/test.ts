import { AppConfig } from './types';

export const config: AppConfig = {
  logLevel: 'debug',
  appBaseUrl: 'http://app.example.org',
  apiBaseUrl: 'http://api.example.org',
  cdnBaseUrl: 'http://cdn.example.org',
  rabbit: {
    hosts: ['localhost'],
    username: 'guest',
    password: 'guest',
    prefetchLimit: 10,
  },
  mongodb: {
    url: 'mongodb://localhost:27017',
    dbName: 'fs',
  },
  aws: {
    sesRegion: 'eu-west-1',
    s3Bucket: 'mocked',
    s3CDNBucket: 'mocked',
  },
  vm: {
    launchTemplateId: 'mocked',
    subnetId: 'mocked',
    baseDomain: 'vm.example.org',
    zoneId: 'ZYJ454ME3RV0Z',
    stopTimeoutMs: 1000,
  },
  adminToken: 'admin-test',
  api: {
    port: 3000,
    eventQueueSuffix: 'app',
  },
  web: {
    port: 4000,
  },
  emailSender: 'test@example.org',
  bugsnag: {
    apiKey: -1,
    workerKey: -1,
    frontKey: -1,
  },
  github: {
    clientId: 'mocked',
    clientSecret: 'mocked',
  },
  google: {
    clientId: 'mocked',
    clientSecret: 'mocked',
  },
  deploy: null!,
  tpay: {
    apiKey: 'mocked',
    code: 'demo',
    customerId: 1010,
    password: 'p@$$w0rd#@!',
    resultEmail: 'result@example.org',
  },
};
