// Karma configuration
// Generated on Tue Dec 29 2015 16:02:33 GMT+0530 (IST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha','chai'],

    // list of files / patterns to load in the browser
    files: [
	'../../public/bower_components/jquery/dist/jquery.js',
	'../../public/bower_components/angular/angular.js',
	'../../public/bower_components/angular-ui-router/release/angular-ui-router.js',
	'../../public/bower_components/angular-google-places-autocomplete/src/autocomplete.js',
	'../../public/bower_components/angular-loading-spinner/angular-loading-spinner.js',
	'../../public/bower_components/angular-loading-spinner/angular-loading-spinner.js',
	'../../public/bower_components/angular-spinner/angular-spinner.js',
	'../../public/assets/app-min.js',
	'../../public/bower_components/angular-mocks/angular-mocks.js',
	'test.js'
    ],


    // list of files to exclude
    exclude: [
      '""'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS','google-chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
