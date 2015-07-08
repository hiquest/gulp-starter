'use strict';

var readlineSync = require('readline-sync');

var questions = [{
  name: 'lang',
  q: '(1) ES6 or (2) CoffeeScript? ',
  options: {
    '1': 'es6',
    '2': 'coffee'
  }
}];

function fire(_x) {
  var _again = true;

  _function: while (_again) {
    var q = _x;
    answer = out = undefined;
    _again = false;

    var answer = readlineSync.question(q.q);
    var out = q.options[answer];
    if (!out) {
      console.log('Unsupported answer');
      _x = q;
      _again = true;
      continue _function;
    }
    return { name: q.name, answer: out };
  }
}

function ask() {
  var options = questions.map(function (q) {
    return fire(q);
  });
  return options;
}

module.exports = ask;