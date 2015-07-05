let readlineSync = require('readline-sync');
let _            = require('underscore');

let questions = [
  {
    name: 'markup',
    q: '(1) plain html or (2) slim? ',
    options: ['html', 'slim']
  },
  {
    name: 'lang',
    q: '(1) ES6 or (2) CoffeeScript? ',
    options: ['es6', 'coffee']
  },
  {
    name: 'styles',
    q: '(1) CSS or (2) SASS or (3) SCSS? ',
    options: ['css', 'sass', 'scss']
  }
];

function fire(q) {
  let answer = readlineSync.question(q.q);
  let i = parseInt(answer, 10);
  let out = q.options[i - 1];
  if(!out) {
    console.log('Unsupported answer')
    return fire(q);
  }
  return [q.name, out];
}

function ask() {
  let options = questions.map((q) => fire(q))
  return _.object(options)
}

module.exports = ask;
