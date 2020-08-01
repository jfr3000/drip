# How to release a new version

Note: You need the release-key to bundle a release that can be uploaded to Google Play Store.

Run the release wizard that takes you through all the steps necessary to prepare a new release:

```
./tools/release-wizard.js
```
This will trigger the following:
* update version number
* create a new tag for the release
* update the changelog
* make a release commit

To then bundle a release run the following command on your branch:

```
cd android && ./gradlew bundleRelease
```

This command creates an `app.aab` file in the folder `/android/app/build/outputs/bundle/release`.