import { StyleSheet } from 'react-native'

export const primaryColor = '#ff7e5f'
export const secondaryColor = '#351c4d'
export const fontOnPrimaryColor = 'white'
export const shadesOfRed = ['#ffcbbf', '#ffb19f', '#ff977e', '#ff7e5f'] // light to dark
export const shadesOfGrey = ['#e5e5e5', '#cccccc'] // [lighter, darker]

export default StyleSheet.create({
  welcome: {
    fontSize: 20,
    margin: 30,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: fontOnPrimaryColor,
    textAlign: 'center',
  },
  cycleDayNumber: {
    fontSize: 15,
    color: fontOnPrimaryColor,
    textAlign: 'center',
    marginLeft: 15
  },
  symptomDayView: {
    fontSize: 20,
    textAlignVertical: 'center'
  },
  symptomBoxImage: {
    width: 50,
    height: 50
  },
  radioButton: {
    fontSize: 18,
    margin: 8,
    textAlign: 'center',
    textAlignVertical: 'center'
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
  symptomEditRow: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  symptomViewRowInline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
    height: 50
  },
  header: {
    backgroundColor: primaryColor,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: '10%'
  },
  menu: {
    backgroundColor: primaryColor,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: '12%'
  },
  menuItem: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 15
  },
  menuText: {
    color: fontOnPrimaryColor
  },
  menuTextInActive: {
    color: 'lightgrey'
  },
  headerCycleDay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '15%'
  },
  navigationArrow: {
    fontSize: 60,
    color: fontOnPrimaryColor
  },
  homeButtons: {
    marginHorizontal: 15
  },
  homeButton: {
    marginBottom: 15
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
  radioButtonRow: {
    marginTop: 15,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  statsIntro: {
    fontSize: 18,
    margin: 10,
    textAlign: 'left',
    textAlignVertical: 'center'
  },
  settingsSegment: {
    backgroundColor: 'lightgrey',
    padding: 10,
    marginBottom: 10,
  },
  settingsSegmentTitle: {
    fontWeight: 'bold'
  },
  settingsButton: {
    backgroundColor: secondaryColor,
    padding: 10,
    alignItems: 'center',
    margin: 10
  },
  settingsButtonText: {
    color: fontOnPrimaryColor
  },
  statsRow: {
    flexDirection: 'row',
    width: '100%'
  },
  statsLabelLeft: {
    fontSize: 18,
    width: '60%',
    textAlign: 'left',
    textAlignVertical: 'center',
    marginLeft: 10
  },
  statsLabelRight: {
    fontSize: 18,
    textAlign: 'left',
    textAlignVertical: 'center'
  },
  menuLabel: {
    fontSize: 15,
    color: fontOnPrimaryColor
  },
})

export const iconStyles = {
  navigationArrow: {
    size: 45,
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
    color: 'lightgrey'
  }
}