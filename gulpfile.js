var gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	del = require('del'),
	webpack = require('webpack-stream'),
	named = require('vinyl-named');

var webpackConfig = require('./webpack.config.js');

function js() {
	return gulp.src('src/index.js')
		.pipe(named())
		.pipe(webpack(webpackConfig))
		.pipe(gulp.dest('build/'))
}

function css() {
	return gulp.src('src/style.scss')
		.pipe($.sass())
		.pipe($.autoprefixer())
		.pipe(gulp.dest('./build'));
}

function html() {
	return gulp.src('src/**/*.html')
		.pipe(gulp.dest('build/'))
}

function server() {
	return gulp.src('build')
		.pipe($.webserver({
			livereload: true
		}))
}

function clean(cb) {
	return del('build/', cb)
}

gulp.task('watch', function() {
	gulp.watch(['src/**/*.html'], gulp.series(html));
	gulp.watch(['src/**/*.js'], gulp.series(js));
	gulp.watch(['src/**/*.scss'], gulp.series(css));
});

gulp.task('build', gulp.series(
	clean,
	gulp.parallel(js, html, css)
));

gulp.task('default', gulp.series(
	'build',
	gulp.parallel('watch', server)
));