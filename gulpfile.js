/********************************************************************************
DEPENDENCIES
********************************************************************************/

var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var cssnano = require('gulp-cssnano'); // Minify css
var sourcemaps = require('gulp-sourcemaps');

/********************************************************************************
TASKS
********************************************************************************/

gulp.task('less', function () {
	return gulp.src('./src/less/app.less')
		.pipe(less())
		.pipe(gulp.dest('./public/css'))
});

gulp.task('concatJs', function(){
	return gulp.src(
		[
			'./src/js/app.js'
		]
	)
	.pipe(concat('app.js'))
	.pipe(gulp.dest('./public/js'));
});

gulp.task('minifyCss', ['less'], function(){
	return gulp.src('./public/css/app.css')
		.pipe(sourcemaps.init())
		.pipe(cssnano())
		.pipe(rename('app.min.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./public/css'));
});

gulp.task('minifyJs', ['concatJs'], function(){
	return gulp.src('./public/js/app.js')
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('./public/js'));
});

gulp.task('php', function(){
	return gulp.src('./src/php/**/*.php')
		.pipe(gulp.dest('./public/php'));
});

/********************************************************************************
WATCH
********************************************************************************/

gulp.task('watch', function(){
	gulp.watch('./src/less/**/*.less', ['minifyCss']);
	gulp.watch('./src/js/**/*.js', ['minifyJs']);
});

/********************************************************************************
DEFAULT
********************************************************************************/

gulp.task('default', ['minifyCss', 'minifyJs', 'php', 'watch']);