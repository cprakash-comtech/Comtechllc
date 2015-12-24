var gulp    	= require("gulp");
var uglify  	= require("gulp-uglify");
var ngAnnotate  = require("gulp-ng-annotate");
var concat      = require("gulp-concat");
var sourcemaps  = require('gulp-sourcemaps');
var bower	= require("gulp-bower");
var mainBowerFiles = require("gulp-main-bower-files");
var filter = require("gulp-filter");
gulp.task("js",function(){
	gulp.src("public/js/**/*.js")
	.pipe(sourcemaps.init())
	   .pipe(concat("app-min.js"))
           .pipe(ngAnnotate())
           .pipe(uglify())
	.pipe(sourcemaps.write())
        .pipe(gulp.dest('public/assets'))
});
/*var jsFiles = ['public/bower_components/*'];
gulp.task("js-lib",function(){
	gulp.src(mainBowerFiles().concat(jsFiles))
	//.pipe(sourcemaps.init())
	   .pipe(filter('*.js'))
	   .pipe(concat("app-lib.js"))
           //.pipe(ngAnnotate())
           .pipe(uglify())
	//.pipe(sourcemaps.write())
        .pipe(gulp.dest('public/assets'))
});*/
gulp.task('watch:js', ['js'], function () {
  gulp.watch("public/js/**/*.js", ['js'])
});
gulp.task('bower',function(){
	return bower();
});
var nodemon = require('gulp-nodemon');
gulp.task('dev:server',function(){
	nodemon({
		script:'server.js',
		ext:'js',
		ignore:['public*','public/assets*']
	});
});
gulp.task('dev',['watch:js','dev:server']);
gulp.task('build',['js',"bower"]);

