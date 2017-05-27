var gulp = require('gulp'), //be sure to install gulp globally as well
	vfs = require('vinyl-fs'),
	fs = require('fs'),
	jshint = require('gulp-jshint'), //make sure jshint is installed globally with gulp-jshint
	gulpConcat = require('gulp-concat'),
	uglify     = require('gulp-uglify'),
	gutil = require('gulp-util'),
	del = require('del'),
	rename = require('gulp-rename'),
    plumber = require('gulp-plumber');

var config = require('./gulp-config.json');
var pkg = require('./package.json');

/**
 *  copy vendor styles to src
 */
gulp.task('copy-vendor-styles-dest', function(callback) {
	var counter = 0;
	
	for (var i = 0; i < Object.keys(config.src.vendor.stylePartials).length; i++) {
		var dir = Object.keys(config.src.vendor.stylePartials)[i];
		
		gulp.src(config.src.vendor.stylePartials[dir])
			.pipe(vfs.dest('src/_sass/vendor/' + dir, {overwrite: false}));
		
		if (++counter == Object.keys(config.src.vendor.stylePartials).length) {
			callback(null);
		}
	}
	
});

/**
 *  copy vendor js
 */
gulp.task('copy-vendor-js', function() {
	return gulp.src(config.src.vendor.js)
		.pipe(vfs.dest('src/assets/js/vendor'));
});

/**
 *  copy vendor fonts
 */
gulp.task('copy-vendor-fonts', function() {
	return gulp.src(config.src.vendor.fonts)
		.pipe(vfs.dest(config.dest.fonts.vendor));
});


/**
 *  compile js
 */
gulp.task('compile-site-js', function() {
	return gulp.src(config.src.js.site)
		.pipe(plumber({
			errorHandler : function (err) {
				console.log(err); //output errors to the console
				this.emit('end'); //tell gulp to end the task that errored out to prevent the task hanging
			}
		}))
		.pipe(jshint()) // lint each file to ensure that it follows project conventions
		.pipe(gulpConcat("site.js")) // combine individual files into one file
		.pipe(rename({basename: 'site'}))
		.pipe(rename({suffix: '.min'})) // rename file for minification
		//.pipe(uglify().on('error', gutil.log)) // minify the concatentated file
		.pipe(gulp.dest(config.dest.js.site)); //move files to build directory
		
});

gulp.task('compile-vendor-js', ['copy-vendor-js'], function() {
	return gulp.src(config.src.js.vendor)
		.pipe(plumber({
			errorHandler : function (err) {
				console.log(err); //output errors to the console
				this.emit('end'); //tell gulp to end the task that errored out to prevent the task hanging
			}
		}))
		.pipe(jshint()) // lint each file to ensure that it follows project conventions
		.pipe(gulpConcat("vendor.js")) // combine individual files into one file
		.pipe(rename({basename: 'vendor'}))
		.pipe(rename({suffix: '.min'})) // rename file for minification
		.pipe(uglify().on('error', gutil.log)) // minify the concatentated file
		.pipe(gulp.dest(config.dest.js.vendor)); //move files to build directory
		
});

gulp.task('clean', function() {	
	return del([
	  'dist/**/*',
	  'src/_sass/vendor/**/*',
	  'src/assets/js/vendor/**/*',
	  'src/assets/js/*.js'
	]);
});

gulp.task('watch', function() {
	
	//watch site javascript files
	gulp.watch(config.src.js.site, ['compile-site-js'], function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
	
	//watch vendor javascript files
	gulp.watch(config.src.js.vendor, ['compile-vendor-js'], function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
	
	// watch gulpfile
	gulp.watch('gulpfile.js', ['default'], function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
	
	// watch gulp-config.json
	gulp.watch('gulp-config.json', ['default'], function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
})

gulp.task('default', ['copy-vendor-styles-dest', 'copy-vendor-fonts', 'copy-vendor-js', 'compile-vendor-js', 'compile-site-js']);