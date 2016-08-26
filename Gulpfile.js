'use strict';

var gulp = require('gulp');
var cssnano = require('cssnano');
var postcss = require('gulp-postcss');
var postcssImport = require('postcss-import');
var autoprefixer = require('autoprefixer');
var opacity = require('postcss-opacity');
var simpleVars = require('postcss-simple-vars');
var color = require('postcss-color-function');
var nested = require('postcss-nested');
var map = require('postcss-map');
var calc = require('postcss-calc');
var clearfix = require('postcss-clearfix');
var grid = require('postcss-neat');
var media = require('postcss-media-minmax');
var custom = require('postcss-custom-media');

var settings = require('./client/assets/css/src/_settings');

var processors = [
  postcssImport,
  simpleVars,
  clearfix,
  nested,
  custom,
  media,
  map(settings.map),
  opacity,
  color,
  calc,
  autoprefixer({ browsers: ["last 2 version", "safari 5", "ie > 9", "opera 12.1", "ios 6", "android 2.3"] }),
  grid,
  cssnano()
];

function handleError(error) {
  console.log(error.toString());

  this.emit('end');
}

gulp.task('css', function () {
  return gulp.src('./client/assets/css/src/styles.css')
  .pipe(postcss(processors))
  .on('error', handleError)
  .pipe(gulp.dest('./client/assets/css'));
});

gulp.task('watch', function() {
  gulp.watch(['./client/assets/css/src/**/*.css', 'Gulpfile.js'], ['css']);
  });

gulp.task('default', ['watch']);