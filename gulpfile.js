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
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

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
			'./src/js/_template_module.js',
			'./src/js/_template_test_device.js',
			'./src/js/_template_render_skills.js',
			'./src/js/_template_render_tools.js',
			'./src/js/_template_render_works.js',
			'./src/js/_function_scroll.js',
			'./src/js/_function_percentage_icons.js'
		]
	)
	.pipe(concat('app.js'))
	.pipe(gulp.dest('./public/js'));
});

gulp.task('minifyCss', ['less'], function(){
	return gulp.src('./public/css/app.css')
		.pipe(sourcemaps.init())
		.pipe(autoprefixer())
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

gulp.task('minifyImages', function(){
	gulp.src('src/img/**/*.jpg')
	.pipe(imagemin({
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	}))
	.pipe(gulp.dest('public/img'));

	gulp.src('src/img/**/*.svg')
	.pipe(imagemin({
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	}))
	.pipe(gulp.dest('public/img'));

});

/********************************************************************************
WATCH
********************************************************************************/

gulp.task('watch', function(){
	gulp.watch('./src/less/**/*.less', ['minifyCss']);
	gulp.watch('./src/js/**/*.js', ['minifyJs']);
	gulp.watch('./src/img/*', ['minifyImages']);
	gulp.watch('./src/php/**/*.php', ['php']);
});

/********************************************************************************
DEFAULT
********************************************************************************/

gulp.task('default', ['minifyCss', 'minifyJs', 'minifyImages', 'php', 'watch']);