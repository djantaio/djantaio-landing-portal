'use strict';

let path = require('path');
let _ = require('lodash');

//let CompressionPlugin = require('compression-webpack-plugin');
let zlib = require('zlib');

let defaults = {
  release: path.join(__dirname, 'distribution'),
  tmp: path.join(__dirname, 'build'),
  lib: path.join(__dirname, 'node_modules'),
  title: 'djantaJS | The most easiest, faster and strong micro-service platform',
  google: {
    tracking: {
      tid: ''
    }
  }
};

module.exports = {
  build: {
    dist: defaults.release,
    rootDir: defaults.tmp,
    assets: path.join(defaults.release, 'assets'),
  },

  clean: [defaults.release, defaults.tmp],

  minify: {
    //collapseWhitespace: true,
    //removeEmptyAttributes: true
  },

  vandor: {
    //compressor: (buffer, done) => zlib.gzip(buffer, { level: 9 }, done),
    mapping: {
      //files: _.map([], file => path.resolve(defaults.lib, file)),
      portal: ['./src/index.js']
    },
    chunks: {
      default: ['portal', 'default']
    },
    assets: {
      production: [
        { assets: [
            { path: 'js/jquery-3.2.1.min.js', type: 'js' },
            { path: 'js/timber.master.min.js', type: 'js' },
            { path: 'css/skin.css', type: 'css' },
            { path: 'css/core.min.css', type: 'css' }
          ], public: 'assets/', append: true
        },
        { assets: [
          {
            path: 'http://maps.googleapis.com/maps/api/js?v=3', type: 'js'/*, attributes: {
              integrity: 'sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE=',
              crossorigin: 'anonymous'
            }*/
          }
        ], append: true }
      ],
      development: [
        { assets: [
          { path: 'js/jquery-3.2.1.min.js', type: 'js' },
          { path: 'js/timber.master.min.js', type: 'js' },
          { path: 'css/timber.css', type: 'css' },
          { path: 'css/avalanche.css', type: 'css' },
          { path: 'css/snowbridge.css', type: 'css' },
          { path: 'css/summit.css', type: 'css' },
          { path: 'css/templates.css', type: 'css' },
          { path: 'css/skin.css', type: 'css' }
        ], public: 'assets/', append: true
        },
        { assets: [
          {
            path: 'http://maps.googleapis.com/maps/api/js?v=3', type: 'js'/*, attributes: {
             integrity: 'sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE=',
             crossorigin: 'anonymous'
           }*/
          }
        ], append: true }
      ]
    }
  },

  resources: {
    static: [
      {
        test: /([^/]+)\/(.+)\.(png|svg|jpg|gif|json|js)/,
        from: './static/**/*', to: './'
      }
    ],
    default: [
      { from: './resources/themes/resources/default/css/', to: './assets/css/[name].[ext]', test: /([^/]+)\/(.+)\.css/},
      { from: './resources/themes/resources/default/fonts/', to: './assets/fonts/[name].[ext]' },
      { from: './resources/themes/resources/default/js/', to: './assets/js/[name].[ext]', test: /([^/]+)\/(.+)\.js/}
    ],
    media: [
      /*{
        from: './resources/themes/resources/default/images/',
        to: './assets/images/[name].[ext]',
        test: /([^/]+)\/(.+)\.(png|svg|jpg|gif)/
      },*/
      {
        from: './resources/local/images/', to: './assets/images/[name].[ext]',
        test: /([^/]+)\/(.+)\.(png|svg|jpg|gif)/
      },
      {
        from: './resources/local/medias/', to: './assets/medias/[name].[ext]',
        test: /([^/]+)\/(.+)\.(swf|mp3|mp4|webm|png|svg|jpg|gif)/
      }
    ]
  },

  site: {
    head: {
      title: defaults.title,
      metas: [
        { property: 'og:type', content: 'website' },
        { charset: 'UTF-8' },
        { content: 'width=device-width,initial-scale=1.0,maximum-scale=1.0', name: 'viewport' },
        { property: 'og:title', content: 'djantaJS | Micro-Service platform' },
        { property: 'og:url', content: 'https://djantajs.io' },
        { property: 'og:image', content: 'https://djantajs.io/assets/images/djantajs/logo.jpg' },
        { property: 'og:description', content: defaults.title },
        { name: 'twitter:widgets:theme', content: 'light' }
      ],
      links: [
        { rel: 'shortcut icon', type: 'image/x-icon', href: 'assets/images/theme-mountain-favicon.ico' },
        { href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700%7CHind+Madurai:400,500&amp;subset=latin-ext', rel:'stylesheet' },
        { rel: 'stylesheet', href: 'assets/css/core.min.css' },
        { rel: 'stylesheet', href: 'assets/css/skin.css' },
      ],
      scripts: []
    },
    pages: {
      common: [
        {
          name: 'index.html',
          file: './resources/template/resources/default/default.mustache'
        }
      ],
      development: [],
      production: []
    }
  }
};
