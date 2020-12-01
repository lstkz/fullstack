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
  },
  emailSender: 'lukasz@fullstack.pl',
};
