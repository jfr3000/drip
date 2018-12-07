# Bloody Health Cycle Tracker

A menstrual cycle tracking app that's open-source and leaves your data on your phone. Use it to track your menstrual cycle and/or for fertility awareness!

## Development setup
1. Install [Android Studio](https://developer.android.com/studio/) - you'll need it to install some dependencies.

1. Make sure you are running Node 8 or 9 (newer versions won’t work). It's easiest to switch Node versions using `nvm`, here’s how to do it:

    ```
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
    nvm install v9
    ```

1. Clone this repository:

    ```
    git clone git@gitlab.com:bloodyhealth/drip.git
    cd drip
    ```

1. Open Android Studio and click on "Open an existing Android Studio project". Navigate to the drip repository you cloned and double click the android folder. It detects, downloads and cofigures requirements that might be missing, like the NDK and CMake to build the native code part of the project. Also see the [nodejs-mobile repository](https://github.com/janeasystems/nodejs-mobile) for the necessary prerequisites for your system.

1. Either start a [virtual device in Android Studio](https://developer.android.com/studio/run/emulator) or [set your physical device like your Android phone up](https://developer.android.com/training/basics/firstapp/running-app) to run the app.

1. Open a terminal in Android Studio and run `npm install`

1. Run `npm run android`

1. In another tab, run `npm run log` to see logging output

1. Run `adb shell input keyevent 82` and select enable hot reloading (see https://facebook.github.io/react-native/docs/debugging.html)

1. We recommend installing an [ESLint plugin in your editor](https://eslint.org/docs/user-guide/integrations#editors). There's an `.eslintrc` file in this project which will be used by the plugin to check your code for style errors and potential bugs.

## Java problems on macOS

Make sure that you have Java 1.8 by running `java -version`.

If you don't have Java installed, or your Java version is different, the app may not work. You can try just using Android Studio's Java by prepending it to your `$PATH` in your shell profile:

    ```
    export PATH="/Applications/Android Studio.app/Contents/jre/jdk/Contents/Home/bin:${PATH}"
    ```

Now, `which java` should output `/Applications/Android Studio.app/Contents/jre/jdk/Contents/Home/bin/java`, and the correct Java version should be used.

## Windows problems

Unfortunately, the react native version we use doesn't work on Windows 10 it seems, find [more info here](https://github.com/facebook/react-native/issues/20015).

## Tests
You can run the tests with `npm test`.

## Debugging
When running into an old version of the app try to run the following command first:
`react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res`

## NFP rules
More information about how the app calculates fertility status and bleeding predictions in the [wiki on Gitlab](https://gitlab.com/bloodyhealth/drip/wikis/home)
