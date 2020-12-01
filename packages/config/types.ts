export interface AppConfig {
  logLevel: 'debug' | 'info';
  rabbit: {
    hosts: string[];
    username: string;
    password: string;
    port?: number;
  };
  mongodb: {
    url: string;
    dbName: string;
  };
}
