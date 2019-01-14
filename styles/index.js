import { StyleSheet } from 'react-native'

export const primaryColor = '#000D19'
export const secondaryColor = '#4FAFA7'
export const secondaryColorLight = '#91749d'
export const fontOnPrimaryColor = 'white'
export const shadesOfRed = [
  '#e7999e',
  '#db666d',
  '#cf323d',
  '#c3000d'
] // light to dark
export const cycleDayColor = '#29287f'
export const periodColor = '#802249'

const fontRegular = 'Prompt-Light'
const fontLight = 'Prompt-Thin'

const regularSize = 16
const hintSize = 14

const defaultBottomMargin = 5
const defaultIndentation = 10
const defaultTopMargin = 10
const colorInActive = '#666666'

export default StyleSheet.create({
  appText: {
    color: 'black',
    fontFamily: fontRegular,
    fontSize: regularSize
  },
  appTextLight: {
    color: 'black',
    fontFamily: fontLight,
    fontSize: regularSize
  },
  actionHint: {
    color: secondaryColor,
    fontFamily: fontRegular,
    fontSize: hintSize,
    margin: defaultIndentation
  },
  paragraph: {
    marginBottom: defaultBottomMargin
  },
  emphasis: {
    fontWeight: 'bold',
  },
  link: {
    color: cycleDayColor,
    textDecorationLine: 'underline'
  },
  title: {
    fontSize: 18,
    color: 'black',
    marginBottom: defaultBottomMargin,
  },
  textWrappingView: {
    marginHorizontal: defaultIndentation,
    marginTop: defaultTopMargin
  },
  welcome: {
    fontSize: 20,
    fontFamily: 'serif',
    margin: 30,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  dateHeader: {
    fontSize: 20,
    fontFamily: fontLight,
    color: fontOnPrimaryColor,
    textAlign: 'center',
  },
  headerText: {
    fontSize: 30,
    fontFamily: fontLight,
    color: fontOnPrimaryColor,
    textAlign: 'center',
    paddingBottom: 4
  },
  accentCircle: {
    borderColor: secondaryColor,
    borderWidth: 0.5,
    width: 40,
    height: 40,
    borderRadius: 100,
    position: 'absolute'
  },
  errorMessage: {
    color: shadesOfRed[2],
    marginLeft: 10,
    marginTop: 6
  },
  homeView: {
    marginHorizontal: 50,
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  homeButton: {
    width: 200,
  },
  homeButtonText: {
    color: fontOnPrimaryColor
  },
  homeIconElement: {
    alignItems: 'center',
    marginBottom: 10
  },
  homeIconTextWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  wrapperCycle: {
    width: 80,
    height: 77
  },
  wrapperDrop: {
    width: 81,
    height: 85,
    marginTop: 20
  },
  wrapperCircle: {
    width: 80,
    height: 80,
  },
  homeCircle: {
    borderRadius: 100,
    borderWidth: 0.7,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: secondaryColor,
  },
  iconText: {
    fontSize: 25
  },
  showMore: {
    transform: [{rotate: '90deg'}],
    position: 'absolute',
  },
  showLess: {
    transform: [{rotate: '270deg'}],
    position: 'absolute'
  },
  cycleDayNumber: {
    fontSize: 15,
    color: fontOnPrimaryColor,
    textAlign: 'center',
    fontFamily: fontLight
  },
  symptomViewHeading: {
    fontSize: 20,
    color: 'black',
    marginBottom: 5
  },
  symptomInfoIcon: {
    marginRight: 20,
    marginLeft: 20
  },
  symptomBoxImage: {
    width: 50,
    height: 50
  },
  symptomBoxesView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
  },
  symptomBox: {
    borderColor: secondaryColor,
    borderStyle: 'solid',
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    marginTop: '10%',
    paddingVertical: '6%',
    marginHorizontal: 1,
    width: 110,
    height: 80,
  },
  symptomBoxActive: {
    backgroundColor: secondaryColor,
  },
  symptomTextActive: {
    color: fontOnPrimaryColor
  },
  symptomInFuture: {
    borderColor: 'lightgrey',
    color: 'lightgrey'
  },
  symptomDataBox: {
    borderColor: secondaryColor,
    borderStyle: 'solid',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3%',
    marginHorizontal: 1,
    width: 110,
    height: 50,
  },
  symptomDataText: {
    fontSize: 12
  },
  header: {
    backgroundColor: primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  },
  headerCycleDay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navigationArrow: {
    padding: 20
  },
  hiddenIcon: {
    padding: 20
  },
  menu: {
    backgroundColor: primaryColor,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 60
  },
  menuItem: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 15
  },
  menuText: {
    color: fontOnPrimaryColor,
    fontFamily: fontLight
  },
  menuTextInActive: {
    color: colorInActive
  },
  temperatureTextInput: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center'
  },
  temperatureTextInputSuggestion: {
    color: '#939393'
  },
  actionButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 50
  },
  symptomEditButton: {
    width: 130
  },
  settingsSegment: {
    borderColor: secondaryColor,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: defaultTopMargin,
    marginHorizontal: defaultIndentation,
    padding: 7,
  },
  settingsSegmentLast: {
    marginBottom: defaultTopMargin,
  },
  settingsSegmentTitle: {
    fontWeight: 'bold'
  },
  settingsButton: {
    backgroundColor: secondaryColor,
    padding: 10,
    alignItems: 'center',
    margin: 10,
  },
  settingsButtonDisabled: {
    backgroundColor: colorInActive
  },
  settingsButtonText: {
    color: fontOnPrimaryColor
  },
  statsRow: {
    flexDirection: 'row',
    width: '100%'
  },
  statsLabelLeft: {
    width: '60%',
    textAlign: 'left',
    textAlignVertical: 'center',
    marginLeft: 10
  },
  statsLabelRight: {
    textAlign: 'left',
    textAlignVertical: 'center'
  },
  menuLabel: {
    fontSize: 15,
    color: fontOnPrimaryColor
  },
  selectBox: {
    backgroundColor: 'lightgrey',
    marginRight: 7,
    marginVertical: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10
  },
  selectBoxActive: {
    backgroundColor: secondaryColor,
    color: fontOnPrimaryColor
  },
  selectBoxTextActive: {
    color: fontOnPrimaryColor
  },
  selectBoxSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  selectTabGroup: {
    marginVertical: 10,
    flexDirection: 'row'
  },
  selectTab: {
    backgroundColor: 'lightgrey',
    borderStyle: 'solid',
    borderLeftWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: 'white',
    marginBottom: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectTabActive: {
    backgroundColor: secondaryColor,
    color: fontOnPrimaryColor
  },
  selectTabLast: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  selectTabFirst: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderLeftWidth: null
  },
  page: {
    marginHorizontal: 10
  },
  calendarToday: {
    fontWeight: 'bold',
    fontSize: 20,
    color: secondaryColor,
    marginTop: 1
  },
  passwordField: {
    padding: 10,
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: 'white'
  },
  passwordPromptPage: {
    padding: 30,
    alignItems: 'center'
  },
  passwordPromptField: {
    padding: 10,
    marginTop: 10,
    marginHorizontal: 10,
    borderBottomWidth: 3,
    borderBottomColor: primaryColor,
    width: '100%',
    fontSize: 20,
    marginVertical: 20
  },
  passwordPromptButton: {
    backgroundColor: secondaryColor,
    padding: 10,
    alignItems: 'center',
    margin: 10,
    width: '100%',
    borderRadius: 10
  },
  passwordPromptButtonText: {
    color: fontOnPrimaryColor,
    fontSize: 20
  },
  passwordPromptForgotPasswordText: {
    marginTop: 20,
    color: 'grey'
  },
  infoButton: {
    paddingVertical: 20
  },
  licensePage: {
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  licenseButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 40
  },
  licenseButton: {
    marginLeft: 30,
    width: 100
  }
})

export const iconStyles = {
  navigationArrow: {
    size: 20,
    color: fontOnPrimaryColor
  },
  symptomHeaderIcons: {
    size: 20,
    color: fontOnPrimaryColor
  },
  symptomBox: {
    size: 40
  },
  symptomBoxActive: {
    color: fontOnPrimaryColor
  },
  menuIcon: {
    size: 20,
    color: fontOnPrimaryColor
  },
  menuIconInactive: {
    color: colorInActive,
  },
  infoInHeading: {
    marginRight: 5,
    color: 'black'
  },
  hiddenIcon: {
    size: 20,
    display: 'none'
  }
}
