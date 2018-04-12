'use strict';

let path = require('path');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let HtmlWebpackExcludeEmptyAssetsPlugin = require('html-webpack-exclude-empty-assets-plugin');

let _ = require('lodash');

let webpack = require('webpack');
let config = require('./config');

let defaults = {
  libraries: ['portal'],
  chunks: {
    portal: ['./src/index.js']
  }
};

module.exports = {
  entry: defaults.chunks,
  output: {
    filename: '[name].js',
    path: config.build.dist
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /default\.mustache$/,
        loader: 'mustache-loader',
        options: {
          tiny: true,
          render: config.site.head,
        },
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin(config.copy.faulker, { debug: 'warning' })
  ].concat(_.map(config.site.pages, page => new HtmlWebpackPlugin(_.merge({
      hash: false,
      inject: !_.isNil(page.scope) ? page.scope : 'body',
      filename: page.name, //relative to root of the application
      chunks: !_.isNil(page.lib) ? _.isArrayLikeObject(page.lib) ? page.lib.concat(defaults.libraries)
        : [page.lib].concat(defaults.libraries) : defaults.libraries,
      minify: config.minify //trim the rendered html source ...
    }, !_.isNil(page.file) ? { template: page.file } : {} ))
  )).concat(new HtmlWebpackExcludeEmptyAssetsPlugin())
};
