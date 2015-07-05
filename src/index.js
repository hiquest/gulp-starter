let questionnaire = require('./questionnaire')
var fs = require('fs');

let options = questionnaire();

// Write to file
let prettified = JSON.stringify(options, null, 2);

fs.writeFile("./gulp-setup.json", prettified, function(err) {
  if(err) {
    return console.log(err);
  }
});
// ************

// create src dir

let modules = ['gulp'];

let body = "";

// Clean

modules.push('del');

body = body.concat(`
gulp.task('clean', function(done) {
  del(['./build'], done);
});
`);

// ... more tasks here

let head = "";
modules.forEach(function(m) {
  head = head.concat(`var ${m} = require('${m}');\n`);
});

let out = head + body;
console.log(out);
