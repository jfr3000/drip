#!/bin/bash

echo "\x1b[35;01m""Start re-installing dependencies...""\x1b[39;49;00m"

echo "Remove node_modules..."
rm -rf node_modules

echo "Yarn install..."
yarn

echo "Pods install..."
cd ios && pod install && cd ..

echo "\x1b[35;01m""Done re-installing dependencies!""\x1b[39;49;00m"
