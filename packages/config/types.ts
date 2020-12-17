export interface AppConfig {
  logLevel: 'debug' | 'info';
  appBaseUrl: string;
  apiBaseUrl: string;
  cdnBaseUrl: string;
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
    s3Bucket: string;
    s3CDNBucket: string;
  };
  vm: {
    launchTemplateId: string;
    subnetId: string;
    baseDomain: string;
    zoneId: string;
    idleTimeout: number;
    awsName: string;
  };
  adminToken: string;
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
    vmCapacity: {
      instanceType: string;
      count: number;
    };
    lbCertArn: string;
    lbDomain: string;
    zone: {
      hostedZoneId: string;
      zoneName: string;
    };
    web: {
      cpu: number;
      memory: number;
      count: number;
    };
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
    cdn?: {
      certArn?: string;
      domainName: string;
    };
  };
}
