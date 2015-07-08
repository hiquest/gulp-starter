module.exports = {
  name: 'less',
  type: 'styles',
  dependencies: [],
  body: function() {
    return "gulp.task('styles', function () {\n  return gulp.src('./css/styles/**/*.less')\n             .pipe(less())\n             .pipe(gulp.dest('./build/css'));\n});";
  }
};
