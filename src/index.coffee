# Dependencies
fs            = require('fs')
_             = require('underscore')
questionnaire = require('./questionnaire')

# All modules, that we have
allModules = ['clean', 'html', 'jade', 'css', 'scss', 'sass', 'coffee', 'es6']
modules = allModules.map (s) -> require "./modules/#{s}"

# Base sections
sections = ['markup', 'lang', 'styles']

# Ask user, what does he want
options = questionnaire(modules, sections)

# Write To File The Answers? maybe we don't need this
prettified = JSON.stringify(options, null, 2)
fs.writeFile "./gulp-setup.json", prettified, (err) -> console.log(err) if err

# Figuring out modules that need to be applied
namesToApply = ['clean']
sections.forEach (s) -> namesToApply.push(options[s])
modulesToApply = _.map namesToApply, (name) -> _.find(modules, name: name)

# Now let every module add dependecies and code snippets
deps = ['gulp']
body = ""

applyModule = (m) ->
  deps = deps.concat(m.dependencies)
  body = body.concat(m.body() + "\n\n")

console.log "modules to apply: #{modulesToApply}"
modulesToApply.forEach(applyModule)

head = ""
deps.forEach (m) ->
  name = if m.indexOf('gulp-') == 0
           m.replace(/gulp-/, '')
         else
           m
  head = head.concat("var #{name} = require('#{m}');\n")

out = "#{head}\n#{body}"
console.log("\n")
console.log(out)
