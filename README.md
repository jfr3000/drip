# drip, the open-source cycle tracking app

A menstrual cycle tracking app that's open-source and leaves your data on your phone. Use it to track your menstrual cycle and/or for fertility awareness!
Find more information on [our website](https://dripapp.org/).

[<img src="https://dripapp.org/assets/get.png"
     alt="Get it here"
     height="55">](https://dripapp.org/release/8.apk)
[<img src="https://fdroid.gitlab.io/artwork/badge/get-it-on.png"
     alt="Get it on F-Droid"
     height="80">](https://f-droid.org/packages/com.drip/)
[<img src="https://play.google.com/intl/en_us/badges/images/generic/en-play-badge.png"
     alt="Get it on Google Play"
     height="80">](https://play.google.com/store/apps/details?id=com.drip)

The app is built in React Native and currently developed for Android.

▶ [How to contribute to the project](https://gitlab.com/bloodyhealth/drip/blob/main/CONTRIBUTING.md)

▶ [How to release a new version](https://gitlab.com/bloodyhealth/drip/blob/main/RELEASE.md)

## Development setup

### 1. Get this repository

Clone it with SSH

    git clone git@gitlab.com:bloodyhealth/drip.git

or clone it with HTTPS

    git clone https://gitlab.com/bloodyhealth/drip.git

### 2. Node & yarn version

Make sure you are running Node 14 and classic yarn (v.1). It's easiest to switch Node versions using `nvm`, here's how to install NVM: https://github.com/nvm-sh/nvm#installing-and-updating. After installing nvm close the terminal and open it again to be able to use nvm.
Once you have nvm running you can install node 14:

    nvm install v14.19.3

use npm to install yarn:

    npm install --global yarn

## for Android

### 3.1 Android Studio

Install [Android Studio](https://developer.android.com/studio/) - you'll need it to install some dependencies.

### 3.2 More requirements from Android Studio

Open Android Studio. If the message "SDK location not found" appears when you try to start it, edit `.bashrc` in your home directory by adding:

    export ANDROID_SDK_ROOT="$HOME/Android/Sdk"

Check by typing in your terminal:

    echo $ANDROID_SDK_ROOT

You should see the path of Sdk.
If you haven't installed [adb tools](https://developer.android.com/tools/adb) before, you will also have to do so and add to the .bashrc

    PATH="$PATH:$HOME/Android/Sdk/platform-tools"

In Android Studio click on "Open an existing Android Studio project". Navigate to the drip repository you cloned and double click the android folder. It detects, downloads and cofigures requirements that might be missing, like the NDK and CMake to build the native code part of the project.

### 3.3 Run the app on Android

Either create and start a [virtual device in Android Studio](https://developer.android.com/studio/run/emulator) or [set your physical device like your Android phone up](https://developer.android.com/training/basics/firstapp/running-app) to run the app.

i. Open a terminal, navigate to the drip folder and run

    yarn install
    yarn start
    yarn android

ii. To see logging output, run the following command in another tab:

    yarn log

iii. If you had an older version of drip before and you are now trying to run a new drip version, clear cache by running

    yarn clear

iv. Run the following command and select enable hot reloading (see https://facebook.github.io/react-native/docs/debugging.html):

    adb shell input keyevent 82

iv. We recommend installing an [ESLint plugin in your editor](https://eslint.org/docs/user-guide/integrations#editors). There's an `.eslintrc` file in this project which will be used by the plugin to check your code for style errors and potential bugs.

## for iOS

### 4.1 Install Cocoapods

"CocoaPods manages library dependencies for your Xcode projects"

    brew install cocoapods

### 4.2 Run app on iOS

Minimum system requirements to run iOS app are as follows:

- MacOS 10.15.7 for Mac users
- Xcode 13 (command line tools only might be enough)

i. Install XCode dependencies by running the following command from the root project directory:

    cd ios && pod install && cd ..

ii. To run app either open drip workspace ('drip.xcworkspace' file) with XCode and run "Build" or run the following command:

    yarn ios

iii. If you are building the app with XCode make sure you are running this as well:

    yarn start

### Troubleshooting

#### [MacOS] Java problems

Make sure that you have Java 1.8 by running `java -version`.

If you don't have Java installed, or your Java version is different, the app may not work. You can try just using Android Studio's Java by prepending it to your `$PATH` in your shell profile:
`$ export PATH="/Applications/Android Studio.app/Contents/jre/jdk/Contents/Home/bin:${PATH}"`

Now, `which java` should output `/Applications/Android Studio.app/Contents/jre/jdk/Contents/Home/bin/java`, and the correct Java version should be used.

#### [MacOS] Ninja

If `yarn` says `CMake was unable to find a build program corresponding to "Ninja".`:

    brew install ninja

### [MacOS] adb not on the path

If you get error messages about `adb` not being found on your path:

    ln -s ~/Library/Android/sdk/platform-tools/adb /usr/local/bin/adb

### Clearing project cache

If you would like to clear project cache and/or re-install project libraries, you can run clear script as follows:

    yarn clear

Script accepts the following options:
"all" - script will delete all caches and re-install project libraries,
"ios" - script will delete ios-related cache
"android" - script will delete android-related cache
"cache" - script will purge Watchman, Metrobundler, Pachager and React caches
"npm" - script will reinstall project libraries.

For example, if you would like to clear android part of the project and re-install project libraries, you can run the following command:

    yarn clear android npm

## Tests

### Unit tests

You can run the tests with:

    yarn test

### End to end tests

1. Check what testing device is specified in [package.json](https://gitlab.com/bloodyhealth/drip/blob/main/package.json) under:
   ```
   {"detox":
     {"configurations":
       {"name": "NEXUS_DEVICE_OR_WHATEVER_SPECIFIED_DEVICE"}
     }
   }
   ```
2. Check if the current device is already installed on your machine. Go to `cd ~/Android/sdk/emulator/` or wherever you have Android installed on your machine. Here you can run `./emulator -list-avds` and compare the devices with the one you found in step 1.
3. Open Android Studio and go to -> Tools -> AVD manager -> `+Create virtual device` and select the device checked in the previous step
4. Use the emulator on your machine to run it without heavy Android Studio, e.g. in `~/Android/Sdk/emulator` OR chose to run the emulator within Android Studio
   4.1 Here run: `$ ./emulator -avd NEXUS_DEVICE_OR_WHATEVER_SPECIFIED_DEVICE`
   4.2 You might need to specify the following environment variables in your zsh or bash file according to where you have it installed. You can find exact path in Android Studio (Android Studio Preferences → Appearance and Behavior → System Settings → Android SDK). After adding environment variables, you might need to restart your terminal or source the modified bash profile (i.e. "source ~/.bash_profile").
   `export ANDROID_HOME="/home/myname/Android/Sdk" export ANDROID_SDK_ROOT="/home/myname/Android/Sdk" export ANDROID_AVD_HOME="/home/myname/.android/avd"`
5. For the first time you need to get the app on the phone or if you run into this error:
   `'app-debug-androidTest.apk' could not be found`
   --> open a new 2nd tab and run (in your drip folder): `cd android and ./gradlew assembleAndroidTest`
   Otherwise just open a new 2nd tab to run (in your drip folder) `yarn android`
6. Open a new 3rd tab to run `./node_modules/.bin/detox test -c android.emu.debug`

Hopefully you see the magic happening clicking through the app and happy test results on your console :sun_with_face: !

### Manual testing

To ensure that core app functionality is working, we developed a [test protocol](https://gitlab.com/bloodyhealth/drip/-/snippets/2283405).

## Debugging

In order to see logging output from the app, run `yarn log` in a separate terminal. You can output specific code you want to see, with:
`console.log(theVariableIWantToSeeHere)`
or just a random string to check if this piece of code is actually running:
`console.log("HELLO")`.

## Known issues

### Android emulator

- Import/export to the local drive don't work.
- Email button on the Hamburger menu > About doesn't work - throws a yellow error message "Possible unhandled promise rejection...".

## NFP rules

More information about how the app calculates fertility status and bleeding predictions in the [wiki on Gitlab](https://gitlab.com/bloodyhealth/drip/wikis/home).

## Adding a new tracking icon

1.  We use [fontello](http://fontello.com/) to create icon fonts for us. You need to upload the complete set of tracking icons (bleeding, cervical mucus, ...) including the new icon you wish to add, all in SVG.
2.  Download webfont from fontello.
3.  Copy both the content of `config.json` and `font.tff` into `assets/fonts`, replacing it with the current content of `config-drip-icon-font.json` and `drip-icon-font.tff`.
4.  Now run the following command in your console:

        react-native link

5.  You should be able to use the icon now within drip, e.g. in Cycle Day Overview and on the chart.
