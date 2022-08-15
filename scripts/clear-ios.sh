#!/bin/bash

echo "\x1b[35;01m""Start clearing iOS cache...""\x1b[39;49;00m"

echo "Remove all Xcode derived data..."
rm -rf ~/Library/Developer/Xcode/DerivedData

echo "Remove iOS build..."
rm -rf ios/build

echo "Remove iOS Pods data..."
rm -rf ios/Pods/*

echo "Remove Podfile.lock..."
rm Podfile.lock

echo "Close XCode and wipe iOS build artifacts..."
(killall Xcode || true) && xcrun -k && cd ios && xcodebuild -alltargets clean && cd .. && rm -rf "$(getconf DARWIN_USER_CACHE_DIR)/org.llvm.clang/ModuleCache" && rm -rf "$(getconf DARWIN_USER_CACHE_DIR)/org.llvm.clang.$(whoami)/ModuleCache" && rm -fr ~/Library/Developer/Xcode/DerivedData/ && rm -fr ~/Library/Caches/com.apple.dt.Xcode/

echo "Wipe system iOS Pods cache..."
pod cache clean --all

echo "Wipe user iOS Pods cocoapods cache..."
rm -rf ~/.cocoapods

echo "Pods install..."
cd ios && pod install && cd ..

echo "\x1b[35;01m""Done clearing iOS cache!""\x1b[39;49;00m"
