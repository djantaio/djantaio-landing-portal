'use strict';

let merge = require('webpack-merge');
let production = require('./webpack.prod.js');
let webpack = require('webpack');
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let config = merge(production, { mode: 'production' });

config.plugins = (config.plugins || []).concat(
  new BundleAnalyzerPlugin({ analyzerMode: 'server'} )
);

module.exports = config;
