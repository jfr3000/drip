# Changelog

All notable changes to this project will be documented in this file.

## v0.2007-12.beta

### Adds
* Feature allowing app chart not to show temperature part, when temperature is not tracked and corresponding refactoring
* Detox support for e2e testing and addition of the e2e tests 
* Introduction of Redux global state (date and navigation are stored locally now)
* Introduction of clear.sh script to the project automising clearing project caches and packages reinstallation

### Changes
* Update of chart shades for bleeding
* Eslint rule cleanup and addition of new rules (checks for PropTypes definition for React components, multi spaces)
* sympto library upgrade to version 2.2.0
* Preparation for support of drip on iOS devices
* Updates representation of the incomplete mucus and cervix values on chart
* React Native update to 0.59.10
* Refactoring of header, cycle day overview, temperature edit view pages
* Setting minimum SDK version to 23 to allow using drip on earlier versions of Android

### Fixes
* Fixes adding notes to the future dates
* Fixes app exiting with error when hitting back button on device
* Fixes Sex symptom showing on y axis of chart even though the contraception method was deleted 
* Fix of the clear.sh file name in package.json
* Fix of navigation from chart to the cycle day overview
* Bug fix for maximum value of mucus not showing on chart
* Fixes delete button bug on symptom edit page
* Fix of home screen centering

### Security
* Update of node.js to fix security issue

## v0.1905.29-beta

### Changes
* Auto save functionality for all symptoms
* Add donation section to about
* Clearer labels on cycle day overview
* Rename mucus to cervical mucus
* Set show more on homescreen to default and get rid of more/less switch
* Add loading screen to data import
* Removes logo and adds header on the main login screen
* Nicer formatting for past bleeding prediction
* Removes permissions not required for debug or production
* Temperature screen styling update

### Fixed
* Styling
* Line width in chart
* Prediction range in drop on homescreen

## v0.0.3 - 2019-04-17

### Changes

- Removes Google services from notification library and use fork of react-native-push-notification: <https://github.com/github:jfr3000/react-native-push-notification>

### Fixed

- Button functionality in settings for password

## v0.0.2 - 2019-04-09

## Second updated beta release version

### Changes

- First day of the week in calendar is now Monday instead of Sunday
- Minor styling consistency

### Fixed

- Typos
- Bleeding value is visible in shortcut from Homescreen
- Delete button for sex, pain and mood
- Dates on chart

## v0.0.1 - 2019-02-15

## First beta release version

### Added (list of core functionality)

- you can track your menstrual bleeding
- you can track symptoms related to natural family planning (nfp), i.e. basal temperature and mucus or cervix
- you can use nfp symptoms for fertility awareness (drip implements the sympto-thermal method)
- you can track other symptoms like desire, sex, pain, mood, or save a note
- you can see bleeding days and predicted bleeding days in a calendar
- drip gives you an overview of tracked symptoms on a beautiful chart
- you can see basic stats about your cycle lengths
- you can encrypt your data and protect it with a password
- you can import and export your data in a nice format (csv)
- you can set reminders (daily reminder for taking your temperature or once per cycle for your next period
