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
  github: {
    clientId: string;
    clientSecret: string;
  };
  google: {
    clientId: string;
    clientSecret: string;
  };
  deploy: {
    apiCertArn: string | -1;
    zone:
      | {
          hostedZoneId: string;
          zoneName: string;
        }
      | -1;
    appDomain: string | -1;
    appCertArn: string | -1;
    api: {
      cpu: number;
      memory: number;
      count: number;
    };
    worker: {
      cpu: number;
      memory: number;
      count: number;
    };
  };
}
