'use strict';

let config = require('../config');

// options for cleaning brandable less files during copy task
let options = {
  //process: require('../grunt-helpers/clean-less'),
  noProcess: ['*.{png,gif,jpg,ico,psd,ttf,otf,woff,woff2,svg,js}', '!**/*.less']
};

module.exports = (grunt) => {
  grunt.config('copy', {
    css: {
      options: options,
      files: [
        {
          filter: 'isFile',
          expand: true,
          flatten: true,
          src: ['resources/fonts/material/**/*'],
          dest: config.build.assets + '/css/fonts/material'
        }
      ]
    },
    beagle: {
      options: options,
      files: [
        {
          flatten: true,
          expand: true,
          filter: 'isFile',
          cwd: 'resources/themes/beagle-v1.1/assets',
          src: [
            '!jquery/**/*',
            '!bootstrap/**/*',
            '!jquery.niftymodals/**/*',
            '!material-design-icons/**/*',
            '!roboto/**/*',
            '!bootstrap/less/**/*',
            '!material-design-icons/less/**/*',
            '!jquery.niftymodals/src/**/*',
            'perfect-scrollbar/**/*',
            '!perfect-scrollbar/js/**/*'
          ],
          dest: config.build.release + '/beagle/'
        }
      ]
    }
  });
};
