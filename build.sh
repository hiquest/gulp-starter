#!/bin/bash

set -e

browserify -t coffeeify  --extension=".coffee" --no-bundle-external src/index.coffee > index.js
