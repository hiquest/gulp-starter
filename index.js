#!/usr/bin/env node
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
  id: 'build',
  dependencies: ['run-sequence'],
  body: function() {
    return "gulp.task('build', function(done) {\n  run_sequence('clean', ['markup', 'compile', 'styles'], done);\n});";
  }
};



},{}],2:[function(require,module,exports){
module.exports = {
  id: 'clean',
  dependencies: ['del'],
  body: function() {
    return "gulp.task('clean', function(done) {\n  return del(['./build'], done);\n});";
  }
};



},{}],3:[function(require,module,exports){
module.exports = {
  id: 'coffee',
  section: 'lang',
  dependencies: ['gulp-coffee'],
  body: function() {
    return "gulp.task('compile', function() {\n  return gulp.src('src/script/**/*.coffee')\n             .pipe(coffee({bare: true}))\n             .pipe(gulp.dest('./build/js'));\n});";
  }
};



},{}],4:[function(require,module,exports){
module.exports = {
  id: 'css',
  section: 'styles',
  dependencies: [],
  body: function() {
    return "gulp.task('styles', function() {\n  return gulp.src('./src/styles/**/*.css')\n             .pipe(gulp.dest('./build/css/'));\n});";
  }
};



},{}],5:[function(require,module,exports){
module.exports = {
  id: 'default',
  dependencies: [],
  body: function() {
    return "gulp.task('default', ['serve']);";
  }
};



},{}],6:[function(require,module,exports){
module.exports = {
  id: 'es6',
  section: 'lang',
  dependencies: ['gulp-babel'],
  body: function() {
    return "gulp.task('compile', function() {\n  return gulp.src('src/script/**/*.js')\n             .pipe(babel())\n             .pipe(gulp.dest('./build/js'));\n});";
  }
};



},{}],7:[function(require,module,exports){
module.exports = {
  id: 'html',
  section: 'markup',
  dependencies: [],
  body: function() {
    return "gulp.task('markup', function() {\n  gulp.src('./src/*.html')\n      .pipe(gulp.dest('./build/'));\n});";
  }
};



},{}],8:[function(require,module,exports){
module.exports = {
  id: 'jade',
  section: 'markup',
  dependencies: ['gulp-jade'],
  body: function() {
    return "gulp.task('markup', function() {\n  return gulp.src('./src/*.jade')\n      .pipe(jade())\n      .pipe(gulp.dest('./dist/'));\n});";
  }
};



},{}],9:[function(require,module,exports){
module.exports = {
  id: 'less',
  section: 'styles',
  dependencies: ['gulp-less'],
  body: function() {
    return "gulp.task('styles', function () {\n  return gulp.src('./css/styles/**/*.less')\n             .pipe(less())\n             .pipe(gulp.dest('./build/css'));\n});";
  }
};



},{}],10:[function(require,module,exports){
module.exports = {
  id: 'sass',
  section: 'styles',
  dependencies: ['gulp-sass'],
  body: function() {
    return "gulp.task('styles', function () {\n  return gulp.src('./src/styles/**/*.scss')\n             .pipe(sass().on('error', sass.logError))\n             .pipe(gulp.dest('./build/css/'));\n});";
  }
};



},{}],11:[function(require,module,exports){
module.exports = {
  id: 'serve',
  dependencies: ['gulp-connect', 'gulp-watch'],
  body: function() {
    return "gulp.task('serve', ['build'], function() {\n  connect.server({livereload: true, root: './build'});\n  gulp.watch(\"./src/**/*.*\", ['build']);\n  watch(\"./build/**/*.*\").pipe(connect.reload());\n});";
  }
};



},{}],12:[function(require,module,exports){
var _, after, answers, applyModule, before, body, build, child, clean, coffee, css, default_, deps, es6, fs, head, html, ids, jade, less, middle, modules, modulesToApply, options, out, questionnaire, questions, sass, sections, serve, spawnSync;

fs = require('fs');

_ = require('underscore');

questionnaire = require('questionnaire');

spawnSync = require('child_process').spawnSync;

clean = require('./modules/clean');

html = require('./modules/html');

jade = require('./modules/jade');

css = require('./modules/css');

sass = require('./modules/sass');

less = require('./modules/less');

coffee = require('./modules/coffee');

es6 = require('./modules/es6');

build = require('./modules/build');

serve = require('./modules/serve');

default_ = require('./modules/default');

modules = [clean, html, jade, css, sass, less, coffee, es6, build, serve, default_];

if (!fs.existsSync('./src')) {
  fs.mkdirSync('./src');
}

if (!fs.existsSync('./src/script')) {
  fs.mkdirSync('./src/script');
}

if (!fs.existsSync('./src/styles')) {
  fs.mkdirSync('./src/styles');
}

sections = ['markup', 'lang', 'styles'];

questions = sections.map(function(section) {
  return {
    id: section,
    options: _.chain(modules).filter({
      section: section
    }).map('id').value()
  };
});

console.log("Please select options you want to use in your project...");

answers = questionnaire(questions);

before = ['clean'];

middle = sections.map(function(s) {
  return answers[s];
});

after = ['build', 'serve', 'default'];

ids = _.union(before, middle, after);

modulesToApply = _.map(ids, function(id) {
  return _.find(modules, {
    id: id
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

console.log("\n\n$ npm init --force");

child = spawnSync("npm", ['init', '--force'], {
  stdio: 'inherit'
});

console.log("\n\n$ npm install --save-dev <dependencies>");

options = ['install', '--save-dev'].concat(deps);

child = spawnSync("npm", options, {
  stdio: 'inherit'
});

console.log("\n\n$ git init");

child = spawnSync("git", ['init'], {
  stdio: 'inherit'
});



},{"./modules/build":1,"./modules/clean":2,"./modules/coffee":3,"./modules/css":4,"./modules/default":5,"./modules/es6":6,"./modules/html":7,"./modules/jade":8,"./modules/less":9,"./modules/sass":10,"./modules/serve":11,"child_process":undefined,"fs":undefined,"questionnaire":undefined,"underscore":undefined}]},{},[12]);
