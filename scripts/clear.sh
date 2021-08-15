#!/bin/bash

# if user provided argument all, all caches are cleared

if [[ -z "$1" ]];
then
  if [[ -z "$TMPDIR" ]];
  then
    echo "\x1b[35;01m""Your current TMPDIR variable is not set. Please set it before running the script.""\x1b[39;49;00m"
    exit
  fi

  echo "\x1b[35;01m""Do you want to clear ios project(y/n)?""\x1b[39;49;00m"
  read ios

  echo "\x1b[35;01m""Do you want to clear android project(y/n)?""\x1b[39;49;00m"
  read android

  echo "\x1b[35;01m""Do you want to clear general cache(y/n)?""\x1b[39;49;00m"
  read cache

  echo "\x1b[35;01m""Do you want to re-install project libraries?""\x1b[39;49;00m"
  read libraries
else
  while [[ $# -gt 0 ]]; do
    key="$1"

    case $key in
      ios)
        ios="y"
        shift
        ;;
      android)
        android="y"
        shift
        ;;
      cache)
        cache="y"
        shift
        ;;
      npm)
        libraries="y"
        shift
        ;;
      *)
        shift
        ;;
    esac
  done
fi

echo "ios " $ios
echo "android " $android
echo "cache " $cache
echo "npm " $libraries

if [[ $ios == "y" ]] || [[ $1 == "all" ]];
then
  . scripts/clear-ios.sh
fi

if [[ $android == "y" ]] || [[ $1 == "all" ]];
then
  . scripts/clear-android.sh
fi

if [[ $cache == "y" ]] || [[ $1 == "all" ]];
then
  . scripts/clear-cache.sh
fi

if [[ $libraries == "y" ]] || [[ $1 == "all" ]];
then
  . scripts/reinstall-project.sh
fi

echo "\x1b[35;01m""Clearing is completed. You're ready to go!""\x1b[39;49;00m"
