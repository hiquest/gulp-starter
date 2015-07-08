module.exports = {
  name: 'build',
  dependencies: ['run-sequence'],
  body: function() {
    return "gulp.task('build', function(done) {\n  run_sequence('clean', ['markup', 'compile', 'styles'], done);\n});";
  }
};
