import { AppConfig } from './types';

export const config: AppConfig = {
  logLevel: 'debug',
  rabbit: {
    hosts: ['localhost'],
    username: 'guest',
    password: 'guest',
  },
  mongodb: {
    url: 'mongodb://localhost:27017',
    dbName: 'fs',
  },
};
