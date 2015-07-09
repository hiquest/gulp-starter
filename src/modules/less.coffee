module.exports =
  name: 'less'
  type: 'styles'
  dependencies: ['gulp-less']
  body: -> """
    gulp.task('styles', function () {
      return gulp.src('./css/styles/**/*.less')
                 .pipe(less())
                 .pipe(gulp.dest('./build/css'));
    });
  """
