export interface AppConfig {
  logLevel: 'debug' | 'info';
  appBaseUrl: string;
  apiBaseUrl: string;
  rabbit: {
    hosts: string[];
    username: string;
    password: string;
    prefetchLimit: number;
    port?: number;
  };
  mongodb: {
    url: string;
    dbName: string;
  };
  aws: {
    sesRegion: string;
  };
  api: {
    port: number;
    eventQueueSuffix: string;
  };
  emailSender: string;
  bugsnag: {
    apiKey: string | -1;
    workerKey: string | -1;
    frontKey: string | -1;
  };
}
