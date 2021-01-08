# Changelog

All notable changes to this project will be documented in this file.

## v1.2101.9
### Adds
- Introduces complete redesign of all sections of the app
- Adds new font
- Adds Lisa as condriputor
- Adds updated text about credits.
- Adds missing notification icon
- Adds padding between keyboard and text input
- Adds limit line length on text of symptom box

### Changes
- Updates createVersion tag for production releases
- Better wording for prediction text
- Changes the icon
- Changes font color of marked calendar days
- Updates styling of Stats page
- Updates settings menu styling
- Increases hitSlop of menu icon and navigation arrows
- Sets calendar pastScrollRange to 10 years
- Introduces RN Alert component styling update
- Introduces PasswordPrompt component redesign
- Updates button activity definition when entering new password
- Forbids landscape orientation for app
- Updates README.md
- Updates sdk 28 -> 29 and migrate to androidx

### Fixed
- Fixed drip typo
- Fixed the date label on chart from breaking
- Fixed chart dots and lines
- Fixed error on highes/lowest scale values
- Fixed extra horizontal grid line on chart
- Fixed error occurring when navigating back from settings section
- Fixed redirect to TemperatureEditView from reminder
- Fixed ordinal number suffix on chart date labels
- Fixed bug when .8 and .3 labels are not shown in chart
- Fixed react-native-vector-icon
- Fixed AppLoadingView component centering

## v0.2007-12.beta

### Adds

- Allows chart not to show temperature part, when temperature is not tracked and corresponding refactoring
- Detox support for e2e testing and addition of the e2e tests 
- Introduces Redux global state (date and navigation are stored locally now)
- Introduces clear.sh script to the project automising clearing project caches and packages reinstallation

### Changes

- Updates of chart shades for bleeding
- Eslint rule cleanup and addition of new rules (checks for PropTypes definition for React components, multi spaces)
- sympto library upgrade to version 2.2.0
- Preparation for support of drip on iOS devices
- Updates representation of the incomplete mucus and cervix values on chart
- React Native update to 0.59.10
- Refactors of header, cycle day overview, temperature edit view pages
- Setting minimum SDK version to 23 to allow using drip on earlier versions of Android

### Fixed

- Fixed adding notes to the future dates
- Fixed app exiting with error when hitting back button on device
- Fixed Sex symptom showing on y axis of chart even though the contraception method was deleted 
- Fixed of the clear.sh file name in package.json
- Fixed of navigation from chart to the cycle day overview
- Bug fix for maximum value of mucus not showing on chart
- Fixed delete button bug on symptom edit page
- Fixed of home screen centering

### Security

- Updates of node.js to fix security issue

## v0.2005.3-beta

- Adds arm64-v8a and x86_64 for supporting 64-bit architecture
- Adds Mariya & Sofiya as contributors &lt;3
- Fixed the error on app exiting on via the device back button
- Updates README.md
- Allows to enter note in the future
- Chart navigation bug fix.
- Changes clear to lowercase to make it case sensitive and executable
- fix 306 by setting other-note empty as contraception method 'other' is deactivated
- Don't show temperature chart part of chart when temp not tracked
- Bring in different shades for desire dots on chart
- Splits the rest of the tests without modifying them
- Moves out the test for getCyclesBefore method of cycle module
- Moves out the test for getPReviousCycle method of cycle module
- Lint rule react prop types addition
- Adds test and fixes getCycleByStartDate method of cycle module
- Moves out the tests for getCycleDayNumber and organises them
- Adds propTypes definition
- Gets rid of a top level prop passed down through a tree of components
- Cleanups symptom view
- Removes unnecessary prop and defines the missing propTypes
- Adds propTypes definition
- Gets rid of the redundant state on Home
- Moves out home helpers from the component
- Moves out HomeElement component
- Moves out IconText component
- Resets the date in store for today date when navigating home
- Sets initial value of date in the store
- Removes redundant state and corrects the cycle day prop
- Use new published sympto
- Fixed missing navigation state on exiting the app
- Adds e2e test device config for Nexus 5
- De-duplicate line
- Fixed navigation logic
- Adds go back functionality
- Adds navigation tree to define the hierarchy
- Moves navigation to the state
- Removes the lowercasing to the header title component
- Remove now superfluous check for bleeding symptom
- Adds remaining tests for maybeSetNewCycleStart
- Adds test for deleted bleeding value
- Extract maybeSetNewCycleStart into own module
- Set new cycle start when bleeding value excluded
- Changes the name of the main component
- Makes drip work on iOS
- Adds a handy script to clear builds/cache/etc
- Fixed bug - not showing maximum value of mucus in chart
- Moves calculations functions to helpers file
- Moves YAxis & HorizontalGrid components in a common conditional expression
- Moves auxiliary functions from day-column.js component file to helpers file
- Moves Surface element to TemperatureColumn component
- Introduces CycleDayLabel component
- Introduces TemperatureColumn component
- Introduces ChartLine component
- Formatting fix
- Introduces SymptomCell component
- Introduces HorizontalGrid component
- Moves out chart (data modelling) helpers to a separate file
- Introduces Tick & TickList components
- Introduces ChartLegend component
- Introduces SymptomIcon component
- Rafactors symptom color definition
- Introduces YAxis component
- Use updated sympto
- Fixed typo, and removes a redundant line
- Naming update: isFertile>isClosedAndHard, getSymptomColorIndex>symptomColorMethods; update of symptom index retrieval for the sake of readibility
- Naming update, change switch to object, fertility logic review
- make graph display for incomplete mucus and cervix values
- Fixed some warnings on build
- Updates the RN version to 0.59.10
- Re-add missing build script
- Updates the RN version to 0.59
- Moves metadata directory to root of project. So fdroid can find it.
- Cleans the console.log
- Adds test for data deletion
- Refactors the header
- Replaces the inheritance with composition pattern in the Symptom view
- Adds e2e symptom data input tests and necessary testIDs to the existing components
- Splits the temperature view to simplify it
- Updates README.md
- Fixed the cycle day data is not being passed to the symptom view
- Fixed the date not being set on changing cycle day, and adds a test for this case
- Starts using redux store for storing the date
- Redux initial setup
- Implements review feedback
- Splits &lt;CycleDayOverView /> to smaller components, to simplify it
- Adds e2e test setup to README
- Adding more tests
- Adds initial tests
- Introduces detox
- Moves app store metadata for here from fdroiddata repo
- Set minSdk to Marshmallow (earlier versions don't work)
- Only show timestamp when it has a value
- Refactors App wrapper component
- Fixed reopenning after back button
- Make home screen centered
- Adds release wizard
- Updates nodejs-mobile to fix security issue


## v0.1905.29-beta
### Changes

- Auto save functionality for all symptoms
- Adds donation section to about
- Clearer labels on cycle day overview
- Rename mucus to cervical mucus
- Set show more on homescreen to default and get rid of more/less switch
- Adds loading screen to data import
- Removes logo and adds header on the main login screen
- Nicer formatting for past bleeding prediction
- Removes permissions not required for debug or production
- Temperature screen styling update
### Fixed

- Styling
- Line width in chart
- Prediction range in drop on homescreen

## v0.1905.28-beta

- Displays all the text for Home Elements; Shortens margin btw Home Elements; Adds missing "visit" to text
- Adds donation section to about
- Gets rid of hidden icon in back button header
- Adds subcategories of cevix and mucus as labels
- Adds subcategory names to the selected options
- Changes fontSize of titles in SymptomBoxes;makes sure it stays in 1 line
- Fixed delete button
- Get rid of extra styling for non functional info icon
- Clean up
- Adds autosave for temperate
- Auto save whenever symptom view updates
- Fixed delete data bug
- Make uniform info icon and leave some space
- Align droplet text on homescreen
- Make info modal only as big as it needs to be
- Make sure info icon is always well pressable
- Specifying mucus as cervical mucus
- Make sure drop text is always positioned correctly
- Position icon text for droplet
- Styling for homescreen elements to breathe
- simple way to rearrange home screen
- Set show more on homescreen to default and get rid of more/less switch
- Don't render delete icon, instead of just setting it invisible
- Make isDeleteIconActive more readable
- Updates README.md
- Changes order of buttons in the import alert
- Remove formatting improvements that clutter up the diff
- Fixed cervix value display on overview
- Fixed mucus value display on overview
- Don't show delete icon just because symptom info is open
- Clean up markup
- Use own modal instead of alert for symptom info
- Gets rid of trailing spaces
- Gets rid of old info symptom screen
- \[WIP] Adds info button to body as alert for: \* mood, pain, temperature
- Adds info button to the body as alert
- Try out moving it to body
- For temperature, only show delete button when certain fields active
- Let symptom views overwrite isDeleteIconActive method
- Show or hide delete button based on entered data
- Remove unused style
- Ask before deleting entry
- Changes icon to trash can
- Replace info icon in header with delete
- Await alert result before navigating back
- Address MR change requests
- Reset inadvertently changed file
- Filter incomplete mucus values in sympto adapter
- Don't crash on missing temperature value
- Make header back arrow function for auto save
- Remove action button footer from symptom views
- When nothing entered, delete entry
- Adds symptom view component with back button listener
- Remove save button from footer
- Remove unused line
- Make saving incomplete value possible
- Filter out incomplete cervix value days in sympto adapter
- Updates sympto
- Adds migration making mucus and cervix values optional
- Don't compute nfp mucus value when data missing
- Adds test for missing mucus vaues
- excludes internet and system alert window from default permission
- Adds comment for bleeding prediction ranges
- Changes if statement with conditional operator
- changes action buttons color to teal, rounded corners for buttons in settings
- Fixed line width in chart
- makes the action button footer more like buttons
- Adds getTime function for bleedingPredictions reuse; minor style formatting
- Renames function to say what it 'does'
- Rename to predictedBleeding
- Nicer formatting for past bleeding prediction
- Fixed prediction range in drop on homescreen

## v0.1905.10-beta

- Filter release commits from changelog
- Adds update-changelog script
- Remove square brackets from CHANGELOG. They are parsed as links
- Adds commit-release and npm scripts
- Adds update version script from manyverse
- Updates RN to 58
- Remove superfluous try/catch
- Rename methods
- Adds loading screen to data import
- Improves readability of app page rendering
- Updates README.md
- adds maxLength to temperature input field
- Removes logo and adds header on the main login screen
- Adjust version name
- Don't build for x86
- Upgrade nodejs-mobile-rn to latest
- Remove unneeded maven repo and upgrade gradle to 4.10
- Lowercase values for sex, pain and mood
- Removes permissions not required for debug or production
- Adds proptypes to DeletePassword, ChangePassword and ConfirmWithPassword components
- Delete password button bug fix
- temperature screen styling update

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
