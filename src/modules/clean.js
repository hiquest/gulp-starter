module.exports = {
  dependencies: ['del'],
  body: `
gulp.task('clean', function(done) {
  del(['./build'], done);
});`
}
