module.exports =
  id: 'html'
  section: 'markup'
  dependencies: []
  body: -> """
    gulp.task('markup', function() {
      gulp.src('./src/*.html')
          .pipe(gulp.dest('./build/'));
    });
  """
