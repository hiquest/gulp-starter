readLine = require('readline-sync')
_        = require('underscore')

fire = (q) ->
  text = _.map(q.options, (option, ind) -> "(#{ind+1}) #{option}")
          .join(" or ") + '? '
  answer = readLine.question(text)
  i = parseInt(answer, 10)
  out = q.options[i - 1]
  unless out
    console.log('Unsupported answer')
    return fire(q)
  [q.id, out]

ask = (questions) ->
  options = questions.map (q) -> fire(q)
  _.object(options)

module.exports = ask
