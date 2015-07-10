module.exports =
  id: 'css'
  section: 'styles'
  dependencies: []
  body: -> """
    gulp.task('styles', function() {
      return gulp.src('./src/styles/**/*.css')
                 .pipe(gulp.dest('./build/css/'));
    });
  """
