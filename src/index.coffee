#!/usr/bin/env node

# Dependencies
fs            = require('fs')
_             = require('underscore')
questionnaire = require('questionnaire')
spawnSync     = require('child_process').spawnSync

clean         = require('./modules/clean')
html          = require('./modules/html')
jade          = require('./modules/jade')
css           = require('./modules/css')
sass          = require('./modules/sass')
less          = require('./modules/less')
coffee        = require('./modules/coffee')
es6           = require('./modules/es6')
build         = require('./modules/build')
serve         = require('./modules/serve')
default_      = require('./modules/default')

modules = [clean, html, jade, css, sass, less, coffee, es6, build, serve, default_]

# create directory tree
fs.mkdirSync('./src') unless fs.existsSync('./src')
fs.mkdirSync('./src/script') unless fs.existsSync('./src/script')
fs.mkdirSync('./src/styles') unless fs.existsSync('./src/styles')

# Base sections
sections = ['markup', 'lang', 'styles']

# Ask user, what does he want
questions = sections.map (section) ->
  id: section
  options: _.chain(modules)
            .filter(section: section)
            .map('id')
            .value()

console.log "Please select options you want to use in your project..."
answers = questionnaire(questions)

# Figuring out modules that need to be applied
before = ['clean']
middle = sections.map (s) -> answers[s]
after = ['build', 'serve', 'default']

ids = _.union(before, middle, after)
modulesToApply = _.map ids, (id) -> _.find(modules, id: id)

# Now let every module add dependecies and code snippets
deps = ['gulp']
body = ""

applyModule = (m) ->
  deps = deps.concat(m.dependencies)
  body = body.concat(m.body() + "\n\n")

modulesToApply.forEach(applyModule)

head = ""
deps.forEach (m) ->
  name = if m.indexOf('gulp-') == 0
           m.replace(/gulp-/, '')
         else
           m
  name = name.replace(/-/g, '_')
  head = head.concat("var #{name} = require('#{m}');\n")

out = "#{head}\n#{body}"
fs.writeFile "./gulpfile.js", out, (err) -> console.log(err) if err

console.log("\n\n$ npm init --force")
child = spawnSync "npm", ['init', '--force'], { stdio: 'inherit' }

console.log("\n\n$ npm install --save-dev <dependencies>")
options = ['install', '--save-dev'].concat(deps)
child = spawnSync "npm", options, { stdio: 'inherit' }

console.log("\n\n$ git init")
child = spawnSync "git", ['init'], { stdio: 'inherit' }
