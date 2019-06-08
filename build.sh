#!/usr/bin/env bash

# Compile styles in prod mode
echo "Compiling styles in prod mode"
yarn run encore prod

# Compile the full app
echo "Compiling the full app to the dist folder"
yarn dist
