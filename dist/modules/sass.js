module.exports = {
  name: 'sass',
  type: 'styles',
  dependencies: [],
  body: function() {
    return "gulp.task('styles', function () {\n  return gulp.src('./src/styles/**/*.scss')\n             .pipe(sass().on('error', sass.logError))\n             .pipe(gulp.dest('./build/css/'));\n});";
  }
};
