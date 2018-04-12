(function(){
  'use strict';

  function buildVersion(grunt, min, max) {
    var pkg, version, versionRegex = /\d{1,2}\.\d{1,2}\.\d{1,2}(\.\d{1,4})?/;

    if (process.env.VERSION) {
      grunt.log.writeln('VERSION environment variable set to ' + process.env.VERSION);
      version = versionRegex.exec(process.env.VERSION)[0];
    } else {
      grunt.log.warn('VERSION environment variable not set using value from package.json');
      min = min || 1;
      max = max || 50;
      pkg = grunt.file.readJSON('package.json');
      version = pkg.version + '-' + Math.floor(Math.random() * (max - min + 1) + min);
    }
    grunt.log.writeln('Building with version: ' + version);
    return version;
  }

  module.exports = buildVersion;
})();
