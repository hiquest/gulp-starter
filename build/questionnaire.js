var _, ask, buildQuestions, fire, readLine;

readLine = require('readline-sync');

_ = require('underscore');

buildQuestions = function(modules, sections) {
  return sections.map(function(type) {
    var byType, options, question;
    byType = _.filter(modules, function(m) {
      return m.type === type;
    });
    question = _.map(byType, function(m, ind) {
      return "(" + (ind + 1) + ") " + m.name;
    }).join(" or ") + '? ';
    options = _.map(byType, 'name');
    return {
      name: type,
      q: question,
      options: options
    };
  });
};

fire = function(q) {
  var answer, i, out;
  answer = readLine.question(q.q);
  i = parseInt(answer, 10);
  out = q.options[i - 1];
  if (!out) {
    console.log('Unsupported answer');
    return fire(q);
  }
  return [q.name, out];
};

ask = function(modules, sections) {
  var options, questions;
  questions = buildQuestions(modules, sections);
  options = questions.map(function(q) {
    return fire(q);
  });
  return _.object(options);
};

module.exports = ask;
