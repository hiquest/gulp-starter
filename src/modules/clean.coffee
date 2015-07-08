module.exports =
  name: 'clean'
  dependencies: ['del']
  body: -> """
    gulp.task('clean', function(done) {
      return del(['./build'], done);
    });
  """
