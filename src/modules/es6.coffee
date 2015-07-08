module.exports =
  name: 'es6'
  type: 'lang'
  dependencies: ['gulp-babel']
  body: -> """
    gulp.task('compile', function() {
      return gulp.src('src/script/**/*.js')
                 .pipe(babel())
                 .pipe(gulp.dest('./build/js'));
    });
  """
