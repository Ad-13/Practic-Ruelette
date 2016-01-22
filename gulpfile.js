var gulp = require('gulp'),
		wiredep = require('wiredep').stream,
		useref = require('gulp-useref'),
		gulpif = require('gulp-if'),
		uglify = require('gulp-uglify'),
		concatCss = require('gulp-concat-css'),
		minifyCSS = require('gulp-minify-css'),
		autoprefixer = require('gulp-autoprefixer'),
		compass = require('gulp-compass'),
		notify = require("gulp-notify"),
		clean = require('gulp-clean'),
		connect = require('gulp-connect'),
		livereload = require('gulp-livereload');

gulp.task('clean', function () {
	return gulp.src('www', {read: false})
		.pipe(clean());
});

// COMPASS
gulp.task('compass', function() {
	gulp.src('./app/sass/*.scss')
	.pipe(compass({
		config_file: 'app/config.rb',
		css: 'app/css',
		sass: 'app/sass'
	}))
	.pipe(gulp.dest('./app/css'))
});

// CSS
gulp.task('css', function() {
	gulp.src('./app/css/*.css')
	.pipe(autoprefixer({
		browsers: ['last 10 versions', '>1%', 'ie 8', 'Firefox > 20'],
		cascade: false
	}))
	.pipe(concatCss("bundle.min.css"))
	.pipe(minifyCSS())
	.pipe(gulp.dest('app/temp'))
	.pipe(connect.reload())
	.pipe(notify("Done!"));
});

// WATCH
gulp.task('watch', function() {
	gulp.watch('bower.json', ['bower']);
	gulp.watch('app/sass/*.scss', ['compass']);
	gulp.watch('app/css/*.css', ['css']);
	gulp.watch('app/index.html', ['css']);
	gulp.watch('app/js/main.js', ['css']);
})

// BUILD
gulp.task('build', ['clean'], function() {
	return gulp.src('app/*.html')
	.pipe(useref())
	.pipe(gulpif('*.js', uglify()))
	.pipe(gulp.dest('www'));
});

// BOWER
gulp.task('bower', function () {
	gulp.src('./app/index.html')
		.pipe(wiredep({
			directory : "app/bower_components"
		}))
		.pipe(gulp.dest('./app'));
});

// CONNECT
gulp.task('connect', function() {
	connect.server({
		root: '',
		livereload: true
	});
});

// DEFAULT
gulp.task('default', ['connect', 'compass', 'css', 'watch']);