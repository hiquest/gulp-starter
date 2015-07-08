module.exports = {
  name: 'html',
  type: 'markup',
  dependencies: [],
  body: function() {
    return "gulp.task('markup', function() {\n  gulp.src('./src/*.html')\n      .pipe(gulp.dest('./build/'));\n});";
  }
};
