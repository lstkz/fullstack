const path = require('path');
const webpack = require('webpack');

module.exports = {
  target: 'node',
  mode: 'none',
  devtool: false,
  entry: path.join(__dirname, 'src/index.ts'),
  optimization: {
    chunkIds: 'named',
    // namedModules: false,
    // namedChunks: true,
    nodeEnv: 'production',
    flagIncludedChunks: true,
    // occurrenceOrder: true,
    sideEffects: true,
    usedExports: true,
    concatenateModules: true,
    splitChunks: {
      minSize: 30000,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
    },
    noEmitOnErrors: true,
    minimize: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'agent.js',
    libraryTarget: 'commonjs',
  },
  externals: [
    function (context, request, callback) {
      if (/^aws-sdk/.test(request)) {
        return callback(null, 'commonjs ' + request);
      }
      callback();
    },
  ],
  module: {
    exprContextRegExp: /$^/,
    exprContextCritical: false,
    rules: [
      {
        test: path.resolve(
          __dirname,
          '../../node_modules/uglify-js/tools/node.js'
        ),
        loader: 'null-loader',
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(__dirname, 'tsconfig.api-build.json'),
          transpileOnly: true,
        },
      },
    ],
  },
};
