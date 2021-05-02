#!/bin/bash

echo "rm -rf ios/build..."
rm -rf ios/build

echo "rm -rf android/app/build..."
rm -rf android/app/build

echo "Removed all Xcode derived data..."
rm -rf ~/Library/Developer/Xcode/DerivedData

echo "Removed iOS Pods data..."
rm -rf ios/Pods/*

echo "Removed Podfile.lock..."
rm Podfile.lock

echo "watchman watch-del-all..."
watchman watch-del-all

echo "rm -rf node_modules..."
rm -rf node_modules

echo "npm install..."
npm install

echo "Pods install..."
cd ios && pod install && cd ..

echo "rm -rf $TMPDIR/react-*..."
rm -rf $TMPDIR/react-*

echo "rm -rf $TMPDIR/haste-map-react-native-packager-*..."
rm -rf $TMPDIR/haste-map-react-native-packager-*

echo "rm -rf $TMPDIR/metro-*..."
rm -rf $TMPDIR/metro-*
