import { config } from 'config';

export const logger = {
  error(...args: any) {
    console.error('ERROR:', ...args);
  },
  debug(...args: any) {
    if (config.logLevel === 'debug') {
      console.log('DEBUG:', ...args);
    }
  },
  info(...args: any) {
    console.log('INFO:', ...args);
  },
};
