questionnaire = require('./questionnaire')
fs = require('fs')

modules = [
  require('./modules/clean')
]

options = questionnaire()

prettified = JSON.stringify(options, null, 2)

fs.writeFile "./gulp-setup.json", prettified, (err) ->
  console.log(err) if err

deps = ['gulp']
body = ""

applyModule = (m) ->
  deps = deps.concat(m.dependencies)
  body = body.concat(m.body())

modules.forEach(applyModule)

head = ""
deps.forEach (m) ->
  head = head.concat("var #{m} = require('#{m}');\n")

out = "#{head}\n#{body}"
console.log(out)
