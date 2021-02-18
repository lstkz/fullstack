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
    region: string;
    sesRegion: string;
    s3Bucket: string;
    s3CDNBucket: string;
    uploadAssetsCredentials?: {
      accessKey: string;
      secretKey: string;
    };
  };
  vm: {
    launchTemplateId: string;
    baseDomain: string;
    zoneId: string;
    idleTimeout: number;
    awsName: string;
  };
  discord: {
    enabled: boolean;
    token: string;
    inviteChannelId: string;
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
  mixpanel: {
    apiKey: string | -1;
  };
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
  fakturownia: {
    enabled: boolean;
    domain: string;
    apiToken: string;
    numberPrefix: string;
    sellerValues: {
      seller_name: string;
      seller_tax_no: string;
      seller_street: string;
      seller_post_code: string;
      seller_city: string;
    };
  };
  convertKit: {
    apiKey: string;
    apiSecret: string;
    registerFormId: number;
    newsletterFormId: number;
    tagMapping: {
      newsletter: number;
      newContent: number;
      webinars: number;
    };
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
