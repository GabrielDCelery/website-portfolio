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
var imageResize = require('gulp-image-resize');

/********************************************************************************
TASKS
********************************************************************************/

/********************************************************************************
JAVASCRIPT
********************************************************************************/

gulp.task('less', function () {
	return gulp.src('./src/less/app.less')
		.pipe(less())
		.pipe(gulp.dest('./public/css'))
});

gulp.task('concatJs', function(){
	return gulp.src(
		[
			'./src/js/_eventemitter.js',
			'./src/js/_animate_icons.js',
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

/********************************************************************************
CSS
********************************************************************************/

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

/********************************************************************************
PHP
********************************************************************************/

gulp.task('php', function(){
	return gulp.src('./src/php/**/*.php')
		.pipe(gulp.dest('./public/php'));
});

/********************************************************************************
IMAGE RESIZE, COMPRESS, COPY
********************************************************************************/

function resizeImages(sourceDir, destDir, imageSuffixes, imageSizes){

	for(var i = 0; i < imageSizes.length; i++){

		gulp.src(sourceDir)
		.pipe(imageResize({ 
			width : imageSizes[i][0],
			height : imageSizes[i][1],
			crop : true,
			upscale : false
		}))
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(rename({
			suffix: imageSuffixes[i]
		}))
		.pipe(gulp.dest(destDir))

	}

}

gulp.task('imageResize', function () {

	var sourceDir = 'src/img/badges-skills/**/*.jpg';
	var destDir = 'public/img/badges-skills';
	var imageSuffixes = ['-large', '-medium', '-small'];
	var imageSizes = [[150, 150], [120, 120], [80,80]];

	resizeImages(sourceDir, destDir, imageSuffixes, imageSizes);

	sourceDir = 'src/img/badges-tools/**/*.jpg';
	destDir = 'public/img/badges-tools';
	imageSuffixes = ['-large', '-medium', '-small'];
	imageSizes = [[150, 150], [120, 120], [80,80]];

	resizeImages(sourceDir, destDir, imageSuffixes, imageSizes);

	sourceDir = 'src/img/portfolio/**/*.jpg';
	destDir = 'public/img/portfolio';
	imageSuffixes = ['-large', '-medium', '-small'];
	imageSizes = [[700, 375], [350, 188], [280,150]];

	resizeImages(sourceDir, destDir, imageSuffixes, imageSizes);

	sourceDir = 'src/img/personal-photo-01.jpg';
	destDir = 'public/img';
	imageSuffixes = ['', '-large', '-medium', '-small'];
	imageSizes = [[320, 360], [320, 360], [250, 281], [160,180]];

	resizeImages(sourceDir, destDir, imageSuffixes, imageSizes);

});

gulp.task('copySvg', function () {
	gulp.src('./src/img/icons/**/*.svg')
	.pipe(gulp.dest('./public/img/icons'));

});

/********************************************************************************
WATCH
********************************************************************************/

gulp.task('watch', function(){
	gulp.watch('./src/less/**/*.less', ['minifyCss']);
	gulp.watch('./src/js/**/*.js', ['minifyJs']);
	gulp.watch('./src/img/*', ['imageResize', 'copySvg']);
	gulp.watch('./src/php/**/*.php', ['php']);
});

/********************************************************************************
DEFAULT
********************************************************************************/

gulp.task('default', ['minifyCss', 'minifyJs', 'imageResize', 'copySvg', 'php', 'watch']);