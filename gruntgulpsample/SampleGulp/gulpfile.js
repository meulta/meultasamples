var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var checkcss = require('gulp-check-unused-css');

gulp.task('less', function() {
  gulp.src("*.less").
  	pipe(less()).
  	pipe(gulp.dest('.'));
});	

gulp.task('css', function() {
  gulp.src([ './*.css', './*.html' ]).
  	pipe(checkcss());
});

gulp.task('default', ['less', 'css']);