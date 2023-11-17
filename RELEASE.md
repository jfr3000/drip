# How to release a new app version for Android

Note: You need the release-key for Android to bundle a signed release that can be uploaded and published via the Google Play Store.
A similar process for Apple requires a certificate to upload and publish the app to the App Store. More documentation on 'How to release a new app version for iOS' coming soon.

1. version updating
2. android building
3. release sharing

## Version updating

By running the following command, it will:

- create a new versionName and a new higher versionCode (+1)
- create a commit including a tag named after the new release version name.

```
yarn release
```

## Android building

APK versus AAB

> Android App Bundles (AAB) include all your app’s compiled code and resources, but defer APK generation and signing to Google Play. Unlike an APK, you can't deploy an app bundle directly to a device. So, if you want to quickly test or share an APK with someone else, you should instead build an APK.

(https://developer.android.com/build/building-cmdline)

### APK

To build a release apk file, run the following command:
(`cd android && ./gradlew clean && ./gradlew assembleRelease && cd ..`)

```
yarn build-android-apk-release
```

It creates a new apk file named app-release.apk under ./android/app/release/

For signing an apk you can run this command:
(`zipalign -v -p 4 ./android/app/build/outputs/apk/release/app-release.apk ./android/app/build/outputs/apk/release/app-release_signed.apk`)

```
yarn sign-android-apk-release
```

It adds a file named "app-release_signed.apk"

### AAB

To build a release aab file, run:
(`cd android && ./gradlew clean && ./gradlew :app:bundleRelease && cd ..`)

```
yarn build-android-aab-release
```

It creates a new aab file named app-release.aab under ./android/app/build/outputs/bundle/release

For signing an aab you first need to configure the base module’s build.gradle file with your app’s signing information. You can then run this command:
(`jarsigner -keystore ./android/app/drip-release-key.keystore ./android/app/build/outputs/bundle/release/app-release.aab drip-release-key`)

```
yarn sign-android-aab-release
```

## Share the release

### Gitlab repository

For a quick and easy way to share an apk to testers who are willing to sideload drip onto their Android phones, do this: Upload a signed apk to the Gitlab repository of the drip website under `/release` https://gitlab.com/bloodyhealth/bloodyhealth.gitlab.io/-/tree/main/release and maybe adapt the name of the apk with a more specific name than "app-release.apk".

### Google Play Console

Upload a signed aab to the [Google Play Console for developers](https://play.google.com/console/) and add it to the App bundle explorer. This requires a higher versionCode and a different version name compared to previously uploaded aab or apk files.
You can decide if you want the new app version to get released for testing (internal, closed or open) or for production. Keep in mind that any track other than "internal testing" trigger an external review by Google and might take a few hours.

### drip website

After a new version has been published on Google Play (or F-Droid) the apk version that is downloadable directly from the [drip website](https://dripapp.org) needs to get updated as well. Therefore you upload a signed apk to the [repository](https://gitlab.com/bloodyhealth/bloodyhealth.gitlab.io/-/merge_requests/new) and adapt the name on /index.html.
Last time I checked it was [here](f3da9776b1943ffa32458e74ef86eeca98c1891c/index.html#L114).
