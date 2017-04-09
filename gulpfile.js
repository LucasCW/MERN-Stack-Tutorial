var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

gulp.task('bundle', () => {
	return browserify('src/App.js')
		.transform('babelify', { presets: 'react' })
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('static/'));
});

gulp.task('watch', () => {
	var b = browserify({
		entries: ['src/App.js'],
		cache: {}, packageCache: {},
		plugin: ['watchify']
	});

	b.on('update', makeBundle);

	function makeBundle() {
		b.transform('babelify', { presets: 'react' })
			.bundle()
			.pipe(source('bundle.js'))
			.pipe(gulp.dest('static/'));
	};

	makeBundle();

	return b;
});