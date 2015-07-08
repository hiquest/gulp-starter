module.exports =
  name: 'serve'
  dependencies: ['gulp-connect', 'gulp-watch']
  body: -> """
    gulp.task('serve', ['build'], function() {
      connect.server({livereload: true, root: './build'});
      gulp.watch("./src/**/*.*", ['build']);
      watch("./build/**/*.*").pipe(connect.reload());
    });
  """
