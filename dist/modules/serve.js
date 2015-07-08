module.exports = {
  name: 'serve',
  dependencies: ['gulp-connect', 'gulp-watch'],
  body: function() {
    return "gulp.task('serve', ['build'], function() {\n  connect.server({livereload: true, root: './build'});\n  gulp.watch(\"./src/**/*.*\", ['build']);\n  watch(\"./build/**/*.*\").pipe(connect.reload());\n});";
  }
};
