readLine = require('readline-sync')
_        = require('underscore')

ask = (id, options) ->
  text = _.map(options, (option, ind) -> "(#{ind+1}) #{option}")
          .join(" or ") + '? '
  answer = readLine.question(text)
  i = parseInt(answer, 10)
  out = options[i - 1]
  unless out
    console.log('Unsupported answer')
    return ask(id, options)
  [id, out]

questionnaire = (questions) ->
  answers = questions.map (q) -> ask(q.id, q.options)
  _.object(answers)

module.exports = questionnaire
