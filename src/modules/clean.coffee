module.exports =
  name: 'clean'
  dependencies: ['del']
  body: -> """
    gulp.task('clean', function(done) {
      del(['./build'], done);
    });
  """
