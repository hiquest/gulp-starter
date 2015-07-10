module.exports =
  id: 'es6'
  section: 'lang'
  dependencies: ['gulp-babel']
  body: -> """
    gulp.task('compile', function() {
      return gulp.src('src/script/**/*.js')
                 .pipe(babel())
                 .pipe(gulp.dest('./build/js'));
    });
  """
