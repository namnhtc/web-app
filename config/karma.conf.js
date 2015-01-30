module.exports = function (config) {
  config.set({

    basePath: '../',

    files: [
      'app/vendors/angular/angular.js',
      'app/vendors/angular-route/angular-route.js',
      'app/vendors/angular-mocks/angular-mocks.js',
      'app/vendors/ngStorage/ngStorage.min.js',
      'app/*.js',
      'app/placement/**/*.js',
      'app/components/placement/**/*.js',
      'app/components/question/**/*.js',
      'app/components/dmp/**/*.js',
      'app/vendors/google-diff-match-patch/diff_match_patch.js',
      'app/home/**/*.js',
      'app/components/user/**/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Firefox'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};