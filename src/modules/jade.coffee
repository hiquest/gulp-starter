module.exports =
  name: 'jade'
  type: 'markup'
  dependencies: ['gulp-jade']
  body: -> """
  gulp.task('markup', function() {
    return gulp.src('./src/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./dist/'));
  });
  """
