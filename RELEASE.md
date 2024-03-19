# How to release a new app version for Android

_Note: You need the release-key for Android to bundle a signed release that can be uploaded and published via the Google Play Store. A similar process for Apple requires a certificate to upload and publish the app to the App Store. More documentation on 'How to release a new app version for iOS' coming soon._

# Table of Contents

1. [version updating](#Version-updating)
2. [android building](#Building-in-Android)
   - [APK](#APK)
   - [AAB](#AAB)
3. [release sharing](#Share-the-release)

## Version updating

When you are done with a chore, a feature or a bugfix, you may want to share it with testers and eventually publish a release. In order to identify a specific app version we can update the version name, which is created based on the following format: `1.yymm.d` e.g. `1.2311.7`. If you want to upload a new app version to Google Play you also need to update the version code.

The following command will:

- create a new versionName and a new higher versionCode (+1)
- create a commit including a tag named after the new release version name.

```
yarn release
```

The versionName and versionCode [are defined here](https://gitlab.com/bloodyhealth/drip/-/blob/5401789c46f4a02915ab900ef284581be420451c/android/app/build.gradle#L137-138) and in [package.json](https://gitlab.com/bloodyhealth/drip/-/blob/5401789c46f4a02915ab900ef284581be420451c/package.json#L3).

**Note for iOS**

Update the version number for iOS in `ios/drip/Info.plist` under:

```
<key>CFBundleShortVersionString</key>
<string>1.2403.19</string>
```

## Building in Android

APK versus AAB

> Android App Bundles (AAB) include all your app’s compiled code and resources, but defer APK generation and signing to Google Play. Unlike an APK, you can't deploy an app bundle directly to a device. So, if you want to quickly test or share an APK with someone else, you should instead build an APK.

(https://developer.android.com/build/building-cmdline)

### APK

To build a release apk file, run the following command:

```
yarn build-android-apk-release
```

_which is a shortcut for:_ `cd android && ./gradlew clean && ./gradlew assembleRelease && cd ..`

This will create a new apk file named `app-release.apk` under `./android/app/build/outputs/apk/release/`.

For signing an apk you can run this command:

```
yarn sign-android-apk-release
```

_which is a shortcut for:_ `zipalign -v -p 4 ./android/app/build/outputs/apk/release/app-release.apk ./android/app/build/outputs/apk/release/app-release_signed.apk`

It adds a file name `app-release_signed.apk` in the same folder in `./android/app/build/outputs/apk/release/`

### AAB

To build a release aab file, run:

```
yarn build-android-aab-release
```

_which is a shortcut for:_ `cd android && ./gradlew clean && ./gradlew :app:bundleRelease && cd ..`

It creates a new aab file named `app-release.aab` under `./android/app/build/outputs/bundle/release`

For signing an aab you first need to configure the base module’s build.gradle file with your app’s signing information. You can then run this command:

```
yarn sign-android-aab-release
```

_which is a shortcut for:_ `jarsigner -keystore ./android/app/drip-release-key.keystore ./android/app/build/outputs/bundle/release/app-release.aab drip-release-key`

## Building in iOS

To build an .ipa archive file for an upload to the AppStore you need to go to xCode and select Build -> "Any iOS Device" and under "Product" -> "Archive".

Once the archiving process has completed you can chose to do the following:

"Distribute the app"

- TestFlight & App Store for when you want to upload it for external testing and/or production release
- TestFlight Internal Only for when you want to upload it for internal testing

## Share the release

### Gitlab repository

For a quick and easy way to share an apk to testers who are willing to sideload drip onto their Android phones, do this: Upload a signed apk to the Gitlab repository of the drip website under `/release` https://gitlab.com/bloodyhealth/bloodyhealth.gitlab.io/-/tree/main/release and maybe adapt the name of the apk with a more specific name than "app-release.apk". Now you can simply share a direct link to download your newly bundled apk, e.g. [a download link for v1.2311.14](https://gitlab.com/bloodyhealth/bloodyhealth.gitlab.io/-/blob/main/release/v1.2311.14.apk).

### Google Play Console

Upload a signed aab to the [Google Play Console for developers](https://play.google.com/console/) and add it to the "App bundle explorer". This requires a higher versionCode and a different version name compared to previously uploaded aab or apk files.
You can decide if you want the new app version to get released for testing (internal, closed or open) or for production. Keep in mind that any track other than "internal testing" triggers an external review by Google and might take a few hours.

#### Phone screenshots

If there are visual changes in the app you may want to update the screenshots for the Google Play Store listing. Keep in mind that Google Play has specific resolution requirements. You'll find them in Grow -> Store presence -> Main Store Listing -> Phone screenshots.

### drip website

After a new version has been published on Google Play (or F-Droid) the apk version that is downloadable directly from the [drip website](https://dripapp.org) needs to get updated as well. Therefore you upload a signed apk to the [repository](https://gitlab.com/bloodyhealth/bloodyhealth.gitlab.io/) and adapt the name and link on /index.html.
Last time I checked it was [here](f3da9776b1943ffa32458e74ef86eeca98c1891c/index.html#L114).

#### Phone screenshots

Please also update [phone screenshots here](https://gitlab.com/bloodyhealth/bloodyhealth.gitlab.io/-/tree/main/assets) and set links on [/index](https://gitlab.com/bloodyhealth/bloodyhealth.gitlab.io/-/blob/f3da9776b1943ffa32458e74ef86eeca98c1891c/index.html#L47) and [/media](https://gitlab.com/bloodyhealth/bloodyhealth.gitlab.io/-/blob/c7f999bb7ad736345321537cbffa3f4c24eeee6d/media.html#L33) that can then also be attached to a social media post.

You probably want to share the app update by posting on one or more of these platforms:

- [Twitter](twitter.com/dripberlin)
- [Mastodon](mastodon.social/@dripapp)
- [Ko-fi](https://ko-fi.com/dripapp)
- [Linkedin](https://www.linkedin.com/company/34899684/)
- Different tech, privacy, feminist oriented slacks
