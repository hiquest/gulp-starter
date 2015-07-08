module.exports =
  name: 'css'
  type: 'styles'
  dependencies: []
  body: -> """
    gulp.task('styles', function() {
      return gulp.src('./src/styles/**/*.css')
                 .pipe(gulp.dest('./build/css/'));
    });
  """
