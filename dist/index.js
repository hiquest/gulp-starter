#!/usr/bin/env node

var _, allModules, applyModule, body, child, deps, fs, head, modules, modulesToApply, namesToApply, options, out, questionnaire, sections, spawn;

fs = require('fs');

_ = require('underscore');

questionnaire = require('./questionnaire');

spawn = require('child_process').spawn;

if (!fs.existsSync('./src')) {
  fs.mkdirSync('./src');
}

if (!fs.existsSync('./src/script')) {
  fs.mkdirSync('./src/script');
}

if (!fs.existsSync('./src/styles')) {
  fs.mkdirSync('./src/styles');
}

allModules = ['clean', 'html', 'jade', 'css', 'scss', 'less', 'coffee', 'es6', 'build', 'serve', 'default'];

modules = allModules.map(function(s) {
  return require("./modules/" + s);
});

sections = ['markup', 'lang', 'styles'];

console.log("Please select options you want to use in your project...");

options = questionnaire(modules, sections);

namesToApply = ['clean'];

sections.forEach(function(s) {
  return namesToApply.push(options[s]);
});

namesToApply.push('build');

namesToApply.push('serve');

namesToApply.push('default');

modulesToApply = _.map(namesToApply, function(name) {
  return _.find(modules, {
    name: name
  });
});

deps = ['gulp'];

body = "";

applyModule = function(m) {
  deps = deps.concat(m.dependencies);
  return body = body.concat(m.body() + "\n\n");
};

modulesToApply.forEach(applyModule);

head = "";

deps.forEach(function(m) {
  var name;
  name = m.indexOf('gulp-') === 0 ? m.replace(/gulp-/, '') : m;
  name = name.replace(/-/g, '_');
  return head = head.concat("var " + name + " = require('" + m + "');\n");
});

out = head + "\n" + body;

fs.writeFile("./gulpfile.js", out, function(err) {
  if (err) {
    return console.log(err);
  }
});

console.log("\n\nInstalling dependecies...");

options = ['install', '--save-dev'].concat(deps);

child = spawn("npm", options, {
  stdio: 'inherit'
});
