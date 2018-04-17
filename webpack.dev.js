'use strict';

let config = require('./config');
let merge = require('webpack-merge');
let common = require('./webpack.common.js');
let webpack = require('webpack');
let _ = require('lodash');

let HtmlWebpackPlugin = require('html-webpack-plugin');
let HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

let update = merge(common, {
  mode: 'development',
  watch: true,
  output: {
    filename: '[name].[hash].js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: config.build.dist,
    compress: true,
    port: 9000,
    host: 'localhost',
    overlay: {
      warnings: true,
      errors: true
    },
    watchOptions: {
      poll: true,
      aggregateTimeout: 300,
      ignored: /node_modules/
    },
    proxy: {
      // "/api": {
      //   target: "https://localhost:3000",
      //   pathRewrite: {"^/api" : ""},
      //   secure: false,
      //   /*bypass: function(req, res, proxyOptions) {
      //     if (req.headers.accept.indexOf("html") !== -1) {
      //       console.log("Skipping proxy for browser request.");
      //       return "/index.html";
      //     }
      //   }*/
      // }
    },
    before: (app) => {
      /*app.get('/some/path', function(req, res) {
        res.json({ custom: 'response' });
      });*/
    }
  }
});

update.plugins = (update.plugins || [])
  .concat([
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({mode: 'development'}),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: true
    })
  ]).concat(_.map(config.site.pages.development, page => new HtmlWebpackPlugin(_.merge({
      hash: false,
      inject: !_.isNil(page.scope) ? page.scope : 'body',
      filename: page.name, //relative to root of the application
      chunks: !_.isNil(page.lib) ? _.isArrayLikeObject(page.lib) ? page.lib : [page.lib] : [],
      minify: config.minify //trim the rendered html source ...
    }, !_.isNil(page.file) ? { template: page.file } : {} ))
  ))
  .concat(_.map(config.vandor.assets.development, a => new HtmlWebpackIncludeAssetsPlugin({
    assets: a.assets,
    append: a.append || true,
    publicPath: a.public || ''
  })));

module.exports = update;
