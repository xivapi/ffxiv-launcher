#!/usr/bin/env bash

# Compile styles in prod mode
echo "Compiling styles in prod mode"
yarn build

# Compile the full app
echo "Compiling the full app to the dist folder"
yarn dist
