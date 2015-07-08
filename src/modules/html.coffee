module.exports =
  name: 'html'
  type: 'markup'
  dependencies: []
  body: -> """
    gulp.task('markup', function() {
      gulp.src('./src/*.html')
          .pipe(gulp.dest('./build/'));
    });
  """
