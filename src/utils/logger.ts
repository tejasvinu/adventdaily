export const logger = {
  log: (...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('\x1b[36m%s\x1b[0m', '[SERVER]', new Date().toISOString(), ...args);
    }
  },
  error: (...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('\x1b[31m%s\x1b[0m', '[SERVER ERROR]', new Date().toISOString(), ...args);
    }
  }
};
