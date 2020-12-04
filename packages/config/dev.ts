import { AppConfig } from './types';

export const config: AppConfig = {
  logLevel: 'debug',
  appBaseUrl: 'http://localhost:4000',
  apiBaseUrl: 'http://localhost:3000',
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
  },
  api: {
    port: 3000,
    eventQueueSuffix: 'app',
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
  deploy: {
    apiCertArn: -1,
    zone: -1,
    appDomain: -1,
    appCertArn: -1,
    api: {
      cpu: 256,
      memory: 512,
      count: 1,
    },
    worker: {
      cpu: 256,
      memory: 512,
      count: 1,
    },
  },
  tpay: {
    apiKey: '111',
    code: '222',
    customerId: 123,
    password: '444',
    resultEmail: 'sirmims@gmail.com',
  },
};
