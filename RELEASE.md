# How to release a new version

Note: You need the release-key to bundle a release that can be uploaded to Google Play Store.

Run the release wizard that takes you through all the steps necessary to prepare a new release:

```
npm run release
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

[More on Android App Bundle](https://blog.swmansion.com/make-your-react-native-app-3x-smaller-44c993eda2c9)

You need to manually push the created tag to Gitlab:

```
git push origin <tagname>
```
Also don't forget to push your branch to Gitlab and review and merge it if ready!

Yay, done (have a scoop of ice cream, I suggest coconut 🍦)!