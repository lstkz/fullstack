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
  web: {
    port: number;
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
  tpay: {
    resultEmail: string;
    apiKey: string;
    code: string;
    customerId: number;
    password: string;
    apiRedirectBaseUrl?: string;
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
    task: {
      cpu: number;
      memory: number;
      count: number;
    };
  };
}
