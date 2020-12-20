const path = require('path');
const webpack = require('webpack');
const WebpackObfuscator = require('webpack-obfuscator');

function getConfig(name, plugins = []) {
  return {
    target: 'node',
    mode: 'none',
    devtool: false,
    entry: {
      [name]: path.join(__dirname, `src/${name}.ts`),
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
      filename: '[name].js',
      libraryTarget: 'commonjs',
    },
    externals: [
      function (context, request, callback) {
        if (/^node-fetch|^form-data|^tar|^chalk/.test(request)) {
          return callback(null, 'commonjs ' + request);
        }
        callback();
      },
    ],
    module: {
      rules: [
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
    plugins,
  };
}

module.exports = [
  getConfig('FsReporter', [
    new WebpackObfuscator(
      {
        rotateStringArray: true,
      },
      ['excluded_bundle_name.js']
    ),
  ]),
  getConfig('SetupReporter'),
  getConfig('fs-tester', [
    new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }),
  ]),
];
