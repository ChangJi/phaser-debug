var gulp = require('gulp'),
    gutil = require('gulp-util'),
    source = require('vinyl-source-stream'),
    watchify = require('watchify'),
    browserify = require('browserify'),

    index = './src/index.js',
    outdir = './dist',
    bundle = 'Phaser.Plugin.Debug',
    outfile = 'phaser-debug.js';

function rebundle(bundler) {
    bundler = bundler || this;

    return bundler.bundle()
        // log errors if they happen
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source(outfile))
        .pipe(gulp.dest(outdir));
}

/*****
 * Dev task, incrementally rebuilds the output bundle as the the sources change
 *****/
gulp.task('dev', function() {
    watchify.args.standalone = bundle;
    var bundler = watchify(browserify(index, watchify.args));

    bundler.on('update', rebundle);

    return rebundle(bundler);
});

/*****
 * Build task, builds the output bundle
 *****/
gulp.task('build', function () {
    return rebundle(browserify(index, { standalone: bundle }));
});

/*****
 * Base task
 *****/
gulp.task('default', ['build']);
