# Changelog

All notable changes to this project will be documented in this file.

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
