module.exports = {
  name: 'coffee',
  type: 'lang',
  dependencies: ['gulp-coffee'],
  body: function() {
    return "gulp.task('compile', function() {\n  return gulp.src('src/script/**/*.coffee')\n             .pipe(coffee({bare: true}))\n             .pipe(gulp.dest('./build/js'));\n});";
  }
};
