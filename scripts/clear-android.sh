#!/bin/bash

echo "\x1b[35;01m""Start clearing android cache...""\x1b[39;49;00m"

echo "Clean android project..."
cd android && ./gradlew clean && cd ..

echo "Remove Android build..."
rm -rf android/app/build

echo "\x1b[35;01m""Done!""\x1b[39;49;00m"
