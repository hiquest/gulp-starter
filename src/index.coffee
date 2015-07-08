# Dependencies
fs            = require('fs')
_             = require('underscore')
questionnaire = require('./questionnaire')
spawn = require('child_process').spawn

# create directory tree
fs.mkdirSync('./src') unless fs.existsSync('./src')
fs.mkdirSync('./src/script') unless fs.existsSync('./src/script')
fs.mkdirSync('./src/styles') unless fs.existsSync('./src/styles')

# All modules, that we have
allModules = ['clean', 'html', 'jade', 'css', 'scss', 'less', 'coffee', 'es6', 'build', 'serve', 'default']
modules = allModules.map (s) -> require "./modules/#{s}"

# Base sections
sections = ['markup', 'lang', 'styles']

# Ask user, what does he want
console.log "Please select options you want to use in your project..."
options = questionnaire(modules, sections)

# Figuring out modules that need to be applied
namesToApply = ['clean']
sections.forEach (s) -> namesToApply.push(options[s])
namesToApply.push('build')
namesToApply.push('serve')
namesToApply.push('default')

modulesToApply = _.map namesToApply, (name) -> _.find(modules, name: name)

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

# Now installing dependencies
console.log("\n\nInstalling dependecies...")
options = ['install', '--save-dev'].concat(deps)
child = spawn "npm", options, { stdio: 'inherit' }
