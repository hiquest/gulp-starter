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

// create src dir

let deps = ['gulp'];

let body = "";

var modules = [
   require('./modules/clean')
];

modules.forEach(function(m) {
  deps = deps.concat(m.dependencies);
  body = body.concat(m.body());
});

let head = "";
deps.forEach(function(m) {
  head = head.concat(`var ${m} = require('${m}');\n`);
});

let out = head + body;
console.log(out);
