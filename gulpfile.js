/**
 * @author Viacheslav Lotsmanov <lotsmanov89@gmail.com>
 * @license MIT
 */

'use strict';

var gulp = require('gulp');
var del = require('del');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

const srcFile = 'jquery.inlinesvg.js';
const minFile = 'jquery.inlinesvg.min.js';

gulp.task('clean-min', function (cb) {
    del([minFile], cb);
});

gulp.task('min', ['clean-min'], function () {
    return gulp.src([srcFile])
        .pipe(uglify({ preserveComments: 'some' }))
        .pipe(rename(minFile))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['min']);
