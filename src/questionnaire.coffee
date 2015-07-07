readLine = require('readline-sync')
_        = require('underscore')

questions = [
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
]

fire = (q) ->
  answer = readLine.question(q.q)
  i = parseInt(answer, 10)
  out = q.options[i - 1]
  unless out
    console.log('Unsupported answer')
    return fire(q)
  [q.name, out]

ask = ->
  options = questions.map (q) -> fire(q)
  _.object(options)

module.exports = ask
