export const logger = {
  error(...args: any) {
    if (process.env.NODE_ENV !== 'test') {
      console.error(...args);
    }
  },
  log(...args: any) {
    if (process.env.NODE_ENV !== 'test') {
      console.log(...args);
    }
  },
};
