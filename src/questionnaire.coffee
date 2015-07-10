readLine = require('readline-sync')
_        = require('underscore')

fire = (q) ->
  answer = readLine.question(q.q)
  i = parseInt(answer, 10)
  out = q.options[i - 1]
  unless out
    console.log('Unsupported answer')
    return fire(q)
  [q.name, out]

ask = (questions) ->
  options = questions.map (q) -> fire(q)
  _.object(options)

module.exports = ask
