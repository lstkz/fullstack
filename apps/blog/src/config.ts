if (!process.env.GATSBY_API_URL) {
  throw new Error('GATSBY_API_URL not defined');
}

export const API_URL = process.env.GATSBY_API_URL;
