module.exports = {
  name: 'jade',
  type: 'markup',
  dependencies: ['gulp-jade'],
  body: function() {
    return "gulp.task('markup', function() {\n  return gulp.src('./src/*.jade')\n      .pipe(jade())\n      .pipe(gulp.dest('./dist/'));\n});";
  }
};
