if (process.env.NODE_ENV === 'test') {
  process.env.GITHUB_CLIENT_ID = 'mock';
  process.env.GOOGLE_CLIENT_ID = 'mock';
  process.env.PROTECTED_BASE_URL = '/';
  process.env.API_URL = '/';
}

if (!process.env.GITHUB_CLIENT_ID) {
  throw new Error('GITHUB_CLIENT_ID is not set');
}

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error('GOOGLE_CLIENT_ID is not set');
}

if (!process.env.PROTECTED_BASE_URL) {
  throw new Error('PROTECTED_BASE_URL is not set');
}

if (!process.env.API_URL) {
  throw new Error('API_URL is not set');
}

export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

export const PROTECTED_BASE_URL = process.env.PROTECTED_BASE_URL;

export const API_URL = process.env.API_URL;

export const BUGSNAG_API_KEY = process.env.BUGSNAG_API_KEY;

export const IS_REAL_PROD = API_URL.includes('fullstack.pl');
