#!/bin/bash

# if user provided argument all, all caches are cleared

if [[ -z "$1" ]];
then
  if [[ -z "$TMPDIR" ]];
  then
    echo "\x1b[35;01m""Your current TMPDIR variable is not set. Please set it before running the script.""\x1b[39;49;00m"
    exit
  fi

  echo "\x1b[35;01m""Do you want to clear general cache(y/n)?""\x1b[39;49;00m"
  read cache

  echo "\x1b[35;01m""Do you want to re-install project libraries(y/n)?""\x1b[39;49;00m"
  read libraries

  echo "\x1b[35;01m""Do you want to clear ios project(y/n)?""\x1b[39;49;00m"
  read ios

  echo "\x1b[35;01m""Do you want to clear android project(y/n)?""\x1b[39;49;00m"
  read android

else
  while [[ $# -gt 0 ]]; do
    key="$1"

    case $key in
      cache)
        cache="y"
        shift
        ;;
      npm)
        libraries="y"
        shift
        ;;
      ios)
        ios="y"
        shift
        ;;
      android)
        android="y"
        shift
        ;;
      all)
        ios="y"
        android="y"
        cache="y"
        libraries="y"
        shift
        ;;
      *)
        shift
        ;;
    esac
  done
fi

echo "\x1b[35;01m""Clearing of the following components is starting...""\x1b[39;49;00m"
echo "cache " $cache
echo "npm " $libraries
echo "ios " $ios
echo "android " $android

if [[ $cache == "y" ]] || [[ $1 == "all" ]];
then
  . scripts/clear-cache.sh || true
fi

if [[ $libraries == "y" ]] || [[ $1 == "all" ]];
then
  . scripts/reinstall-project.sh || true
fi

if [[ $ios == "y" ]] || [[ $1 == "all" ]];
then
  . scripts/clear-ios.sh || true
fi

if [[ $android == "y" ]] || [[ $1 == "all" ]];
then
  . scripts/clear-android.sh || true
fi

echo "\x1b[35;01m""Clearing is completed. You're ready to go!""\x1b[39;49;00m"
