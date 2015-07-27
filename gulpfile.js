var gulp = require('gulp'),
    compass = require('gulp-compass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss  = require('gulp-minify-css'),
    watch = require('gulp-watch');

var webpackConfig = require('./webpack.config.js');

// Styles
gulp.task('styles', function(callback) {
  return gulp.src('./styles/*.scss')
    .pipe(compass({
        sass     : './styles',
        css      : './public/css',
        logging  : false,
        comments : false,
        style    : 'compressed'
    }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'ff 17', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(minifycss())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', ['styles'], function(){
    gulp.watch(('./styles/*.scss'), ['styles']);
});

gulp.task('default', ['styles', 'watch']);