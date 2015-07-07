module.exports = {
  dependencies: ['del'],
  body: function() { return `
gulp.task('clean', function(done) {
  del(['./build'], done);
});`
  }
}
