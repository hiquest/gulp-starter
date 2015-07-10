module.exports =
  id: 'jade'
  section: 'markup'
  dependencies: ['gulp-jade']
  body: -> """
  gulp.task('markup', function() {
    return gulp.src('./src/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./dist/'));
  });
  """
