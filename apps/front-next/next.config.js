const withImages = require('next-images');

const isProd = process.env.NODE_ENV === 'production';

module.exports = withImages({
  // Use the CDN in production and localhost for development.
  // assetPrefix: 'https://cdn.mydomain.com',
  typescript: {
    ignoreBuildErrors: true,
  },
});
