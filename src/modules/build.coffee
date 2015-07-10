module.exports =
  id: 'build'
  dependencies: ['run-sequence']
  body: -> """
    gulp.task('build', function(done) {
      run_sequence('clean', ['markup', 'compile', 'styles'], done);
    });
  """
