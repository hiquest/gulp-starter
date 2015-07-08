module.exports =
  name: 'sass'
  type: 'styles'
  dependencies: []
  body: -> """
    gulp.task('styles', function () {
      return gulp.src('./src/styles/**/*.scss')
                 .pipe(sass().on('error', sass.logError))
                 .pipe(gulp.dest('./build/css/'));
    });
  """
