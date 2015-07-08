module.exports = {
  name: 'css',
  type: 'styles',
  dependencies: [],
  body: function() {
    return "gulp.task('styles', function() {\n  return gulp.src('./src/styles/**/*.css')\n             .pipe(gulp.dest('./build/css/'));\n});";
  }
};
