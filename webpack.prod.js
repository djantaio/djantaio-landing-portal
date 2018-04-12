'use strict';

let setting = require('./config');
let merge = require('webpack-merge');
let UglifyJSPlugin = require('uglifyjs-webpack-plugin');
let common = require('./webpack.common.js');
let webpack = require('webpack');
let ConcatPlugin = require('webpack-concat-plugin');

let config = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
    runtimeChunk: {
      name: 'vendor'
    },
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /node_modules/,
          name: "vendor",
          chunks: "initial",
          minSize: 1
        }
      }
    }
  }
});

config.plugins = (config.plugins || []).concat(
  new UglifyJSPlugin({ sourceMap: true })
  // new ConcatPlugin({
  //   uglify: false,
  //   sourceMap: false,
  //   name: 'result',
  //   outputPath: 'path/to/output/',
  //   fileName: '[name].[hash:8].js',
  //   filesToConcat: ['jquery', './src/lib/!**', './dep/dep.js', ['./some/!**', '!./some/excludes/!**']],
  //   attributes: {
  //     async: true
  //   }
  // })
);

module.exports = config;
