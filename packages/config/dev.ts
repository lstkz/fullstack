import { AppConfig } from './types';

export const config: AppConfig = {
  logLevel: 'debug',
  appBaseUrl: 'http://localhost:4000',
  apiBaseUrl: 'http://localhost:3000',
  cdnBaseUrl: 'https://d219h34ij80kug.cloudfront.net',
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
    s3Bucket: 'fs-dev-new-bucket83908e77-386rntzp21zk',
    s3CDNBucket: 'fs-dev-new-cdnbucketee4b79c2-iec0kz1lpjxh',
  },
  vm: {
    launchTemplateId: 'lt-0da5565f8c1bfdbae',
    baseDomain: 'fs-vm.styx-dev.com',
    zoneId: 'ZYJ454ME3RV0Z',
  },
  adminToken: 'admin-wOcAcBPqRt',
  api: {
    port: 3000,
    eventQueueSuffix: 'app',
  },
  web: {
    port: 4000,
  },
  emailSender: 'lukasz@fullstack.pl',
  bugsnag: {
    apiKey: -1,
    workerKey: -1,
    frontKey: -1,
  },
  github: {
    clientId: '0bbe36b537a9d82deecd',
    clientSecret: '7577122012742594d0b522b66915b37eaa89e555',
  },
  google: {
    clientId:
      '931928292425-72gnjpafb3kja4poun2kb4n2mfc8tj7b.apps.googleusercontent.com',
    clientSecret: 'qAloPu3PpycwNblek9uPD-DT',
  },
  deploy: null!,
  tpay: {
    apiRedirectBaseUrl: 'https://40949958ebbc.eu.ngrok.io',
    apiKey: '75f86137a6635df826e3efe2e66f7c9a946fdde1',
    code: 'demo',
    customerId: 1010,
    password: 'p@$$w0rd#@!',
    resultEmail: 'sirmims@gmail.com',
  },
};
