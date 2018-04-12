'use strict';

let setting = require('./config');
let merge = require('webpack-merge');
let common = require('./webpack.common.js');
let webpack = require('webpack');

let config = merge(common, {
  mode: 'development',
  watch: true,
  output: {
    filename: '[name].[hash].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: setting.build.dist,
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
    before(app){
      /*app.get('/some/path', function(req, res) {
        res.json({ custom: 'response' });
      });*/
    }
  }
});

config.plugins = (config.plugins || []).concat(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    mode: 'development'
  }),
  new webpack.EnvironmentPlugin({
    NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
    DEBUG: true
  })
);

module.exports = config;
