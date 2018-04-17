'use strict';

let config = require('./config');
let merge = require('webpack-merge');
let UglifyJSPlugin = require('uglifyjs-webpack-plugin');
let common = require('./webpack.common.js');
let webpack = require('webpack');

let HtmlWebpackPlugin = require('html-webpack-plugin');
let HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

let _ = require('lodash');

let update = merge(common, {
  mode: 'production'
});

update.plugins = (update.plugins || [])
  .concat(_.map(config.site.pages.production, page => new HtmlWebpackPlugin(_.merge({
      hash: false,
      inject: !_.isNil(page.scope) ? page.scope : 'body',
      filename: page.name, //relative to root of the application
      chunks: !_.isNil(page.lib) ? _.isArrayLikeObject(page.lib) ? page.lib : [page.lib] : [],
      minify: config.minify //trim the rendered html source ...
    }, !_.isNil(page.file) ? { template: page.file } : {} ))
  ))
  .concat(_.map(config.vandor.assets.production, a => new HtmlWebpackIncludeAssetsPlugin({
    assets: a.assets,
    append: a.append || true,
    publicPath: a.public || ''
  })))
  .concat([
    new UglifyJSPlugin({
      test: /\.js($|\?)/i,
      sourceMap: true,
      parallel: true,
      uglifyOptions: {
        compress: {
          inline: false //config.vandor.compressor
        },
        mangle: true
      }
    })
  ]);

module.exports = update;
