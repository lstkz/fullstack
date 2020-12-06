// module.exports = {
//   plugins: ['autoprefixer', 'postcss-nested'],
// };

module.exports = {
  plugins: {
    // autoprefixer: {},
    'postcss-nested': {},
    cssnano: process.env.NODE_ENV === 'production' ? {} : false,
  },
};
