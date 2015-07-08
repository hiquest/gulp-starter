module.exports = {
  name: 'es6',
  type: 'lang',
  dependencies: ['gulp-babel'],
  body: function() {
    return "gulp.task('compile', function() {\n  return gulp.src('src/script/**/*.js')\n             .pipe(babel())\n             .pipe(gulp.dest('./build/js'));\n});";
  }
};
