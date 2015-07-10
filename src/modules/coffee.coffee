module.exports =
  id: 'coffee'
  section: 'lang'
  dependencies: ['gulp-coffee']
  body: -> """
    gulp.task('compile', function() {
      return gulp.src('src/script/**/*.coffee')
                 .pipe(coffee({bare: true}))
                 .pipe(gulp.dest('./build/js'));
    });
  """
