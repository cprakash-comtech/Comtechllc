var gulp    	= require("gulp");
var uglify  	= require("gulp-uglify");
var ngAnnotate  = require("gulp-ng-annotate");
var concat      = require("gulp-concat");
var sourcemaps  = require('gulp-sourcemaps');
var bower	= require("gulp-bower");
var mainBowerFiles = require("gulp-main-bower-files");
var filter = require("gulp-filter");
var Server = require('karma').Server;

//Minify js
gulp.task("js",function(){
	gulp.src("public/js/**/*.js")
	.pipe(sourcemaps.init())
	   .pipe(concat("app-min.js"))
           .pipe(ngAnnotate())
           .pipe(uglify())
	.pipe(sourcemaps.write())
        .pipe(gulp.dest('public/assets'))
});

//Check if any js file has been changed
gulp.task('watch:js', ['js'], function () {
  gulp.watch("public/js/**/*.js", ['js'])
});
//Install bower components
gulp.task('bower',function(){
	return bower();
});
//Automatically restart dev server if any server side code is changed
var nodemon = require('gulp-nodemon');

gulp.task('dev:server',function(){
	nodemon({
		script:'server.js',
		ext:'js',
		ignore:['public*','public/assets*']
	});
});
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/test/karma-test/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('dev',['watch:js','dev:server']);
gulp.task('build',['js',"bower","test"]);

