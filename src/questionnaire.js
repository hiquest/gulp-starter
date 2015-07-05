var readlineSync = require('readline-sync');

let questions = [
  {
    name: 'lang',
    q: '(1) ES6 or (2) CoffeeScript? ',
    options: {
      '1': 'es6',
      '2': 'coffee'
    }
  }

];

function fire(q) {
  let answer = readlineSync.question(q.q);
  let out = q.options[answer]
  if(!out) {
    console.log('Unsupported answer')
    return fire(q);
  }
  return {name: q.name, answer: out};
}

function ask() {
  let options = questions.map((q) => fire(q))
  let out = { };
  options.forEach(function(s) {
    out[s.name] = s.answer
  });
  return out;
}

module.exports = ask;
