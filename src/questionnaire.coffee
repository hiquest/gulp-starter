readLine = require('readline-sync')
_        = require('underscore')

buildQuestions = (modules) ->
  ['markup', 'lang', 'styles'].map (type) ->
    byType = _.filter(modules, (m) -> m.type == type)
    question = _.map(byType, (m, ind) -> "(#{ind+1}) #{m.name}")
                .join(" or ") + '? '
    options = _.map(byType, 'name')
    {
      name: type,
      q: question,
      options: options
    }

fire = (q) ->
  answer = readLine.question(q.q)
  i = parseInt(answer, 10)
  out = q.options[i - 1]
  unless out
    console.log('Unsupported answer')
    return fire(q)
  [q.name, out]

ask = (modules) ->
  questions = buildQuestions(modules)
  options = questions.map (q) -> fire(q)
  _.object(options)

module.exports = ask
