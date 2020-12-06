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
  deploy: {
    task: {
      cpu: 256,
      memory: 512,
      count: 1,
    },
    apiCertArn: -1,
    zone: -1,
    appDomain: -1,
    appCertArn: -1,
  },
  tpay: {
    apiRedirectBaseUrl: 'https://8c329d2a4b5f.eu.ngrok.io',
    apiKey: '75f86137a6635df826e3efe2e66f7c9a946fdde1',
    code: 'demo',
    customerId: 1010,
    password: 'p@$$w0rd#@!',
    resultEmail: 'sirmims@gmail.com',
  },
};
