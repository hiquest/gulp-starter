module.exports = {
  name: 'clean',
  dependencies: ['del'],
  body: function() {
    return "gulp.task('clean', function(done) {\n  return del(['./build'], done);\n});";
  }
};
