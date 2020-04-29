// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = config => {
  config.set({
    autoWatch: true,
    basePath: '',
    browsers: [ 'Firefox' ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    colors: true,
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/iot-app'),
      reports: [ 'html', 'lcovonly', 'text-summary' ],
      fixWebpackSourcePaths: true
    },
    frameworks: [ 'jasmine', '@angular-devkit/build-angular' ],
    logLevel: config.LOG_INFO,
    plugins: [
      require('karma-jasmine'),
      require('karma-firefox-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    port: 9876,
    reporters: [ 'progress', 'kjhtml' ],
    restartOnFileChange: true,
    singleRun: false
  });
};
