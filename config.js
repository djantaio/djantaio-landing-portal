'use strict';

let path = require('path');
let _ = require('lodash');

let defaults = {
  lib: path.join(__dirname, 'node_modules'),
  base: path.join(__dirname, 'dist'),
  title: 'djantaJS | The most easiest, faster and strong micro-service platform',
  google: {
    tracking: {
      tid: ''
    }
  }
};

module.exports = {
  build: {
    dist: defaults.dist,
    rootDir: 'build',
    release: 'dist',
    assets: 'dist/assets'

  },

  minify: {
    //collapseWhitespace: true,
    //removeEmptyAttributes: true
  },

  vandors: {
    files: _.map(['mustache'], file => path.resolve(defaults.lib, file))
  },

  copy: {
    faulker: [
      { from: './resources/themes/resources/faulkner/1.0.5/css/', to: './assets/css/[name].[ext]', test: /([^/]+)\/(.+)\.css/},
      { from: './resources/themes/resources/faulkner/1.0.5/fonts/', to: './assets/fonts/[name].[ext]' },
      { from: './resources/themes/resources/faulkner/1.0.5/js/', to: './assets/js/[name].[ext]' }
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
    pages: [
      {
        name: 'index.html',
        file: './resources/template/resources/faulkner/1.0.5/default.mustache',
        engine: 'mustache'
      }
    ]
  },

  karma: {
    config: 'karma.conf.js'
  }
};
