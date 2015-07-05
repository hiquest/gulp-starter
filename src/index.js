let questionnaire = require('./questionnaire')
var fs = require('fs');

let options = questionnaire();
let prettified = JSON.stringify(options, null, 2);

fs.writeFile("./gulp-setup.json", prettified, function(err) {
    if(err) {
      return console.log(err);
    }
});
