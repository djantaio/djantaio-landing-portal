'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.loadTasks('grunt-tasks'); // Load all grunt tasks (modules) in the grunt-tasks directory.

  grunt.registerTask('tasks', 'Lists available tasks', ['availabletasks']);
};
