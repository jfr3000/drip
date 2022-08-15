#!/bin/bash

echo "\x1b[35;01m""Start clearing general cache...""\x1b[39;49;00m"

echo "Clear Watchman cache..."
watchman watch-del-all

echo "Remove React temp data..."
rm -rf $TMPDIR/react-*

echo "Remove React Native Packager temp data..."
rm -rf $TMPDIR/haste-map-react-native-packager-*

echo "Remove Metro bundler temp data..."
rm -rf $TMPDIR/metro-*

echo "\x1b[35;01m""Done clearing general cache!""\x1b[39;49;00m"
